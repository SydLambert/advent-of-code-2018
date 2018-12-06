let events=require("fs").readFileSync("input2.txt","utf8").split("\r\n").map(e=>({
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

let minutes=[...Array(60)].map(e=>({}));
guards.forEach(g=>{
	g.asleepMinutes.forEach((m,mi)=>{
		if(!minutes[mi][g.id])
			minutes[mi][g.id]=0;
		minutes[mi][g.id]+=m;
	});
});

let chosenGuard=minutes.reduce((a,e,i)=>{
	let guard=Object.keys(e).reduce((a2,g)=>
		e[g]>a2.sleep?{id:g,sleep:e[g]}:a2
	,{id:-1,sleep:0});
	return guard.sleep>a.sleep?{minute:i,id:guard.id,sleep:guard.sleep}:a;
},{minute:0,id:0,sleep:0});

console.log(chosenGuard.id*chosenGuard.minute);