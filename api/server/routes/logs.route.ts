import {getAll,getByLogin} from "../controllers/logs.controller"

const logsrouter = require('express')
const logs = logsrouter.Router()



logs.get('/', getAll)
logs.get('/:id', getByLogin)
export default logs


