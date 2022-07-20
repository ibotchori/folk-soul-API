"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = (0, _expressAsyncHandler.default)(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Error Message');
  }

  res.status(200).json({
    message: 'Register User'
  });
});
exports.register = register;
const login = (0, _expressAsyncHandler.default)(async (req, res) => {
  res.status(200).json({
    message: 'Login User'
  });
});
exports.login = login;