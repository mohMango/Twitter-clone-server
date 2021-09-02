import { connection } from "./../../connection.js";

export class Tweet {
  constructor(tweet) {
    this.user_id = tweet.userId;
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
        "SELECT * FROM tweets WHERE user_id = ?;",
        userId
      );
      sql.end();
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async feed(user) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM tweets WHERE user_id = (SELECT following_id FROM follow WHERE user_id = ?) UNION SELECT * FROM tweets WHERE user_id = ? ;",
        [user.user_id, user.user_id]
      );
      sql.end();
      return { ...row };
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
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(tweet) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "UPDATE tweets SET text = ? WHERE tweet_id = ? ;",
        [tweet.text, tweet.tweet_id]
      );
      sql.end();
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async like(user, tweet) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "INSERT INTO likes (user_id, tweet_id) VALUES (?, ?);",
        [user.user_id, tweet.tweet_id]
      );
      sql.end();
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async likes(tweet) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM likes WHERE tweet_id = ?;",
        tweet.tweet_id
      );
      sql.end();
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }
}
