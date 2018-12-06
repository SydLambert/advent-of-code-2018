let claims=require("fs").readFileSync("input1.txt","utf8").split("\r\n");
 
claims=claims.map((e,i)=>({
    id:i+1,
    x:parseInt(e.match(/@ (.*?),/)[1]),
    y:parseInt(e.match(/,(.*):/)[1]),
    w:parseInt(e.match(/: (.*)x/)[1]),
    h:parseInt(e.match(/x(.*)/)[1])
}));

let overlapped=0;
let grid=[...Array(1000)].map(e=>[...Array(1000)].map(e=>({claim:null,overlapped:false})));
claims.forEach((e,i)=>{
	[...Array(e.w)].forEach((w,x)=>{
		[...Array(e.h)].forEach((h,y)=>{
			if(true){
				let cell=grid[e.y+y][e.x+x];
				if(cell.claim!=e.id){
					if(cell.claim!=null && !cell.overlapped){
						overlapped++;
						cell.overlapped=true;
					}
					cell.claim=e.id;
				}
			}
		});
	});
});
console.log(overlapped);