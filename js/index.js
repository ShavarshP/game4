const createTileValues=(theSize)=>{
  const value=[]
  for (let i = 0; i < theSize; i++) {
    let value2=[]
    for (let j = 0; j <theSize; j++) {
      value2.push(null)
    }
    value.push(value2)
  }
  return value
}
//

const createParticipants=(theSize, coefficient)=>{
  return (Math.round(theSize*theSize/coefficient+1))*2
}

//
const createLocations=(numberOfWallsWolves, gamesiz)=>{
  const Locations=[]
  for (let i = 0; i < numberOfWallsWolves; i++) {
    let loc=[randomIndex(0, gamesiz), randomIndex(0, gamesiz)]

    if(!isLocationsMatch(loc, Locations)){

      Locations.push(loc)
    }else {
      i--
    }
  }
  return Locations

}

const isLocationsMatch=(loc, arrXy)=>{
  for (var i = 0; i < arrXy.length; i++) {
    if (loc[0]==arrXy[i][0] && loc[1]==arrXy[i][1] ) {
      console.log(loc, arrXy);
      return true
    }
  }
}

function randomIndex(min, max) {

    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  //

const createPlayers=(loc, numb)=>{
  const players=loc.map((t,i)=>{
    if (i==0) {
      return {name:"rabbit", loc:t, img:"https://img.lovepik.com/element/40154/9145.png_860.png" }
    }else if (i==1) {
      return {name:"home", loc:t, img:'https://media.istockphoto.com/vectors/cartoon-house-vector-id508580175'}
    }else if (i>=loc.length-numb) {
      return {name:"wolves", loc:t, img:'https://media.istockphoto.com/vectors/big-bad-wolf-cartoon-vector-id519587189'}
    }
    return {name:"Walls", loc:t, img:'https://w7.pngwing.com/pngs/996/1011/png-transparent-fence-garden-lawn-fence-grass-flower-garden-chainlink-fencing.png'}

  })
  return players
}
///
const placePlayers=(tileValues, players)=>{
  for (let i = 0; i < players.length; i++) {
    let x=players[i].loc[0]
    let y=players[i].loc[1]
    tileValues[y][x]={name:players[i].name, img:players[i].img}
  }

  return tileValues
}
/////


////////////////////////////////
const render=(tableOfGame, siz, sizblock)=>{
  document.getElementById('container').innerHTML = ""
  document.getElementById('container').style.width=siz*sizblock+'px'
  document.getElementById('container').style.height=siz*sizblock+'px'
  const blok=[]
  const blokchild=[]

  for (var i = 0; i < siz; i++) {
    blok[i]=document.createElement('div')
    blok[i].class='imgfader1';
    blok[i].style.width=siz*sizblock+"px";
    blok[i].style.height=sizblock+"px";

    blok[i].style.display='flex';
    blok[i].style.justifyContent = 'space-evenly'
    document.getElementById('container').appendChild(blok[i]);
    for (var j = 0; j < siz; j++) {
      blokchild[j]=document.createElement('div')
      blokchild[j].class='imgfader1';
      blokchild[j].style.width=sizblock-4+"px";
      blokchild[j].style.height=sizblock-4+"px";
      blokchild[j].style.backgroundColor='#207614'

      blok[i].appendChild(blokchild[j]);
      if (tableOfGame[i][j]) {
        let imeg=document.createElement('img')
        imeg.style.width=sizblock-4+"px";
        imeg.style.height=sizblock-4+"px";
        imeg.src=tableOfGame[i][j].img
        blokchild[j].appendChild(imeg);
      }
    }
  }
}


///////////////////////////////

const personality=[]

const Gamesiz=14
const  Coefficient=60 //enemy appearance coefficient
const childsizblock=40
const left=37
const up=38
const right=39
const down=40

const numberOfWallsWolves=createParticipants(Gamesiz, Coefficient)

const locations=createLocations(numberOfWallsWolves+2, Gamesiz-1)//house and hare-2

const Locations=()=>{
  const TileValues=createTileValues(Gamesiz)
  const Players=createPlayers(locations, (numberOfWallsWolves/2)) //number of wolves==number of wolves

  const PlacePlayers=placePlayers(TileValues, Players) //place players by coordinates
  render(PlacePlayers, Gamesiz, childsizblock)

}
Locations()

document.onkeydown = blockTypeMove;

function blockTypeMove(e) {
    e = e || window.event;

    switch (e.keyCode) {
      case left:
      rabbitMove([-1,0])
      break;
      case up:
      rabbitMove([0,-1])
      break;
      case right:
      rabbitMove([+1,0])
      break;
      case down:
      rabbitMove([0,+1])
    }
  }


  const rabbitMove=(xy)=>{
    const futureLocation=[locations[0][0]+xy[0],locations[0][1]+xy[1]]
    if(isLocationsMatch(futureLocation, locations)){
      console.log(maladec);
    };
    locations[0][0]+=xy[0],locations[0][1]+=xy[1];

    Locations()
  }
