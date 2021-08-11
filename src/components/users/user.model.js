import connection from "./../../services/db.service.js";

class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  static async create(newUser) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query("INSERT INTO users SET ?", newUser);
      sql.end();
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  static async findOne(user) {
    try {
      const sql = await connection();
      let andor = "OR";

      if (user.username) andor = "AND";

      const [row, schema] = await sql.query(
        `SELECT * FROM users WHERE email = ? ${andor} username = ?`,
        [user.email, user.username]
      );

      console.log({ ...row[0] });

      sql.end();
      return { ...row[0] };
    } catch (error) {
      console.error(error);
    }
  }
}

export default User;
