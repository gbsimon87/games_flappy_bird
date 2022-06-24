document.addEventListener('DOMContentLoaded' , () => {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  let birdLeft = 220
  let birdBottom = 100
  let gravity = 3
  let isGameOver = false
  // let gap = 700;
  let gap = getRandomInt(400, 700)
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function startGame() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + 'px'
      bird.style.left = birdLeft + 'px'
  }
  let gameTimerId = setInterval(startGame, 20)

  function control(e) {
      if (e.keyCode === 32) {
          jump()
      }
  }

  function jump() {
      if (birdBottom < 500) birdBottom += 50
      bird.style.bottom = birdBottom + 'px'
      console.log(birdBottom)
  }
  document.addEventListener('keyup', control)


  function generateObstacle() {
      let obstacleLeft = 500
      let randomHeight = Math.random() * 60
      let obstacleBottom = randomHeight
      const obstacle = document.createElement('div')
      const topObstacle = document.createElement('div')
      if (!isGameOver) {
          obstacle.classList.add('obstacle')
          topObstacle.classList.add('topObstacle')
      }
      gameDisplay.appendChild(obstacle)
      gameDisplay.appendChild(topObstacle)
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      obstacle.style.bottom = obstacleBottom + 'px'
      topObstacle.style.bottom = obstacleBottom + gap + 'px'

      function moveObstacle() {
          obstacleLeft -=2
          obstacle.style.left = obstacleLeft + 'px'
          topObstacle.style.left = obstacleLeft + 'px'
          console.log(birdBottom)

          if (obstacleLeft === -60) {
              clearInterval(timerId)
              gameDisplay.removeChild(obstacle)
              gameDisplay.removeChild(topObstacle)
          }
          if (
              obstacleLeft > 200 && obstacleLeft < 280  &&
              (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
              birdBottom === 0 
              ) {
              gameOver()
              clearInterval(timerId)
          }
      }
      let timerId = setInterval(moveObstacle, 20) 
      if (!isGameOver) setTimeout(generateObstacle, 3000)

  }
  generateObstacle()


  function gameOver() {
      clearInterval(gameTimerId)
      console.log('game over')
      isGameOver = true
      document.removeEventListener('keyup', control)
      ground.classList.add('ground')
  }


})