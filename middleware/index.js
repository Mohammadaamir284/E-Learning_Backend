import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const key = process.env.MYKEY;

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        console.log("TOKEN =>", token);

        if (!token) return res.status(401).json({ msg: "Token is Not Found" });

        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();

    } catch (err) {
        //if token is invalid 
        return res.status(401).json({ message: "Invalid Token" });
    }
};