require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
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
    "student",
    studentSchema
);

app.get("/student/:usn", async (req, res) => {
    try {
        const student = await Student.findOne({
            usn: req.params.usn
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});