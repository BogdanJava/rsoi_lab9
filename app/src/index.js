let express = require("express");
let bodyParser = require("body-parser");
let requirejs = require("requirejs");
let path = require("path");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let viewsDir = `${__dirname}${path.sep}views`;
app.use(express.static(viewsDir));

requirejs(["./config"], config => {
  console.log(viewsDir);
  config.VIEW_DIR = viewsDir;
});

app.get("/warehouse/main/", (req, res) => {
  requirejs(["repository/query-modules/template"], template => {
    template.renderFile(
      "main.html",
      result => {
        res.send(result);
      },
      error => console.log(error)
    );
  });
});

app.get("/warehouse/employees", (req, res) => {
  requirejs(["repository/query-modules/template"], template => {
    template.renderFile(
      "employees.html",
      result => {
        res.send(result);
      },
      error => console.log(error)
    );
  });
});

app.get("/api/employees", (req, res) => {
  let query = req.param("query");
  requirejs(["repository/employeeRepository"], repository => {
    repository.getByQuery(query, {}, employees => {
      res.status(200);
      res.send(employees);
    });
  });
});

app.post("/api/employees", (req, res) => {
  let employee = req.body;
  requirejs(["repository/employeeRepository"], repository => {
    repository.save(
      employee,
      err => {
        console.log(err);
        res.send({ success: false });
      },
      () => {
        res.send({ success: true });
      }
    );
  });
});

app.get("*", (req, res) => {
  requirejs(["repository/query-modules/template"], template => {
    template.renderFile(
      "error.html",
      result => {
        res.send(result);
      },
      () => res.send({ success: false })
    );
  });
});

requirejs(["repository/employeeRepository"], function(employeeRepository) {
  employeeRepository.connect();
});

requirejs(["config"], function(config) {
  app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
  });
});
