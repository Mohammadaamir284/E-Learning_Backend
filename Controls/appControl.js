import newDBS from "../models/newSchema.js"
import AddUser from "../models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv"

configDotenv()

const key = process.env.MYKEY

export const myAbout = (req, res) => {
    res.send("my external About")
}

export const mynewdbs = async (req, res) => {
    const get = await newDBS.find()
    res.status(200).json({ data: get })
}

export const course = async (req, res) => {
    const course = await newDBS.findById(req.params.id);
    res.json(course);
}

export const allUser = async (req, res) => {
    const get = await AddUser.find()
    res.status(200).json({ data: get })
}

export const newUser = async (req, res) => {
    try {
        const { username, email, password, mobile_no, dob, pic, gender } = req.body
        const dPass = bcrypt.hashSync(password, 10)
        if (!username || !email || !password || !mobile_no || !dob || !pic || !gender) {
            return res.status(404).json({ message: 'Please Fill All Required Fields' })
        } else {
            const isAlreadyExist = await AddUser.findOne({ email })
            if (isAlreadyExist) {
                return res.status(400).json({ message: 'User Already Exists' })
            }
            else {
                const addNewUser = new AddUser({ username, email, password: dPass, mobile_no, dob, pic, gender })
                await addNewUser.save()
                res.status(200).json({ data: addNewUser, message: 'User Register Successfully ' })
            }
        }

    } catch (error) {
        res.status(400).json({ msg: "error ", error })
    }
}

export const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please Fill All Required Fields' });
        }

        const user = await AddUser.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const myToken = jwt.sign(
            { id: user._id, email: user.email },
            key,
            { expiresIn: '1h', algorithm: 'HS256', issuer: 'backend' }
        );

        console.log(myToken);


        res.cookie("token", myToken, {
            httpOnly: true,
            secure: false,     
            sameSite: "lax",   
            path: "/",   
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            data: user,
            message: 'Login Successfully',
            token: myToken
        });


    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


