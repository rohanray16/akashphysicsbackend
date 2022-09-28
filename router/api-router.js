const express = require("express");
const CourseController = require("../controllers/CourseControllers");
const paymentController = require("../controllers/paymentController");
const UserControllers = require("../controllers/UserControllers");
const router = express.Router();

router.get("/get-course/:id",CourseController.getCourse)

router.post("/add-course",CourseController.addCourse);
router.post("/add-user",UserControllers.addUser);
router.post("/payment",paymentController.payment);
router.post("/callback",paymentController.callback);
router.post("/verify",paymentController.verify);
router.post("/paids",paymentController.paids);
router.post("/add-query",CourseController.addQuery);

module.exports = router;
