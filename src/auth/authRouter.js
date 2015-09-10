var authController = require('./authController');

module.exports = function(router){

router.post('/', authController.authenticate);

};
