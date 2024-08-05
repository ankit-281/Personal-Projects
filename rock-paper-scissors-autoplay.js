let score=JSON.parse(localStorage.getItem('score'))||{
  wins:0,
  losses:0,
  ties:0
};

updateScoreElem();

/*
if(!score) {
  score={
    wins:0,
    losses:0,
    ties:0
  };
*/

let isAutoPlaying=false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId=setInterval(()=>{
      playGame(pickCompMove());
    },1000);
    isAutoPlaying=true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying=false;
  } 
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
})

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r') {
    playGame('rock');
  }
  else if(event.key==='p') {
    playGame('paper');
  }
  else if(event.key==='s') {
    playGame('scissors');
  }
})

function playGame(playerMove) {
  const compMove=pickCompMove();

  let result='';
  if(playerMove==='scissors') {
    if(compMove==='rock')
      result='You lose.';
    else if(compMove==='paper')
      result='You win.';
    else
      result='Its a tie.';
  }

  else if(playerMove==='paper') {
    if(compMove==='rock')
      result='You win.';
    else if(compMove==='paper')
      result='Its a tie.';
    else
      result='You lose.';
  }

  else {
    if(compMove==='rock')
      result='Its a tie.';
    else if(compMove==='paper')
      result='You lose.';
    else
      result='You win.';
  }

  if(result==='You win.')
    score.wins++;
  else if(result==='You lose.')
    score.losses++;
  else
    score.ties++;

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElem();

  document.querySelector('.js-result').innerHTML=result;

  document.querySelector('.js-moves').innerHTML=`You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${compMove}-emoji.png" class="move-icon">
    Computer`;
}

function updateScoreElem() {
  document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickCompMove() {
  let compMove='';
  const randNum=Math.random();

  if(randNum<1/3)
    compMove='rock';
  else if(randNum<2/3) 
    compMove='paper';
  else
    compMove='scissors';
  
  return compMove;
}