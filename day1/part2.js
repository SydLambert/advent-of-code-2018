let changes=require("fs").readFileSync("input2.txt","utf8").split("\r\n");

let cycle=[];
let offset=0;

changes.forEach(e=>{
	offset+=parseInt(e);
	cycle.push(offset);
});

for(let i=1;;i++){
	cycle.forEach(e=>{
		let current=e+(offset*i);
		if(cycle.includes(current)){
			console.log(current);
			process.exit();
		}
	});
}