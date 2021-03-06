let input=require("fs").readFileSync("input2.txt","utf8").split(" ").map(e=>parseInt(e));

let parse=(raw,childNodeCount)=>{
	let childNodes=[];
	for(let i=0;i<childNodeCount;i++){
		if(!raw[0]){
			childNodes.push({
				childNodeCount:0,
				childNodes:[],
				metaDataCount:raw[1],
				metaData:raw.splice(2,raw[1]),
			});
			raw.splice(0,2);
		}
		else{
			let newChild={
				childNodeCount:raw[0],
				metaDataCount:raw.splice(1,1)[0],
			};
			let parsed=parse(raw,raw.splice(0,1)[0]);
			raw=parsed.raw;
			newChild.childNodes=parsed.childNodes;
			newChild.metaData=raw.splice(0,newChild.metaDataCount);
			childNodes.push(newChild);
		}
	}
	return {childNodes:childNodes,raw:raw};
}

let tree=parse(input,1).childNodes[0];

let treeValue=node=>{
	let total=0;
	if(!node.childNodeCount){
		total=node.metaData.reduce((a,e)=>a+e,0);
	}
	else{
		for(let i=0;i<node.metaDataCount;i++){
			let e=node.metaData[i]-1;
			if(!(e in node.childNodes)) continue;
			total+=treeValue(node.childNodes[e]);
		}
	}
	return total;
}

console.log(treeValue(tree));