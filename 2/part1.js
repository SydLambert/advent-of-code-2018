let boxes=require("fs").readFileSync("input1.txt","utf8").split("\r\n");

let res=boxes.reduce((a,b)=>{
	let repeats=b.split("").map(e=>b.match(new RegExp(e,"g")).length);
	return a.map((e,i)=>e+repeats.includes(i+2));
},[0,0]);

console.log(res[0]*res[1]);