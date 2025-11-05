let x=Math.floor(Math.random()*898);  //as 898 pokemons index from 0 to 897
let y=Math.floor(Math.random()*6)     // as 6 types of stats index from 0 to 5
async function apicall() {
    const url1 = "https://pokeapi.co/api/v2/pokemon?limit=898";
    const response = await fetch(url1);
    const data = await response.json();
    let naam=data["results"][x]["name"];
    const url2= "https://pokeapi.co/api/v2/pokemon/"+data["results"][x]["name"];
    const response2=await fetch(url2);
    const data2=await response2.json();
    let statname=data2["stats"][y]["stat"]["name"];
    let statvalue=data2["stats"][y]["base_stat"]
    return {naam,statname,statvalue};

}

async function main(){
    let results=await apicall();
    console.log(results.naam);
    console.log(results.statname);
    console.log(results.statvalue);
}

main();



