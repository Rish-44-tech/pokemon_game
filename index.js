async function checkPower(){
    const input_pok=document.querySelector("input").value.toUpperCase();
    const given_name=document.getElementById("naam").innerHTML;
    const givenstatname=document.getElementById("statname").innerHTML;
    const givenstat=Number(document.getElementById("statval").innerHTML);
    let points=Number(localStorage.getItem("points"));
    let captured_arr=JSON.parse(localStorage.getItem("captured_arr"))
    const url= "https://pokeapi.co/api/v2/pokemon/"+(input_pok);
    try{
    const response=await fetch(url);
    const data=await response.json();
    
    for(let i=0;i<6;i++){

        if(data["stats"][i]["stat"]["name"].toUpperCase()==givenstatname){
            const input_stat=Number(data["stats"][i]["base_stat"]);
            if(input_stat>givenstat){
                if(captured_arr.includes(input_pok)){
                    points+=givenstat;
                    captured_arr.push(given_name);
                    localStorage.setItem("captured_arr",JSON.stringify(captured_arr));
                    localStorage.setItem("points",points);
                    document.getElementById("out").innerHTML="<p style='color:#4CAF50'>CONGRATULATIONS! "+input_pok.toUpperCase()+"'S "+givenstatname+"("+input_stat+") WAS HIGHER. YOU GAINED "+(input_stat-givenstat)+" POINTS AND CAPTURED "+given_name+".</p>";
                }
                else{
                    points+=(givenstat-input_stat);
                    captured_arr.push(given_name);
                    localStorage.setItem("captured_arr",JSON.stringify(captured_arr));
                    localStorage.setItem("points",points);
                    document.getElementById("out").innerHTML="<p style='color:orange'>Used uncaptured pokemon! You lost "+(input_stat-givenstat)+" points but captured "+given_name+".</p>";
                }
            }
            else{
                points-=givenstat;
                localStorage.setItem("points",points);
                document.getElementById("out").innerHTML="<p style='color:red'>FAILED! "+input_pok.toUpperCase()+"'S "+givenstatname+"("+input_stat+") WAS NOT HIGHER. YOU LOST "+(givenstat)+" POINTS.</p>";
            }
            
        }
    }}catch(error){
        document.getElementById("out").innerHTML="<p style='color:red;'>"+input_pok+" not found.</p>";
    }
    setTimeout(gamescreen3,1000);
}


async function apicall(){
    const num1=Math.floor(Math.random()*898);  //as 898 pokemons index from 0 to 897
    const num2=Math.floor(Math.random()*6)     // as 6 types of stats index from 0 to 5
    const url1 = "https://pokeapi.co/api/v2/pokemon?limit=898";
    const response = await fetch(url1);
    const data = await response.json();
    let naam=data["results"][num1]["name"];
    const url2= "https://pokeapi.co/api/v2/pokemon/"+data["results"][num1]["name"];
    const response2=await fetch(url2);
    const data2=await response2.json();
    let statname=data2["stats"][num2]["stat"]["name"];
    let statvalue=data2["stats"][num2]["base_stat"]
    document.getElementById("naam").innerHTML=String(naam).toUpperCase();
    document.getElementById("statname").innerHTML=String(statname).toUpperCase();
    document.getElementById("statval").innerHTML=statvalue;
    localStorage.setItem("naam",String(naam).toUpperCase());
    localStorage.setItem("statname",String(statname).toUpperCase());
    localStorage.setItem("statval",statvalue);
}



