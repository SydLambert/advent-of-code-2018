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

for(let x=0;x<=bounds.w;x++){
	for(let y=0;y<=bounds.w;y++){
		let dists=nodes.map(e=>md(x,y,e));
		let minDist=dists.reduce((a,e)=>Math.min(a,e),Infinity);
		if(dists.indexOf(minDist)==dists.lastIndexOf(minDist)){
			let node=nodes[dists.indexOf(minDist)];
			node.zoneSize++;
			node.isInfinite=node.isInfinite||(x==0||x==bounds.w)||(y==0||y==bounds.h);
		}
	}
}

console.log(nodes
	.filter(e=>!e.isInfinite)
	.map(e=>e.zoneSize)
	.reduce((a,e)=>Math.max(a,e),0)
);