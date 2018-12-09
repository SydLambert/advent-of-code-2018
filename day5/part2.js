let poly=require("fs").readFileSync("input2.txt","utf8");

const react=poly=>{
	let units=[];
	do{
		units.forEach(e=>poly=poly.replace(e,""));
		units=[];
		
		for(let i=0;i<poly.length-1;i++)
			if(poly[i]!=poly[i+1] && poly[i].toLowerCase()==poly[i+1].toLowerCase())
				units.push(poly[i]+poly[i+1]);
	}while(units.length);
	return poly;
};

console.log([...Array(26)].reduce((a,e,i)=>
	Math.min(a,react(poly.replace(
		new RegExp(`[${(i+10).toString(36)}]`,"gi"),""
	)).length)
,Infinity));