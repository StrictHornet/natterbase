// Imports
const express = require("express");
const bodyParser = require("body-parser");

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// function to validate data against rules
var validateRequest = (data, rules) => {
  var res = [];

  rules.forEach(element => {
    if (!data.hasOwnProperty(element)) {
      res.push(element);
    }
  });
  if (!res.length) {
    return "Valid";
  }
  return res;
};

// function to remove item from data if present
var removeItem = (data, item) => {
  if (data.hasOwnProperty(item)) {
    delete data[item];
    return data;
  }

  return "Attribute not found!";
};

// defining an endpoint to validate inputs against 'Rules' list
app.post("/validate", (req, res) => {
  var obj = validateRequest(req.body[0], req.body[1]);
  res.send(obj);
});

// defining an endpoint to validate remove item
app.post("/remove", (req, res) => {
  var obj = removeItem(req.body[0], req.body[1]);
  res.send(obj);
});

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});

