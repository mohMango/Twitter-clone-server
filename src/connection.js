import sql from "mysql2/promise";

export const connection = async () => {
  try {
    const con = await sql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
    });

    return con;
  } catch (error) {
    console.error("connection error");
    console.error(error);
    return null;
  }
};
