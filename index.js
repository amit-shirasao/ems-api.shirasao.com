const mongoose = require("mongoose");
const express = require("express");
const app = express();
const csEmployeeCluster =
  "mongodb+srv://amit-shirasao:MongoDBPassword@employee.brpewdm.mongodb.net/";

// Middleware
app.use(express.json());

//#region API Calls

app.post("/", (req, res) => {
  res.send({
    message: "You want to create a new employee.",
    data: req.body,
  });
});

app.get("/", (req, res) => {
  res.send({
    message: "You want to fetch all employees.",
    data: [{}, {}, {}],
  });
});

app.get("/:id", (req, res) => {
  res.send({
    message: "You want to fetch an employee with id " + req.params.id,
    data: {},
  });
});

app.put("/:id", (req, res) => {
  res.send({
    message: "You want to change employee with id " + req.params.id + " fully.",
    data: req.body,
  });
});

app.patch("/:id", (req, res) => {
  res.send({
    message:
      "You want to change employee with id " + req.params.id + " partially.",
    data: req.body,
  });
});

app.delete("/:id", (req, res) => {
  res.send({
    message: "You want to delete employee with id " + req.params.id + ".",
    data: {},
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
