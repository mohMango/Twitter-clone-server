import { connection } from "./../../connection.js";

export class Tweet {
  constructor(tweet) {
    this.userId = tweet.userId;
    this.text = tweet.text;
  }

  static async create(tweet) {
    try {
      const sql = await connection();
      await sql.query("INSERT INTO tweets SET ?;", tweet);
      sql.end();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async find(userId) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM tweets WHERE user_Id = ?;",
        userId
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findOne(tweetId) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM tweets WHERE tweet_id = ?;",
        tweetId
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }
}
