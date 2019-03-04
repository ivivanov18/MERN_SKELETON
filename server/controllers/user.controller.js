const _ = require("lodash");

const User = require("../models/user.model");
const getErrorMessage = require("../helpers/dbErrorHandler");

module.exports = {
  create: (req, res, next) => {
    const user = User(req.body);
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: getErrorMessage(err)
        });
      }
      res.status(200).json({
        message: "Successfully signed!"
      });
    });
  },

  list: (req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.status(400).json({
          error: getErrorMessage(err)
        });
      }
      res.json(users);
    }).select("name email updated created");
  },

  userByID: (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found"
        });
      }
      req.profile = user;
      next();
    });
  },

  read: (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  },

  update: (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save(err => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    });
  },

  remove: (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      deletedUser.hashed_password = undefined;
      deletedUser.salt = undefined;
      res.json(deletedUser);
    });
  }
};
