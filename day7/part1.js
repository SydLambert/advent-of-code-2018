let input=require("fs").readFileSync("input1.txt","utf8").split("\r\n").map(e=>({
	pre:e[5],
	step:e[36],
}));

letters=new Set([
	...input.map(e=>e.pre),
	...input.map(e=>e.step)
]);

let nodes=[...letters].reduce((a,e)=>
	Object.assign(a,{
		[e]:input.filter(p=>p.step==e).map(e=>e.pre)
	})
,{});

let done=[];
while(Object.keys(nodes).length){
	let available=Object.keys(nodes).filter(e=>nodes[e].every(e=>done.includes(e)));
	available.sort();
	done.push(available[0]);
	delete nodes[available[0]];
}

console.log(done.join(""));