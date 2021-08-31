import { connection } from "./../../connection.js";

export class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  static async create(user) {
    try {
      const sql = await connection();
      await sql.query("INSERT INTO users SET ?;", user);
      sql.end();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findOne(user) {
    try {
      const sql = await connection();
      let andor = "OR";

      if (user.username) andor = "AND";

      const [row, schema] = await sql.query(
        `SELECT * FROM users WHERE email = ? ${andor} username = ?;`,
        [user.email, user.username]
      );

      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }
}
