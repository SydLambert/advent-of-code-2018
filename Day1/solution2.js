const changes=require("fs").readFileSync("input2.txt","utf8").split("\r\n");

let acc=0;
let seen=[acc];

for(let i=0; seen.indexOf(acc)==seen.lastIndexOf(acc); i=i+1%changes.length){
	acc+=parseInt(changes[i%changes.length]);
	seen.push(acc);
}

console.log(seen.pop());