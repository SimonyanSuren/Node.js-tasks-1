// read and import  files;
const fs = require("fs");
const EventEmitter = require("events");

const readLine = require("readline");
const process = require("process");

const readableStream = fs.createReadStream("my-3.csv");

const rl = readLine.createInterface({
  input: readableStream,
});

let importedArr = [];
   let importedObj = {};


rl.on("line", (line) => {
   importedArr.push(line.split(","));
}).on("close", () => {
  let objArr = [];
  let headers = importedArr.splice(0, 1)[0];
  importedArr.forEach((item) => {
    for (let i = 0; i < item.length - 1; i++) {
      importedObj[headers[i]] = item[i];
    }
    objArr.push(importedObj);
  })
  console.log(objArr);
  console.log(JSON.stringify(objArr));
});

