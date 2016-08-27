function add(a,b)
{
    c=11;
    console.log(a+b+ this.c);
}
var sub = {
    c:4
}

add.call(sub,3,1); 

console.log(console);