function capturedpokemon(){
    document.querySelector("button").addEventListener("click",function (){
        captured++;
        this.innerHTML="View Captured ["+captured+"]";
    });
}

let points=1000
function gamescreen(){
    const x=document.createElement("div");
    x.classList.add("gamecontent");
    x.classList.add("point");
    x.innerHTML="Balance: <span style='color:green; font-size:larger; font-weight:bold;'>"+points+"</span> P";

    const y=document.createElement("div");
    y.classList.add("gamecontent");
    y.classList.add("challenge");
    y.innerHTML="";

    const z=document.createElement("input");
    z.setAttribute(placeholder,"Enter a pokemon name with higher stat...");
    
    
    let container=document.querySelector(".container");
    container.appendChild(x);
    container.appendChild(z);

}
gamescreen()


    
