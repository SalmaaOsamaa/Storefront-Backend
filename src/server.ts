import express, { Request, Response } from "express";
import morgan from 'morgan';
import bodyParser from "body-parser";
import cors from "cors";
// import { productRouter } from './routes/api/products'
import routes from "./routes";
import client from './database';
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";


const {PORT} = process.env
export const app: express.Application = express();
dotenv.config();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(errorMiddleware);
const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
//   app.use(productRouter);
app.use("/api", routes);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
//test db
client.connect().then(client=>{
  return client.query('SELECT NOW()').then((res)=>{
    client.release();
    console.log(res.rows);
    
  })
  .catch((err)=>{
    client.release();
    console.log(err.stack);
    
  })
})

app.use("/api", routes);
app.listen(3000,  ()=> {
  console.log(`starting app on: ${PORT}`);
});
