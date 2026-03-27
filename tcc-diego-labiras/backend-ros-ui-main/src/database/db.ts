import { Pool } from "pg";
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT || "5432"),
});

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "react-ros-ui",
//   password: "postgres",
//   port: 5432,
// });

export { pool };
