const _express = _interopRequireDefault(require('express'))

const _dotenv = _interopRequireDefault(require('dotenv'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

_dotenv.default.config()

const PORT = process.env.SERVER_PORT || 4444
const server = (0, _express.default)()
server.get('/', async (_, res) => {
  res.send(`
   Hello World
    `)
})
server.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
)
