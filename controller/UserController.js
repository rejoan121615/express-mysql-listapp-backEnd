const UserModel = require("../model/UserModel");
const Bcrypt = require("bcrypt");

const CreateUser = (req, res, next) => {
    // user data
    const { name, email, password } = req.body;
    // password hashing


    // UserModel.findOne({
    //     where: {
    //         email: email,
    //     },
    // }).then((data) => {
    //     if (data) {
    //         res.json({
    //             status: "user already available",
    //             data: data,
    //         });
    //     } else {
    //         Bcrypt.hash(password, 12)
    //             .then((hashPassword) => {
    //                 return UserModel.create({
    //                     name: name,
    //                     email: email,
    //                     password: hashPassword,
    //                 });
    //             })
    //             .then((data) => {
    //                 res.status(201).json({
    //                     message: "Create successfully",
    //                     data: data,
    //                 });
    //             })
    //             .catch((error) => {
    //                 res.status(409).json({
    //                     message: "Fail to create the post",
    //                     error: error,
    //                 });
    //             });
    //     }
    // });
  
};

exports.CreateUser = CreateUser;
