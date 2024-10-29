import express, { Request, Response } from 'express';
import { AppDataSource } from './db';

const app = express();
const port = 3000;

app.get('/',async(req: Request, res: Response) => {
  await AppDataSource.initialize();
        console.log('Database connected');
  res.send('<h7>Hello World!</h7>');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});