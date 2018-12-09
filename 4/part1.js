let events=require("fs").readFileSync("input1.txt","utf8").split("\r\n").map(e=>({
	date:new Date(e.match(/\[(.*)\]/)[1]),
	action:e.includes("w")?"wake":e.includes("l")?"sleep":"change",
	guard:e.includes("#")?e.match(/#(\d+)/)[1]:null,
})).sort((a,b)=>a.date-b.date).map(e=>
	Object.assign(e,{date:e.date.getMinutes()})
);

let guards=[];
let currentGuard=null;
events.forEach(e=>{
	switch(e.action){
		case "change":
			currentGuard=e.guard;
			if(!guards.hasOwnProperty(currentGuard))
				guards[currentGuard]={
					id:currentGuard,
					totalAsleep:0,
					lastAsleep:null,
					asleepMinutes:[...Array(60)].map(e=>0)
				};
			break;
		case "sleep":
			guards[currentGuard].lastAsleep=e.date;
			break;
		case "wake":
			let lastAsleep=guards[currentGuard].lastAsleep;
			let timeAsleep=e.date-lastAsleep;
			guards[currentGuard].totalAsleep+=timeAsleep;
			for(let i=lastAsleep;i<lastAsleep+timeAsleep;i++)
				guards[currentGuard].asleepMinutes[i]++;
			break;
	}
});
let guard=guards.reduce((a,e)=>a.totalAsleep>e.totalAsleep?a:e,{totalAsleep:0});
let minute=guard.asleepMinutes.reduce((a,e,i)=>a[0]>e?a:[e,i],[0,0])[1];
console.log(guard.id*minute);