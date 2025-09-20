const mongoose = require("mongoose");
const express = require("express");
const app = express();
const csEmployeeCluster =
  "mongodb+srv://amit-shirasao:MongoDBPassword@employee.brpewdm.mongodb.net/";

// Middleware
app.use(express.json());

// Schema and Model of 'Employee' cluster of MongoDB.
const employeeSchema = mongoose.Schema({
  name: String,
  age: Number,
  isGraduate: Boolean,
});
const employeeModel = mongoose.model("Employee", employeeSchema);

//#region API Calls

app.post("/", (req, res) => {
  employeeModel(req.body)
    .save()
    .then((newEmployeeFromDB) => {
      res.send({
        message: "Created this employee.",
        data: newEmployeeFromDB,
      });
    });
});

app.get("/", (req, res) => {
  employeeModel.find().then((employees) => {
    res.send({
      message: "These are all our employees.",
      data: employees,
    });
  });
});

app.get("/:id", (req, res) => {
  employeeModel.findById(req.params.id).then((employee) => {
    res.send({
      message: "Employee with id " + req.params.id + " is given in 'data' field.",
      data: employee,
    });
  });
});

app.put("/:id", (req, res) => {
  employeeModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((employee) => {
      res.send({
        message:
          "Employee with id " + req.params.id + " was modified fully.",
        data: employee,
      });
    });
});

app.patch("/:id", (req, res) => {
  employeeModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((employee) => {
      res.send({
        message:
          "Employee with id " +
          req.params.id +
          " was modified partially.",
        data: employee,
      });
    });
});

app.delete("/:id", (req, res) => {
  employeeModel.findByIdAndDelete(req.params.id).then((deletedEmployee) => {
    res.send({
      message: "Employee with id " + req.params.id + " was deleted.",
      data: deletedEmployee,
    });
  });
});

//#endregion API Calls

mongoose.connect(csEmployeeCluster).then(() => {
  console.log("MongoDB's cluster 'Employee' got connected.");
  app.listen(3000, () => {
    console.log(
      "The ExpressJS server is listening to HTTP requests on port 3000."
    );
  });
});
