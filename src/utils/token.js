import jwt from "jsonwebtoken";

const JWT_SECRET = "c449a57fc0cf8fe35a30b4f12ba16b865562fa156de248d7e4e6a3daa7460e20e76cd6c34d3b4df6bc10466793258c3446bc273bd6ac9ede37dfd07cc35df2c5";

export const gerarToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};