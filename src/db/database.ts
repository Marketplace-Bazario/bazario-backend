import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "marketplace_bazario",
  logging: false,
  define: {
    timestamps: true,
  },
});

export default sequelize;
