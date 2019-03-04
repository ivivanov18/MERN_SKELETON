const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = Router();

router
  .route("/api/users")
  .get(userController.list)
  .post(userController.create);

router
  .route("/api/users/:userId")
  .get(authController.requireSignin, userController.read)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.remove
  );

router.param("userId", userController.userByID);

module.exports = router;
