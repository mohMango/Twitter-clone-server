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

  static async follow(user, followingUser) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "INSERT INTO follow (user_id, following_id) VALUES (?, ?);",
        [user.user_id, followingUser.user_id]
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async following(user) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM users WHERE user_id = (SELECT following_id FROM follow WHERE user_id = ?);",
        [user.user_id]
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async followers(followingUser) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM users WHERE user_id = (SELECT user_id FROM follow WHERE following_id = ?);",
        [followingUser.user_id]
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }
}
