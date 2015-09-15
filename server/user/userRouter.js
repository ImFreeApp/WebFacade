var userController = require('./userController');

module.exports = function(router){

  router.get('/', userController.getUsers);

  router.get('/:id', userController.getUser);

};
