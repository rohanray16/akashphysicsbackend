const CourseModel = require("../models/CourseModel");
const UserModel = require("../models/userModel");
let courseType = require("../resources/Course.json")
let CourseController = {
    addCourse: async (request, response) => {
        try {
            let result = await CourseModel.insertMany(courseType);
            response.status(200).send({
                status: true,
                message: "course type added successfully",
                result,
            });
        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error,
            });
        }
    },
    getCourse: async (request, response) => {
        let { id } = request.params;
        try {
            let result = await CourseModel.findOne({ course_id: Number(id) });
            response.status(200).send({
                status: true,
                course: result,
            });
        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error,
            });
        }
    },
    addQuery: async (request, response) => {
        let { name, email, phone, query } = request.body;
        try {
            let userExists = await UserModel.findOne({ email: email });
            console.log("came here 1");
            if (userExists) {
                if (userExists.paid == false) {
                    await UserModel.updateOne({ email: email }, {
                        name: name,
                        phone: phone,
                        query: query,
                    })
                    console.log("canem here 2");
                }
                else{
                    await UserModel.updateOne({email: email},{
                        query: query
                    })
                }
            }
            else{
                let newUser = new UserModel({
                    name: name,
                    email: email,
                    phone: phone,
                    query: query
                });
                let saveResult = newUser.save();
                console.log("came here 3");
            }
                response.status(200).send({
                    result: true,
                    message: "query inserted successfully"
                })
            } catch (error) {
                response.status(500).send({
                    result: false,
                    message: "server error",
                    error,
                });
            }
        }

}

module.exports = CourseController;