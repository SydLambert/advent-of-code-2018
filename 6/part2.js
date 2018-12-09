let nodes=require("fs").readFileSync("input2.txt","utf8")
	.split("\r\n")
	.map(e=>e.split(", "))
	.map(e=>({
		x:parseInt(e[0]),
		y:parseInt(e[1]),
	}));
	
let bounds=nodes.reduce((a,e)=>({
	w:Math.max(a.w,e.x),
	h:Math.max(a.h,e.y)
}),{w:0,h:0});

let md=(x,y,node)=>Math.abs(x-node.x)+Math.abs(y-node.y);

let zoneSize=0;

for(let x=0;x<=bounds.w;x++)
	for(let y=0;y<=bounds.w;y++)
		if(nodes.reduce((a,e)=>a+md(x,y,e),0)<10000)
			zoneSize++;

console.log(zoneSize);