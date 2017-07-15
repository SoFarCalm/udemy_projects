var p1btn = document.querySelector("#p1");
var p2btn = document.getElementById("p2");
var p1display = document.querySelector("#p1display");
var p2display = document.getElementById('p2display');
var resetbtn = document.getElementById('reset')
var numInput = document.querySelector('input');
var winScoreDisplay = document.getElementById('winScore');
var p1score = 0;
var p2score = 0;
var gameOver = false;
var winningScore = 5;

p1btn.addEventListener("click", function(){
  if(!gameOver){
    p1score ++;
    if (p1score === winningScore){
      p1display.classList.add("winner");
      gameOver = true;
  }
  p1display.textContent = p1score;
  }
});

p2btn.addEventListener("click", function(){
  if(!gameOver){
    p2score ++
    if (p2score === winningScore) {
      p2display.classList.add("winner");
      gameOver = true;
    }
  p2display.textContent = p2score;
  }
});

resetbtn.addEventListener('click', function(){
  reset();
});

function reset(){
  p1score = 0;
  p2score = 0;
  p1display.textContent = 0;
  p2display.textContent = 0;
  p1display.classList.remove("winner");
  p2display.classList.remove("winner");
  gameOver = false;
}

numInput.addEventListener('change', function(){
  winScoreDisplay.textContent = this.value;
  winningScore = Number(this.value);
  reset();
});
