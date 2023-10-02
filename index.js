// Imports the inquirer, file system, and shapes modules
const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./shapes");

function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="50" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Your logo.svg file has been created");
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Enter up to three characters for your logo:",
        name: "text",
      },

      {
        type: "input",
        message:
          "Enter color value OR a hexadecimal number for your text:",
        name: "textColor",
      },
      {
        type: "list",
        message: "Select a shape for your logo:",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message:
          "Enter color value OR a hexadecimal number for your shape:",
        name: "shapeColor",
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Error, enter up to 3 characters only!");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}
promptUser();