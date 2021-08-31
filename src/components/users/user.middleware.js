import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedData?.user_id;
    next();
  } catch (error) {
    res.status(401).send({ message: "not authorized" });
    throw new Error(error);
  }
};
