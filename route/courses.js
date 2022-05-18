const express = require("express");
const router = express.Router();
const courses = [
  {
    courseID: 1,
    title: "biology"
  },
  {
    courseID: 2,
    title: "chemistry"
  },
  {
    courseID: 3,
    title: "physics"
  }
];

router.get("/", (req,res) => {
  res.send(courses);
});

router.post("/", (req,res) => {
  if (!req.body.title || req.body.title < 4) {
    return res.status(404).send("Enter a minimum of 3 characters");
  }
  const course = {
    courseID: courses.length + 1,
    title: req.body.title
  };
  courses.push(course);
  res.send(course)
});
router.get("/:courseID", (req, res) => {
  const course = courses.find(
   c => c.courseID === parseInt(req.params.courseID);
    if (!course) res.status(404).send("Course not found");
    return res.send(course);

});

router.put("/:courseID", (req, res) => {
  const course = courses.find(
   c => c.courseID === parseInt(req.params.courseID);
 if (!course)  res.status(404).send("Course Not found");


 course.title = req.body.title;
 res.send(course);
});

router.delete("/:courseID", (req,res) => {
  const course = courses.find(
    c => c.courseID === parseInt(req.params.courseID)
    );
  if (!course) res.status(404).send("Course Not Found");
  res.send(course);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;