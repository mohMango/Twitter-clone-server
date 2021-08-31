import { Tweet } from "./tweet.model.js";

export const create = async (req, res) => {
  const { text, userId } = req.body;

  const newTweet = new Tweet({
    userId: userId,
    text: text,
  });

  try {
    await Tweet.create(newTweet);
    res.status(201).json({ newTweet });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const feed = async (req, res) => {
  const userId = req.userId;
  try {
    const tweets = await Tweet.find(userId);
    res.status(200).json({ tweets });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const tweet = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const tweet = await Tweet.findOne(tweetId);
    res.status(200).json({ tweet });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
