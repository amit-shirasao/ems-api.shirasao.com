const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

const mongoDBPassword = "MongoDBPassword";
const mongoDBConnectionString =
  "mongodb+srv://amit-shirasao:" +
  mongoDBPassword +
  "@employee.brpewdm.mongodb.net/";

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Schema and Model for "Employee" Cluster.
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isGraduate: Boolean,
});
const employeeModel = mongoose.model("Employee", employeeSchema);

//#region API Calls

// Create       POST  (pass full object)
app.post("/", (req, res) => {
  let newEmp = employeeModel(req.body);
  newEmp.save().then((newEmployeeCreatedInDB) => {
    res.send({
      message: "You requested to create an employee.",
      data: newEmployeeCreatedInDB,
    });
  });
});

// Read All     GET
app.get("/", (req, res) => {
  employeeModel.find().then((allEmployees) => {
    res.send({
      message: "Fetched employees.",
      data: allEmployees,
    });
  });
});

// Read One     GET     (pass an id)
app.get("/:id", (req, res) => {
  let id = req.params.id;
  employeeModel.findById(id).then((employee) => {
    res.send({
      message: "Fetched employee with id " + id + ".",
      data: employee,
    });
  });
});

app.get("/:id/:name", (req, res) => {
  let { id, name } = req.params;
  let { age, isGraduate } = req.query;

  let filter = {
    id: id,
    name: name,
  };

  if (age) {
    filter.age = parseInt(age);
  }

  if (isGraduate) {
    filter.isGraduate = isGraduate === "true";
  }

  employeeModel.find(filter).then((employeesSatisfyingFilterCriteria) => {
    res.send({
      message: "Fetched employees.",
      data: employeesSatisfyingFilterCriteria,
    });
  });
});

// Update Fully         PUT         (pass an id and full object)
app.put("/:id", (req, res) => {
  let id = req.params.id;
  let updatedEmployee = req.body;
  employeeModel
    .findByIdAndUpdate(id, updatedEmployee, { new: true })
    .then((returnedUpdatedEmployee) => {
      res.send({
        message: "Fully updated the employee with id " + id + ".",
        data: returnedUpdatedEmployee,
      });
    });
});

// Update Partially     PATCH       (pass an id and partial object)
app.patch("/:id", (req, res) => {
  let id = req.params.id;
  let updatedEmployee = req.body;
  employeeModel
    .findByIdAndUpdate(id, updatedEmployee, { new: true })
    .then((returnedUpdatedEmployee) => {
      res.send({
        message: "Patially updated the employee with id " + id + ".",
        data: returnedUpdatedEmployee,
      });
    });
});

// Delete       DELETE  (pass an id)
app.delete("/:id", (req, res) => {
  let id = req.params.id;

  employeeModel.findByIdAndDelete(id).then((deletedEmployee) => {
    res.send({
      message: "Deleted the employee with id " + id + ".",
      data: deletedEmployee,
    });
  });
});

//#endregion API Calls

// Mongoose Code:
mongoose.connect(mongoDBConnectionString).then(() => {
  console.log("MongoDB Cluster called 'Employee' is connected.");
  app.listen(process.env.PORT, () => {
    console.log(
      // "Express.js sever is listening on https://ems-api.shirasao.com/."
      "Express.js server is listening on localhost:" + process.env.PORT
    );
  });
});
