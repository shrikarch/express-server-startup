const usercontroller = require("../controllers/userController.js");

module.exports = function (app, router, logger) {

  app.route('/users')
  .get(usercontroller.list)
  .post(usercontroller.create);

};
