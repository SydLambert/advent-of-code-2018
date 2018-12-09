let poly=require("fs").readFileSync("input1.txt","utf8");

let units=[];
do{
	units.forEach(e=>poly=poly.replace(e,""));
	units=[];
	
	for(let i=0;i<poly.length-1;i++)
		if(poly[i]!=poly[i+1] && poly[i].match(new RegExp(poly[i+1],"i")))
			units.push(poly[i]+poly[i+1]);
}while(units.length);

console.log(poly.length);