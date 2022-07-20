"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

const register = async (req, res) => {
  res.status(200).json({
    message: 'Register User'
  });
};

exports.register = register;

const login = async (req, res) => {
  res.status(200).json({
    message: 'Login User'
  });
};

exports.login = login;