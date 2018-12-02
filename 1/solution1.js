const changes=require("fs").readFileSync("input1.txt","utf8");

console.log(eval(changes.replace("\r\n","")));