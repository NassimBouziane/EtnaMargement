import {deleteById, deleteByLogin, getAll,getByLogin,createLog, getstats, insertintologs, getbydate} from "../controllers/logs.controller"


const logsrouter = require('express')
const logs = logsrouter.Router()

logs.get('/', getAll)
logs.get('/:id', getByLogin)
logs.delete('/:id', deleteById)
logs.delete('/login/:login', deleteByLogin)
logs.post('/', createLog)
logs.get('/stats/:login', getstats)
logs.post('/insert', insertintologs)
logs.get('/date/:date', getbydate)
export default logs


