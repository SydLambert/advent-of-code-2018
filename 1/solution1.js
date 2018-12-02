const input=require("fs").readFileSync("input1.txt","utf8");

console.log(eval(input.replace("\r\n","")));