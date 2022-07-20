"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

const register = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Error Message');
  }

  res.status(200).json({
    message: 'Register User'
  });
};

exports.register = register;

const login = (req, res) => {
  res.status(200).json({
    message: 'Login User'
  });
};

exports.login = login;