////  write and export files
const fs = require("fs");
const process = require("process");
const path = require("path");
const { argv } = require("process");
const readdirSync = fs.readdirSync;
const stats = fs.statSync;
let searchPath = process.argv[2];


////    search files and directories by path and convert to object


function dirFiles(path) {
  return readdirSync(path).map((item) => {
    let filePath = `${path}\\${item}`;
    return (item = {
      name: filePath,
      type: stats(filePath).isFile() ? "File" : "Folder",
      size: `${stats(filePath)["size"] / 1000} KB`,
    });
  });
}

function deepSearch(path, level) {
  let arrofUnits = [];
  let count = 1;
  function findUnits(path) {
    let data = dirFiles(path);
    for (let unit of data) {
      arrofUnits.push(unit);
      if (!level && unit.type === "Folder") {
        findUnits(unit.name, level);
      } else if (unit.type === "Folder" && count < level[3]) {
        count++;
        findUnits(unit.name, level);
        count--;
      }
    }
  }

  findUnits(path);

  return arrofUnits;
}

// filter files by extention

function filterUnits (data, ext) {
	let fileType = 'File';
	let filesExt = data.filter(item=> {
		let itemNameArr = (item.name.split('.'));
		let itemExt = itemNameArr[itemNameArr.length-1]
		if(itemExt===ext && item.type===fileType) {
			return item
		}
	}) 
return  filesExt
}


function allUnits(path, level, type, ext) {

  if (!type && level && level.length===2) {
    type = level;

  }

  let directoryType = "-d";
  let fileType = "-f";
  let folder = 'Folder';
  let file = 'File'
  let data = deepSearch(path, level);

  if (type === directoryType) {
    data = data.filter((item) => item.type === folder);
  }

  if (type === fileType) {
	data = data.filter((item) => item.type === file);
  }
  if(ext) {
	  filterUnits(data)
  }

  if(ext) {
	  data = filterUnits(data, ext)
  }

  return data
}

let fileContent =allUnits(searchPath, process.argv[3], process.argv[4], process.argv[5]);


//// write/export files in local path(json, csv, txt)

/// JSON

let jsonFile = JSON.stringify(fileContent)
fs.writeFileSync("my-1.json", jsonFile)

//// CSV

//let csv = ['    name    ', '    type   ', '     size    '];
//fileContent.map(item => {
//	let everyArr = Object.values(item);
//	everyArr[0] = '\n' + everyArr[0]
//	csv = csv.concat(...everyArr)
//} 
//)

//fs.writeFileSync("my-3.csv", csv.toString())

////// TEXT

//fs.writeFileSync("my-2.txt", csv.join('------>'));
