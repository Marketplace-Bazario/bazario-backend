import express, { Request, Response } from "express";
import dotend from "dotenv";
dotend.config();
import { urlencoded } from "body-parser";
import sequelize from "./db/database";
import adminUserRouter from "./routes/admin/user.routes";
import { initAdmin } from "./helper/init";

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/admin/auth", adminUserRouter);

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
