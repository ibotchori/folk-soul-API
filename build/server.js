"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _errorMiddleware = require("./middleware/errorMiddleware");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const PORT = process.env.SERVER_PORT || 4444;
const server = (0, _express.default)(); // Middleware

server.use(_express.default.json()); // <-- body parser

server.use(_express.default.urlencoded({
  extended: false
})); // <-- url encode

server.use('/api/user', _routes.userRoutes); // overwrite the default express error handler with custom error handler middleware

server.use(_errorMiddleware.errorHandler); // <-- error handler middleware

server.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));