//// read and import  files;
//const fs = require("fs");
//const process = require("process");

const fs = require("fs");
 

let readableStream = fs.createReadStream("my-1.json" );
 
readableStream.on("data", function(chunk){ 

    console.log(JSON.parse( chunk));
});

//let readableStream = fs.createReadStream("hello.txt", "utf8");
 
//let writeableStream = fs.createWriteStream("some.txt");
 
//readableStream.on("data", function(chunk){
//    writeableStream.write(chunk);
//});