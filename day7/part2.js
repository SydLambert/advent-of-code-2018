let input=require("fs").readFileSync("input2.txt","utf8").split("\r\n").map(e=>({
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

let workers=[...new Array(5)].map(e=>({task:"",work:0}));
let seenTasks=[];
let done=[];
let secs=0;
while(Object.keys(nodes).length){
	let available=Object.keys(nodes).filter(e=>nodes[e].every(e=>done.includes(e)));
	available=available.sort().filter(e=>(!seenTasks.includes(e)));

	for(let i=available.length-1;i>=0;i--){
		for(let j=0;j<workers.length;j++){
			if(workers[j].task!=available[i] && !workers[j].work){
				workers[j].task=available[i];
				workers[j].work=(parseInt(available[i],36)-9)+60
				seenTasks.push(available[i]);
				available.splice(i,1);
				break;
			}
		}
	}

	for(let j=0;j<workers.length;j++){
		workers[j].work=Math.max(0,workers[j].work-1);
		if(!workers[j].work){
			done.push(workers[j].task);
			delete nodes[workers[j].task];
		}
	}
	secs++;
}

console.log(secs);