const fs = require("fs");
const path = require("path");
const os = require("os");
// // fs.writeFileSync('./hello.text','Hello word, this is my first file using nodeJS');

// const filePath = path.join(__dirname,'files','info.txt');

// // const result = fs.readFileSync(filePath,'utf-8');

// // console.log(result);

// let dataArr = [];

// fs.readFile(filePath,'utf-8',(err,info)=>{
//     if(err){
//         console.log(err);
//     }else{
//         const infoArr = info.split('\r\n');
//         // console.log(infoArr);
//         infoArr.forEach(line=>{
//             dataArr.push(line)
//         })
//     }
// })

// setTimeout(() => {
//     console.log(dataArr,"From async");
// }, 100);

// const helloFilePath = path.join(__dirname,'files','hello.txt');

// fs.appendFileSync(helloFilePath,`\n ${new Date().toISOString()} is the time of file update`);

// const fileState = fs.statSync(helloFilePath);

// console.log(fileState);

// // remove all folder with content

// fs.rmSync('../temp',{recursive: true, force: true});

// all steps to understand the file system module  in nodeJs

// explanation of all steps

// Node.js provides a built-in module called 'fs' (file system) that allows you to interact with the file system on your computer. Here are the steps to understand how to use the 'fs' module in Node.js:

// step 1: create a folder

// synchronous way
fs.mkdirSync("myFolder", { recursive: true });
fs.mkdirSync("temp", { recursive: true }); // Ensure 'temp' folder exists synchronously

// asynchronous way
fs.mkdir("temp", { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});

// step 2: create a file in that folder
// const filePath = path.join(__dirname,'../myFolder','greet.txt');

// step 3: add data to that file
// const myFolderPath = path.join(__dirname, 'myFolder');
// const tempFolderPath = path.join(__dirname,'temp');
// console.log(myFolderPath);
// console.log(tempFolderPath);

const greetFilePath = path.join(__dirname, "../myFolder", "greet.txt");
const testFilePath = path.join(__dirname, "../temp", "test.txt");
fs.writeFileSync(
  greetFilePath,
  "Hello, this is a greeting file. Welcome to Node.js file system module!"
);

if (fs.existsSync(testFilePath)) {
  fs.writeFile(
    testFilePath,
    "This is a test file in the temp folder.",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
// step 4: read the data from that file
const greetData = fs.readFileSync(greetFilePath, "utf-8");
// console.log(greetData);

// step 5: rename that file
const newGreetFilePath = path.join(
  __dirname,
  "../myFolder",
  "greetRenamed.txt"
);
fs.renameSync(greetFilePath, newGreetFilePath);
// step 6: delete that file

if (fs.existsSync(testFilePath)) {
  fs.unlink(testFilePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
// step 7: delete that folder
if (fs.existsSync("../temp")) {
  fs.rmdirSync("../temp");
}
// step 8: check if that folder is there or not
const isTempFolderExists = fs.existsSync(path.join(__dirname, "../temp"));
console.log("Does temp folder exist?", isTempFolderExists);
// step 9: check if that file is there or not
const isGreetFileExists = fs.existsSync(newGreetFilePath);
console.log("Does greetRenamed.txt file exist?", isGreetFileExists);
// step 10: get the file information

// end to end example of file system module in nodeJs


// Blocking code
const greetResult = fs.readFileSync(newGreetFilePath, 'utf-8');

// Non-blocking code
fs.readFile(newGreetFilePath,'utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})

console.log(greetResult);

console.log('After file read operation 1');
console.log('After file read operation 2');
console.log('After file read operation 3');
console.log('After file read operation 4');

console.log(os.platform());
console.log(os.homedir());
console.log(os.cpus().length,"Threads of my system");
console.log(os.freemem());
console.log(os.totalmem(),'Total memory of my system');
console.log(os.uptime());



