// Imports the graceful-fs, inquirer, and shapes modules.
const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./shapes");

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
}

const questions = [
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which shape do you want your logo to be:",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "input",
        name: "shape",
        message: "Enter a color for the logo background:",
    },
    {
        type: "input",
        name: "text",
        message: "Enter up to (3) Characters for your logo:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter a color for the text:",
    },
];

// Function to write data to file
function writeToFile(fileName, data) {
	console.log("Creating [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("You have successfully generated a logo.svg!");
    });
}

async function init() {
    console.log("initializing");
	var svgString = "";
	var svg_file = "logo.svg";

    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

	//user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
		// 0 or 4+ chars, invalid entry
		console.log("Invalid input! Please enter 1-3 Characters");
        return;
	}
	console.log("Text Input: [" + user_text + "]");
	//user font color
	user_font_color = answers["text-color"];
	console.log("Font color: [" + user_font_color + "]");
	//user shape color
	user_shape_color = answers.shape;
	console.log("Shape color: [" + user_shape_color + "]");
	//user shape type
	user_shape_type = answers["pixel-image"];
	console.log("Shape selected = [" + user_shape_type + "]");
	
	//user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
		console.log("Square shape selected");
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
		console.log("Circle shape selected");
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
		console.log("Triangle shape selected");
	}
	else {
		console.log("Invalid Shape selection");
	}
	user_shape.setColor(user_shape_color);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);
	//document.getElementById("svg_image").innerHTML = svgString;

	console.log("Success");
	console.log("Creating file...");
	writeToFile(svg_file, svgString); 
}
init()