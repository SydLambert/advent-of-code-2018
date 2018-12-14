let players=470;
let totalMarbles=72170;

let maxMarble=-1;
let circle=[];
let currentMarble=-1;
players=[...Array(players)].map(e=>0);

for(let turn=0;maxMarble<totalMarbles;turn=(turn+1)%players.length){
	if(!(maxMarble%10000)){
		console.log(maxMarble+" "+((maxMarble/totalMarbles)*100))
	}
	if((currentMarble>0 && !((currentMarble+1)%23))){
		players[turn]+=currentMarble+1;
		let index=circle.indexOf(currentMarble)-7;
		if(index<0) index+=circle.length
		players[turn]+=circle.splice(index,1)[0];
		currentMarble=circle[index];
		maxMarble++;
	}
	else{
		circle.splice((Math.max(0,circle.indexOf(currentMarble))+1)%circle.length+1, 0, ++maxMarble);
		currentMarble=maxMarble;
	}
}

let winner=players.reduce((a,e,i)=>e>players[a]?i:a,0)
console.log(`Elf #${winner} wins with score `+players[winner]);