function gamescreen(){
    const startcontent=document.querySelector(".startcontent");
    const oldgamecont=document.querySelector(".gamecont");
    const capturedcont=document.querySelector(".capturedcont")
    if(startcontent!=null){startcontent.remove();}
    if(oldgamecont!=null){oldgamecont.remove();}
    if(capturedcont!=null){capturedcont.remove();}

    let container=document.querySelector(".container");
    const gamecont=document.createElement("div");
    gamecont.classList.add("gamecont");
    container.appendChild(gamecont);

    const x=document.createElement("div");
    x.setAttribute("id","pointsdiv");
    x.style["backgroundColor"]="lightyellow";
    x.style["border"]="1px solid yellow";
    x.style["margin-top"]="20px";
    x.innerHTML="Balance: <span style='color:green; font-size:larger; font-weight:bold;'>"+localStorage.getItem("points")+"</span> P";
    gamecont.appendChild(x);

    const y=document.createElement("div");
    y.classList.add("challenge");
    y.innerHTML="<h2 style='color:#0411a4ff;'>Capture Challenge</h2> <p style='color:grey; font-weight:bolder;'>Pokemon to Out-Stat<br><span style='color:black;' class='pokspan' id='naam'>"+localStorage.getItem("naam")+"</span></p>";

    const q=document.createElement("div");
    q.classList.add("challengin");
    q.innerHTML="<p style='padding:2px;'>Target Base-Stat ( <span id='statname'>"+localStorage.getItem("statname")+"</span> )<br><br><span style='color:#703BE7;' class='pokspan' id='statval'>"+localStorage.getItem("statval")+"</span></p>";
    y.appendChild(q);
    gamecont.appendChild(y);

    const z=document.createElement("input");
    z.classList.add("a")
    z.style["border"]="1px solid lightgray";
    z.style["margin"]="5px 0 20px 0";
    z.setAttribute("placeholder"," Enter a Pokemon name with higher stat...")
    gamecont.appendChild(z);
    z.addEventListener("keydown",(event)=>{
        if(event.key==="Enter"){checkPower();}
    })

    const a=document.createElement("button");
    a.classList.add("a")
    a.classList.add("checkpowerbtn");
    a.innerHTML="Check Power"
    a.style["backgroundColor"]="#4CAF50"
    a.style["color"]="white"
    gamecont.appendChild(a);
    a.addEventListener("click",checkPower);
  
    
    const b=document.createElement("div");
    b.setAttribute("id","out");
    b.style["height"]="100px";
    b.style["display"]="flex";
    b.style["justifyContent"]="center";
    gamecont.appendChild(b);


    const bttcont=document.createElement("div");
    bttcont.classList.add("buttons-container");

    const btt1=document.createElement("button");
    btt1.classList.add("a")
    btt1.setAttribute("id","new-chall");
    btt1.innerHTML="New Challenge"
    btt1.style["backgroundColor"]="lightgray";
    btt1.addEventListener("click",newchallenge);

    const btt2=document.createElement("button")
    btt2.classList.add("a")
    btt2.innerHTML="View Captured ["+JSON.parse(localStorage.getItem("captured_arr")).length+"]";
    btt2.style["backgroundColor"]="#a8ade0ff";
    btt2.style["color"]="#0411a4ff";
    btt2.addEventListener("click",viewCaptured);

    bttcont.appendChild(btt2);
    bttcont.appendChild(btt1);
    gamecont.appendChild(bttcont);

}

function gamescreen1(){
    const captured_arr=[]
    const points=1000;
    localStorage.setItem("captured_arr",JSON.stringify(captured_arr));
    localStorage.setItem("points",points);
    gamescreen();
    apicall();
    localStorage.setItem("loadedonce","true");
}
function gamescreen2(){
    gamescreen();
    const btt=document.getElementById("new-chall");
    btt.remove();
    const bttcont=document.querySelector(".buttons-container");
    const skipbtt=document.createElement("button");
    skipbtt.classList.add("a")
    skipbtt.setAttribute("id","skip");
    skipbtt.innerHTML="Skip"
    skipbtt.style["backgroundColor"]="lightgray";
    skipbtt.addEventListener("click",skip);
    bttcont.appendChild(skipbtt);
}
function gamescreen3(){
    gamescreen2();
    apicall();
}


function viewCaptured(){
    const gameconts=document.querySelector(".gamecont");
    const captured_arr=JSON.parse(localStorage.getItem("captured_arr"));
    gameconts.remove();

    let container=document.querySelector(".container");
    const capturedcont=document.createElement("div");
    capturedcont.classList.add("capturedcont");
    capturedcont.innerHTML="<h2>Your Captured Pokemon</h2>"
    container.appendChild(capturedcont);

    for(let i of captured_arr){
        const rty=document.createElement("div");
        rty.classList.add("captured-element");
        rty.innerHTML="<p style='margin:auto;margin-top:10px;'>"+i+"</p>";
        capturedcont.appendChild(rty);
    }
    const btn3=document.createElement("button")
    btn3.classList.add("a");
    btn3.innerHTML="Back to Challenge"
    btn3.style["backgroundColor"]="#703BE7";
    btn3.style["color"]="white";
    btn3.style["margin-top"]="30px"
    capturedcont.appendChild(btn3);
    btn3.addEventListener("click",gamescreen2);
}

function skip(){
    const ptsded=Math.floor((Number(document.getElementById("statval").innerHTML))/2);
    let points=Number(localStorage.getItem("points"));
    points-=ptsded;
    document.getElementById("out").innerHTML="<p style='color:orange'>Skipped! You lost "+(ptsded)+" points.</p>";
    setTimeout(gpe,1000);
    localStorage.setItem("points",points);
    const x=document.getElementById("pointsdiv").innerHTML="Balance: <span style='color:green; font-size:larger; font-weight:bold;'>"+localStorage.getItem("points")+"</span> P";
    apicall();
}

function newchallenge(){
    const ptsded=Number(document.getElementById("statval").innerHTML);
    let points=Number(localStorage.getItem("points"));
    points-=ptsded;
    document.getElementById("out").innerHTML="<p style='color:orange'>Abandoned! You lost "+(ptsded)+" points.</p>";
    setTimeout(gpe,1000);
    localStorage.setItem("points",points);
    const x=document.getElementById("pointsdiv").innerHTML="Balance: <span style='color:green; font-size:larger; font-weight:bold;'>"+localStorage.getItem("points")+"</span> P";
    apicall();
}
function gpe(){
    document.getElementById("out").innerHTML="";
}

document.querySelector(".start").addEventListener("click",gamescreen1);
window.addEventListener("load",()=>{
    if (localStorage.getItem("loadedonce")==="true"){
         gamescreen2(); 
         }
});



    
