const UserModel = require("../model/UserModel");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.CreateUser = (req, res, next) => {
    // user data
    const { name, email, password } = req.body;
    // password hashing
    UserModel.findOne({
        where: {
            email: email,
        },
    }).then((data) => {
        if (data) {
            res.json({
                message: "user already available",
                data: data,
            });
        } else {
            Bcrypt.hash(password, 12)
                .then((hashPassword) => {
                    return UserModel.create({
                        name: name,
                        email: email,
                        password: hashPassword,
                    });
                })
                .then((data) => {
                    res.status(201).json({
                        message: "Create successfully",
                        data: data,
                    });
                })
                .catch((error) => {
                    res.status(409).json({
                        message: "Fail to create the post",
                        error: error,
                    });
                });
        }
    });
};

module.exports.LogInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // check if user mail and pass available
        if (Boolean(email) && Boolean(password)) {
            const userData = await UserModel.findOne({
                where: { email: email },
            });
            // check database return any data
            if (userData) {
                const { dataValues } = userData;
                const checkPass = await Bcrypt.compare(
                    password,
                    dataValues.password
                );
    
                if (checkPass && email === dataValues.email) {
                    const token = jwt.sign(
                        { ...dataValues },
                        process.env.SESSION_SECRET,
                        { expiresIn: '1h' }
                    );
                    return res.json({
                        message: "Authenticate successfully",
                        authStatus: true,
                        userAvailable: true,
                        token,
                        data: dataValues,
                    });
                } else if (!checkPass && email === dataValues.email) {
                    return res.json({
                        message: "Password Doesnt match",
                        authStatus: false,
                        userAvailable: true,
                        data: dataValues,
                    });
                } else {
                    return res.json({
                        message: "email and password doesn't match",
                        authStatus: false,
                        userAvailable: false,
                        data: dataValues,
                    });
                }
            } else {
                res.json({
                    message: "User not available, Please signup",
                    authStatus: false,
                    userAvailable: false,
                    authStatus: false,
                });
            }
        } else {
            res.json({
                message: "please fillup the email and password field",
                authStatus: false,
            });
        }
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
