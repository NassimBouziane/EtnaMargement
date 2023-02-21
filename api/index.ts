import express from 'express'
import logsroute from './server/routes/logs.route'
const app = express()
const port = 3000
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
  // preflightContinue: false,
};
app.use(cors({ origin: '*' }));
app.options('*', cors(corsOptions)); // Enable pre-flight


app.use('/logs', logsroute)
//app.use('/users', /*ea*/)

app.listen(port, () => {
    console.log(`Example router listening on port ${port}`);
  });
  
