
const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");




exports.register = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            let roleNames = req.body.roles || ['user'];
            Role.findAll({
                where: { name: { [Op.or]: roleNames } }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });

                    var authorities = [];
                    roles.forEach(role => {
                        authorities.push("ROLE_" + role.name.toUpperCase());
                    });

                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token
                    });
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.login = (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
            }

            var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
            var authorities = [];

            user.getRoles().then(roles => {
                roles.forEach(role => {
                    authorities.push("ROLE_" + role.name.toUpperCase());
                });

                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


