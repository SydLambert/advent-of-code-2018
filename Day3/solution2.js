let claims=require("fs").readFileSync("input2.txt","utf8").split("\r\n");

let aabb=(b1,b2)=>
    (b1.x+b1.w>b2.x)&&
    (b2.x+b2.w>b1.x)&&
    (b1.y+b1.h>b2.y)&&
    (b2.y+b2.h>b1.y)
 
claims=claims.map((e,i)=>({
    id:i+1,
    x:parseInt(e.match(/@ (.*?),/)[1]),
    y:parseInt(e.match(/,(.*):/)[1]),
    w:parseInt(e.match(/: (.*)x/)[1]),
    h:parseInt(e.match(/x(.*)/)[1])
}));

claims=claims.filter(a=>
	claims.filter(e=>e!=a).every(
		b=>!aabb(a,b)
	)
);

console.log(claims[0].id);