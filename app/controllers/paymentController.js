const Razorpay = require('razorpay');
const crypto = require("crypto");
const UserModel = require('../models/userModel');
const PaymentModel = require('../models/PaymentModel');
var instance = new Razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET,
});

const paymentController = {
    payment: async (req, res) => {
        let { amount, email, name, phone, address, course } = req.body;
        let receipt_id = crypto.randomBytes(16).toString("hex");
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "receipt_" + receipt_id
        };
        try {
            let userExist = await UserModel.find({ email: email });
            if (!userExist) {
                let newUser = new UserModel({
                    name: name,
                    email: email,
                    phone: phone,
                    paid: false,
                    query: "",
                    address: address
                })
                let saveResult = await newUser.save();
            }
            else {
                let result = await UserModel.updateOne({ email: email }, {
                    name: name,
                    phone: phone,
                    address: address,
                })
            }
            let order = await instance.orders.create(options);
            res.status(200).send({
                status: true,
                order
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }
    },
    callback: async (req, res) => {
        let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

        var crypto = require("crypto");
        var expectedSignature = crypto.createHmac('sha256', process.env.KEYSECRET)
            .update(body.toString())
            .digest('hex');
        console.log("sig received ", req.body.razorpay_signature);
        console.log("sig generated ", expectedSignature);
        var response = { signatureIsValid: false }
        if (expectedSignature === req.body.razorpay_signature){
            response = { signatureIsValid: true }
        }
        res.send(response);
    },
    verify: async (req, res) => {
        let { email, course_id, verifyStatus, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("verifyStatus");
        console.log(verifyStatus);
        if (!verifyStatus) {
            res.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }
        try {
                await UserModel.updateOne({ email: email }, {
                paid: true
            })
            let newPayment = new PaymentModel({
                email: email,
                course_id: course_id,
                verified: true,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                payment_signature: razorpay_signature
            })
            let result = newPayment.save();
            res.status(200).send({
                status: true
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }
    },
    paids: async (request, response) => {
        let { email,course_id } = request.body;
        try {
            let paidd = await UserModel.findOne({ email: email }, {
                paid: 1
            })
            let verify = await PaymentModel.findOne({email: email, course_id: course_id},{
                verified: 1                
            })
                response.status(200).send({
                    result: paidd.paid,
                    verify: verify.verified
                })
        } catch (error) {
            response.status(500).send({
                status: false,
                message: "server error",
                error
            });
        }
    }
}
module.exports = paymentController;