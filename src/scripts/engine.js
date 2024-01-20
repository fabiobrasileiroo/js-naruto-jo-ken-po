const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type")
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card")
  },
  playerSides : {
  player1: "player-cards",
  player1Box: document.querySelector("#player-cards"),
  computer: "computer-cards",
  computerBox: document.querySelector("#computer-cards")
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
}
const pathImages = "./src/assets/icons/"
const cardData = [ 
  {
    id:0, 
    name: "Naruto mode full",
    type:  "Paper",
    img: `${pathImages}narutoStorm.jpeg`,
    winOf: [1],
    LoseOf: [2],
  },
  {
    id:1, 
    name: "Sasuke",
    type:  "Rock",
    img: `${pathImages}sasuke.jpeg`,
    winOf: [2],
    LoseOf: [0],
  },
  {
    id:2, 
    name: "Minato",
    type:  "Scissors",
    img: `${pathImages}Minato.jpeg`,
    winOf: [0],
    LoseOf: [1],
  }
]

const players = {
  player1: "player-cards",
}

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() *cardData.length)
  return cardData[randomIndex].id
}

async function createCardImage(IdCard, fieldSide) {
  const cardImage = document.createElement("img")
  cardImage.setAttribute("height", "100px")
  cardImage.setAttribute("src", "src/assets/icons/card-back-naruto-black.png")
  cardImage.setAttribute("data-id", IdCard)
  cardImage.classList.add("card")

  if(fieldSide === state.playerSides.player1) {
    cardImage.addEventListener("click", ()=> {
      setCardsField(cardImage.getAttribute("data-id"))
    })
    cardImage.addEventListener("mouseover", ()=> {
      drawSelectCard(IdCard)
    })
  }

  return cardImage
}

async function setCardsField(cardId) {

   await removeAllCadsImages()

  let computerCardId = await getRandomCardId() 

  state.fieldCards.player.style.display = "block"
  state.fieldCards.computer.style.display = "block"

  state.fieldCards.player.src = cardData[cardId].img
  state.fieldCards.computer.src = cardData[computerCardId].img

  // let duelResults = await checkDuelResults(cardId, computerCadId)

  // await updateScore()
  // await drawButton(duelResults)

}
async function removeAllCadsImages() {
  let { computerBox, player1Box} = state.playerSides
  let imgElements = computerBox.querySelectorAll("img")
  imgElements.forEach((img)=> img.remove())

  imgElements = player1Box.querySelectorAll("img")
  imgElements.forEach((img)=> img.remove())
}
async function drawSelectCard(index) {
  const novaLargura = 200; // Substitua pelo valor desejado em pixels
  const novaAltura = 200; // Substitua pelo valor desejado em pixels

  state.cardSprites.avatar.src = cardData[index].img
   state.cardSprites.avatar.style.width = novaLargura + "px";
  state.cardSprites.avatar.style.height = novaAltura + "px";

  state.cardSprites.name.innerText = cardData[index].name
  state.cardSprites.type.innerText = "Attibute: " + cardData[index].type
}

async function drawCards(cardNumbers, fieldSide) {
  for(let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId()
    const cardImage = await createCardImage(randomIdCard, fieldSide)
    console.log(cardImage)
    document.getElementById(fieldSide).appendChild(cardImage)
  }
}

function  init() {
  drawCards(5, state.playerSides.player1)
  drawCards(5, state.playerSides.computer)
}

init()