const { response } = require("express");
const UserModel = require("../models/userModel");

let UserControllers = {
    addUser: async (request, response) => {
        let data = request.body;
        try {
            let result = await UserModel.findOne({ email: data.email });
            // check already exist email
            if (result) {
                response.status(200).send({
                    status: false,
                    message: "Email id is already exist, user other email id",
                });
            } else {
                let newUser = new UserModel({
                    name: data.name,
                    email: data.email,
                    phone: 9999999999,
                    paid: false,
                    query: "",
                    address: ""
                })
                let saveResult = await newUser.save();
                response.status(200).send({
                    status: true,
                    result: saveResult,
                });
            }
        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }
    },
    getHome: async (req,res) => {
        response.status(200).send({
            status:true,
            msg: "Home api working"
        });
    }
}

module.exports = UserControllers