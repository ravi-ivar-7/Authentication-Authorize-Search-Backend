require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Register } = require('../models/user');


//  Body for register
// {
//     "EmailId" : "ravi404606@gmail.com",
//     "F_Name" : "Ravi",
//     "L_Name" : "Ivar",
//     "Password" : "12345"
// }

const generateToken = (user) => {
    const payload = {
        user_id: user._id,
        email: user.EmailId,
        permissions: user.Permissions ,
        issuedAt : user.currentTime
    };
    const options = {
        expiresIn: '10m' 
    };
    return jwt.sign(payload, process.env.TOKEN_KEY, options);
};


const registerUser = async (req, res) => {
    try {
        const { EmailId, F_Name, L_Name,Permissions , Password  } = req.body;

        if (!(EmailId && F_Name && L_Name && Password)) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const oldUser = await Register.findOne({ EmailId });
        if (oldUser) {
            return res.status(409).json({ Info: "User already exists" });
        }

        const encryptPassword = await bcrypt.hash(Password, 10);

        const user = await Register.create({
            EmailId: EmailId.toLowerCase(),
            F_Name: F_Name,
            L_Name: L_Name,
            Permissions : Permissions,
            Password: encryptPassword
        });

        const token = generateToken(user);
        user.Token = token;
        user.save();

        return res.status(200).json({ message: "Account created successfully", user });
    } catch (err) {
        console.error("Error occurred while creating new user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { EmailId, Password } = req.body;
        if (!(EmailId && Password)) {
            return res.status(400).send("Email and password are required!");
        }

        const user = await Register.findOne({ EmailId });

        if (user && await bcrypt.compare(Password, user.Password)) {

            const token = generateToken(user);
            user.Token = token;
            user.save();

            // return res.status(200).json({"Info" : "Successfull Login", user: user});
            return res.status(200).json({"Info" : "Successfull Login", token: user.Token});
        }

        return res.status(400).json("Invalid credentials");

    } catch (err) {
        console.log("Error occurred during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports={registerUser, loginUser};