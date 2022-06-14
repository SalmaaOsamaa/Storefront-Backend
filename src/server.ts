import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
// import { productRouter } from './routes/api/products'
import routes from './routes';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
//   app.use(productRouter);
  app.use('/api', routes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
