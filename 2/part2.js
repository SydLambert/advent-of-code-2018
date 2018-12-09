let boxes=require("fs").readFileSync("input2.txt","utf8").split("\r\n").map(e=>e.split(""));

boxes.forEach(a=>boxes.forEach(b=>{
	let similar=a.filter((e,i)=>e==b[i]);
	if(similar.length==a.length-1){
		console.log(similar.join(""));
		process.exit();
	}
}));