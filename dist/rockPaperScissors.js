//initialization
function init() {
  var draw = 0;
  var lose = 0;
  var win = 0;
  let target = document.getElementById("target");
  let r = document.createTextNode(
    "win: " + win + " lose: " + lose + " draw: " + draw
  );
  target.appendChild(r);
  let choose = document.getElementById("choose");
  let chooseInit = document.createTextNode("...");
  choose.appendChild(chooseInit);
  game(draw, lose, win, target, r, choose, chooseInit);
}

//Game logic
function game(draw, lose, win, target, r, choose, chooseInit) {
  let rock = document.getElementById("1");
  let paper = document.getElementById("2");
  let scissors = document.getElementById("3");

  rock.addEventListener("click", () => {
    let numPC = pcChoose(1, 3);
    switch (numPC) {
      case "Rock":
        draw += 1;
        animationDraw(rock, paper, scissors);
        break;
      case "Paper":
        lose += 1;
        animationWinLose(paper, rock, scissors);
        break;
      case "Scissors":
        win += 1;
        animationWinLose(rock, scissors, paper);
        break;
    }
    newLayout(draw, lose, win, target, r, choose, chooseInit, numPC);
  });

  paper.addEventListener("click", () => {
    let numPC = pcChoose(1, 3);
    switch (numPC) {
      case "Rock":
        win += 1;
        animationWinLose(paper, rock, scissors);
        break;
      case "Paper":
        draw += 1;
        animationDraw(paper, rock, scissors);
        break;
      case "Scissors":
        lose += 1;
        animationWinLose(scissors, paper, rock);
        break;
    }
    newLayout(draw, lose, win, target, r, choose, chooseInit, numPC);
  });

  scissors.addEventListener("click", () => {
    let numPC = pcChoose(1, 3);
    switch (numPC) {
      case "Rock":
        lose += 1;
        animationWinLose(rock, scissors, paper);
        break;
      case "Paper":
        win += 1;
        animationWinLose(scissors, paper, rock);
        break;
      case "Scissors":
        draw += 1;
        animationDraw(scissors, paper, rock);
        break;
    }
    newLayout(draw, lose, win, target, r, choose, chooseInit, numPC);
  });

  let reset = document.getElementById("4");
  reset.addEventListener("click", () => {
    numPC = "...";
    win = 0;
    lose = 0;
    draw = 0;
    newLayout(draw, lose, win, target, r, choose, chooseInit, numPC);
  });
}

//Change layout
function newLayout(draw, lose, win, target, r, choose, chooseInit, numPC) {
  chooseInit = document.createTextNode(numPC);
  animateCSS(choose, "heartBeat");
  choose.innerHTML = "";
  choose.appendChild(chooseInit);
  r = document.createTextNode(
    "win: " + win + " lose: " + lose + " draw: " + draw
  );
  target.innerHTML = "";
  target.appendChild(r);
}

//animation
function animateCSS(element, animation, prefix = "animate__") {
  return new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}

function animationDraw(item, other1, other2) {
  animateCSS(item, "swing");
  item.classList.add("unclick");
  other1.classList.add("draw");
  other2.classList.add("draw");
  setTimeout(() => {
    other1.classList.remove("draw");
    other2.classList.remove("draw");
    item.classList.remove("unclick");
  }, 2000);
}

function animationWinLose(winner, loser, other) {
  animateCSS(winner, "rubberBand");
  animateCSS(loser, "hinge");
  loser.classList.add("unclick");
  winner.classList.add("unclick");
  other.classList.add("draw");
  setTimeout(() => {
    other.classList.remove("draw");
    winner.classList.remove("unclick");
    loser.classList.remove("unclick");
  }, 2000);
}

//PC Choose
function pcChoose(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min + 1)) + min;
  switch (random) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    default:
      return "Scissors";
  }
}
