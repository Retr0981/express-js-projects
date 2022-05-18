const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/npm-app")
  .then(() => console.log("connected to database"))
  .catch((err) => console.error("Error connecting to databse", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "The course must have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "blockchain", "mobile"],
  },
});

const Course = mongoose.model("Course", courseSchema);
const createCourse = async () => {
  const course = new Course({
    name: "Decentralized apps",
    author: "David Nii Armah",
    tags: ["backend"],
    isPublished: true,
    price: 30,
    category: "blockchain",
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
};
const pageNumber = 2;
const pageSize = 10;
createCourse();
const getCourse = async () => {
  const courses = await Course.find({
    author: "David Nii Armah",
  })
    .sort({ name: 1, tags: 1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log(courses);
};
createCourse();
