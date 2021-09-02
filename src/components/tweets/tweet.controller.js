import { Tweet } from "./tweet.model.js";

export const create = async (req, res) => {
  const { text } = req.body;

  const newTweet = new Tweet({
    userId: req.userId,
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

export const update = async (req, res) => {
  const { text } = req.body;
  const { tweetId } = req.params;
  try {
    const tweet = await Tweet.update({ tweet_id: tweetId, text: text });
    res.status(200).json({ tweet });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const like = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const result = await Tweet.like(
      { user_id: req.userId },
      { tweet_id: tweetId }
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likes = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const likes = await Tweet.likes({ tweet_id: tweetId });
    res.status(200).json({ likes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
