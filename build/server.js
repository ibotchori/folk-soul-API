"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const PORT = process.env.SERVER_PORT || 4444;
const server = (0, _express.default)();
server.use('/api/user', _routes.userRoutes);
server.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));