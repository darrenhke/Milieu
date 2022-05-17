//Rules
// 4 Players
// 52 Cards
// A > K values can determine from A - 1 K 13
// Suites Diamonds > Clubs > Hearts > Spades
// Cards on drawn base on the first player in players

// Requirements from product
// The player who draws the highest card will win the round and score a point (Must have)
// Scoreboard that displays the players ranked in order of the total number of points they have scored (Must have)
// Each round to tally the scores of all players in a scoreboard (Would be nice to have)

const players = [
    {
      name: "Amanda",
      score: 0.0
    },
    {
      name: "Trevor",
      score: 0.0
    },
    {
      name: "Li Ting",
      score: 0.0
  
    },
    {
      name: "Sam",
      score: 0.0
    }
  ]

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

async function createAndShuffleCards() {

    let valueSpades  = 0.8
    let valueHearts = 0.6
    let valueClubs  = 0.4
    let valueDiamonds  = 0.2

    //All cards in the array
    let cardsSpades = [...Array(14).keys()].slice(1)
    let cardsHearts = [...Array(14).keys()].slice(1)
    let cardsClubs = [...Array(14).keys()].slice(1)
    let cardsDiamonds = [...Array(14).keys()].slice(1)

    //Appending suites value to cards
    cardsSpades = cardsSpades.map(value => {
        return value + valueSpades
    })
    cardsHearts = cardsHearts.map(value => {
        return value + valueHearts
    })
    cardsClubs = cardsClubs.map(value => {
        return value + valueClubs
    })
    cardsDiamonds = cardsDiamonds.map(value => {
        return value + valueDiamonds
    })

    let allSuiteCards = cardsSpades.concat(cardsHearts,cardsClubs,cardsDiamonds)

    return shuffle(allSuiteCards)
}

async function sortPlayers(){
    const sortedPlayers = players.sort((a,b) => {
        return parseFloat(b.score) - parseFloat(a.score)
      })
      // Output table
      console.log("---------------------------------------------------------------")
      console.log('Rank | Name | Score')
      sortedPlayers.forEach((player,index)=>{
        console.log(`${index + 1} | ${player.name} | ${player.score.toFixed(1)}` )
      })    

}

// //Run each iterations 
// // 0. While there are cards in the deck (13)
//   // 1. Draw 4 cards from array random cards index
//   // 2. Add score to players.score
//   // 3. Show name of player with the highest score
// // List all players by sorting by player score descending

createAndShuffleCards()
.then((shuffledCards) =>{
    let roundCounter = 1
    while (shuffledCards.length != 0){
        let valueCardsPerRound = []
          players.map(user => {
              valueCardsPerRound.push(shuffledCards[0]) 
              //Alternative Scoring System comment line 117 and uncomment line 110
              //user.score += parseFloat(shuffledCards[0])
              shuffledCards.shift()
          })
      
         const playerHighestRound =  players[valueCardsPerRound.indexOf(Math.max.apply(Math,valueCardsPerRound))].name
         players[valueCardsPerRound.indexOf(Math.max.apply(Math,valueCardsPerRound))].score += 1.0
         //Alternative Scoring System comment line 117 and uncomment line line 110
         const scoreHighestRound = Math.max.apply(Math,valueCardsPerRound)
         console.log(`Round ${roundCounter}: ${playerHighestRound} has the highest score of ${scoreHighestRound}`) 
         roundCounter++
      }
      
}).then(() =>{
    sortPlayers()
})







