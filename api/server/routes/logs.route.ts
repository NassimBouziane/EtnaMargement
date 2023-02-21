import getAll from "../controllers/logs.controller"

const logsrouter = require('express')
const logs = logsrouter.Router()



logs.get('/', getAll)
export default logs


