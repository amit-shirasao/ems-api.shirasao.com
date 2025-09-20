const express = require("express");
const app = express();

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

app.get("/:identification/:reqparam1/:reqparam2", (req, res) => {
  res.send({
    message:
      "You want to fetch an employee with id " + req.params.identification,
    data: {
      "value of first request param": req.params.reqparam1,
      "value of second request param": req.params.reqparam2,
      "value of first query param": req.query.qparam1,
      "value of second query param": req.query.qparam2,
    },
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
    message: "You want to change employee with id " + req.params.id + " partially.",
    data: req.body,
  });
});

app.delete('/:id', (req, res)=>{
    res.send({
    message: "You want to delete employee with id " + req.params.id + ".",
    data: {},
  });
})

//#endregion API Calls

app.listen(3000, () => {
  console.log(
    "The ExpressJS server is listening to HTTP requests on port 3000."
  );
});
