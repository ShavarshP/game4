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

      return true
    }
  }
  return false
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
const rabbitIsCanMove=(siz, loc, i)=>{

    if (loc[i]==siz) {
      loc[i]=0
    }
    if (loc[i]==-1) {
      loc[i]=siz-1
    }
    if (i!=0) {
      rabbitIsCanMove(siz, loc, i-1)
    }
    return loc
}
/////
const wolvesMove=(rabbitLocation, locations, numberOfWolves)=>{
  for (let i = locations.length-1; i > locations.length-numberOfWolves-1; i--) {
    let futureLocation=JSON.parse(JSON.stringify(locations[i]))
    if (Math.abs(locations[i][0]-rabbitLocation[0])>Math.abs(locations[i][1]-rabbitLocation[1])) {

      futureLocation[0]=whereToMove(locations[i][0]-rabbitLocation[0], locations[i][0])
      if(isLocationsMatch(futureLocation, locations)){
        console.log(futureLocation.toString()==rabbitLocation.toString());
      }else {
        locations[i]=futureLocation

      }
    }else {

      futureLocation[1]=whereToMove(locations[i][1]-rabbitLocation[1], locations[i][1])
      if(isLocationsMatch(futureLocation, locations)){
        console.log(futureLocation.toString()==rabbitLocation.toString());
      }else {
        locations[i]=futureLocation

      }
    }
  }
  return locations
}

function whereToMove(answer, loc) {


  if (answer>0) {

    return loc-=1
  }else {
    loc+=1
  }
  return loc
}

////////////////////////////////
const render=(tableOfGame, siz, sizblock)=>{
  document.getElementById('container').innerHTML = ""
  document.getElementById('container').style.width=siz*sizblock+'px'
  document.getElementById('container').style.height=siz*sizblock+'px'
  const blok=[]
  const blokchild=[]

  for (let i = 0; i < siz; i++) {
    blok[i]=document.createElement('div')
    blok[i].class='imgfader1';
    blok[i].style.width=siz*sizblock+"px";
    blok[i].style.height=sizblock+"px";

    blok[i].style.display='flex';
    blok[i].style.justifyContent = 'space-evenly'
    document.getElementById('container').appendChild(blok[i]);
    for (let j = 0; j < siz; j++) {
      blokchild[j]=document.createElement('div')
      blokchild[j].class='imgfader1';
      blokchild[j].style.width=sizblock-4+"px";
      blokchild[j].style.height=sizblock-4+"px";
      blokchild[j].style.backgroundColor='#207614'

      blok[i].appendChild(blokchild[j]);
      if (tableOfGame[i][j]) {
        let img=document.createElement('img')
        img.style.width=sizblock-4+"px";
        img.style.height=sizblock-4+"px";
        img.src=tableOfGame[i][j].img
        blokchild[j].appendChild(img);
      }
    }
  }
}
const ending=(siz,sizblock,url)=>{
  document.getElementById('container').innerHTML = ""
  let img=document.createElement('img')
  img.style.width=siz*sizblock+"px";
  img.style.height=siz*sizblock+"px";
  img.src=url
  document.getElementById('container').appendChild(img);
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
let locations=createLocations(numberOfWallsWolves+2, Gamesiz-1)//house and hare-2

const homeLocation=locations[1]

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
    let futureLocation=[locations[0][0]+xy[0],locations[0][1]+xy[1]]
    futureLocation=rabbitIsCanMove(Gamesiz, futureLocation, futureLocation.length)
    if(isLocationsMatch(futureLocation, locations)){
      if(futureLocation.toString()==homeLocation.toString() || xy.toString()==homeLocation.toString()){
        console.log('maladec');
        ending(Gamesiz, childsizblock, 'https://image.freepik.com/free-vector/easter-day-kawaii-cute-smiling-rabbit-with-ballon-sun-clouds-happy-wood_24908-17417.jpg')
        document.onkeydown=null
        return
      }
    }else {
      locations[0]=futureLocation;
      locations=wolvesMove(locations[0], locations, (numberOfWallsWolves/2)) //number of wolves==number of wolves)
    };
    Locations()
  }
