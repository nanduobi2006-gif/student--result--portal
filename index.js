require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const studentSchema = new mongoose.Schema({

    usn: String,
    name: String,
    semester: Number,

    subjects: [

        {
            subjectCode: String,
            subjectName: String,
            marks: Number
        }

    ]

});

const Student = mongoose.model(
    "students",
    studentSchema
);

app.get("/student/:usn", async(req, res) => {

    const usn = req.params.usn;

    const student =
    await Student.findOne({ usn: usn });

    if(student){

        res.json(student);

    }

    else{

        res.json({

            message: "Student Not Found"

        });

    }

});

app.listen(3000, () => {

    console.log(

        "Server Running on Port 3000"

    );

});