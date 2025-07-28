import express, { Request, Response } from 'express';
import dotend from 'dotenv';
import cors from 'cors'
dotend.config();
import { urlencoded } from 'body-parser';
import sequelize from './db/database';
import adminUserRouter from './routes/admin/user.routes';
import categoryRouter from './routes/admin/category.routes';
import productRouter from './routes/admin/product.routes';

import { initAdmin } from './helper/init';
import { errorMiddleware } from './middleware/errorMiddleware';
import path from 'path';
import { Product } from './models/product.model';


let corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.use('/admin/auth', adminUserRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/product', productRouter);

app.use('/files', express.static(path.join(__dirname, './public/files')));

app.use(errorMiddleware);

const serverStart = async () => {
  try {
    sequelize.authenticate();
    console.log('Database connected successfully');
    sequelize.sync({});
    // Product.sync({ force: true });
    console.log('Models connnected');
    await initAdmin();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
