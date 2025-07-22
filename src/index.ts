import express, { Request, Response } from "express";
import dotend from "dotenv";
dotend.config();
import { urlencoded } from "body-parser";
import sequelize from "./db/database";
import adminUserRouter from "./routes/admin/user.routes";
import categoryRouter from "./routes/admin/category.routes";
import productRouter from "./routes/admin/product.routes";

import { initAdmin } from "./helper/init";
import { errorMiddleware } from "./middleware/errorMiddleware";
import path from "path";

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/admin/auth", adminUserRouter);
app.use("/admin/category", categoryRouter);
app.use("/admin/product", productRouter);

app.use("/files", express.static(path.join(__dirname, "./public/files")));

app.use(errorMiddleware);

const serverStart = async () => {
  try {
    sequelize.authenticate();
    console.log("Database connected successfully");
    sequelize.sync({});
    console.log("Models connnected");
    await initAdmin();
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
