score = document.querySelector(".scoreCont");
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

//GAME MUSIC:
setTimeout(() => {
    audio.play();
}, 1000);


//SETTING UP KEYBOARD KEYS:(jumping)
document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }


  //(Moving ahead):
  if (e.keyCode == 39) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 130 + "px"; 
  }


  //(Moving back):
  if (e.keyCode == 37) {
    dino = document.querySelector(".dino");
    dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};

//For collision conditions:
setInterval(() => {

  //calling classes from html:
  dino = document.querySelector(".dino");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  //calculating positions of dinosaur:
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  //calculating positions of obstacle:
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  //Calculating difference in positions of monster and dinosaur:
  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  //Conditions for GAME OVER:
  if (offsetX < 93 && offsetY < 52) {
    gameOver.style.visibility = "visible";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
        audio.pause();
    }, 1000)

    //CONDITIONS IF THE MONSTER AND DINOSAUR DON'T COLLIDE:
  } else if (offsetX < 144 && cross) {
    score++;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

//FUNCTION FOR UPDATING SCORE:
function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}