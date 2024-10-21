module.exports = function(app) {
    const auth = require('../controllers/authController.js');
    const { verifySignUp } = require('../middleware'); // Assurez-vous que le chemin d'accès est correct

    app.post('/auth/register', 
        verifySignUp.checkDuplicateUsernameOrEmail, 
        verifySignUp.checkRolesExisted, 
        auth.register
    );

    app.post('/auth/login', auth.login);
}
