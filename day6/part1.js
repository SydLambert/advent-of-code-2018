let nodes=require("fs").readFileSync("input1.txt","utf8")
	.split("\r\n")
	.map(e=>e.split(", "))
	.map(e=>({
		x:parseInt(e[0]),
		y:parseInt(e[1]),
		zoneSize:0,
		isInfinite:false,
	}));
	
let bounds=nodes.reduce((a,e)=>({
	w:Math.max(a.w,e.x),
	h:Math.max(a.h,e.y)
}),{w:0,h:0});

let md=(x,y,node)=>Math.abs(x-node.x)+Math.abs(y-node.y);


console.log(nodes);
console.log(bounds);

let grid=[...Array(bounds.h+1)].map(e=>[...Array(bounds.w+1)].map(e=>"."));

nodes.forEach(e=>grid[e.y][e.x]="N");
console.log(grid.map(e=>e.join("")).join("\n"));
console.log("\n\n");

grid.forEach((ey,y)=>ey.forEach((ex,x)=>{
	let dists=nodes.map(e=>md(x,y,e));
	let distsSorted=Array.from(dists).sort((a,b)=>a-b);
	if(distsSorted[0]!=distsSorted[1]){
		grid[y][x]=dists.indexOf(distsSorted[0]);
		let node=nodes[dists.indexOf(distsSorted[0])];
		node.zoneSize++;
		node.isInfinite=node.isInfinite||(x==0||x==bounds.w)||(y==0||x==bounds.h);
	}
}));

console.log(grid.map(e=>e.join("")).join("\n"));

console.log(nodes);

console.log(nodes.filter(e=>!e.isInfinite).map(e=>e.zoneSize).reduce((a,e)=>Math.max(a,e),0));