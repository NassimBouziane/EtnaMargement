import {deleteByLogin, getAll,getByLogin,createLog, getstats, insertintologs, statLogsByDate, getByDate, updateLogs} from "../controllers/logs.controller"


const logsrouter = require('express')
const logs = logsrouter.Router()

logs.get('/', getAll)
logs.get('/:id', getByLogin)
// logs.delete('/:id', deleteById)
logs.put('/update/:id', updateLogs)
logs.delete('/login/:login', deleteByLogin)
logs.post('/', createLog)
logs.get('/stats/:login', getstats)
logs.post('/insert', insertintologs)
logs.get('/date/:date/:login', getByDate)
logs.get('/date/:date', statLogsByDate)
export default logs


