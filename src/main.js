document.addEventListener('DOMContentLoaded', () => {
    //find the body
    const body = document.querySelector('body');
    //find the board
    const board = document.querySelector('#board');

    //create new head and apple element
    const head = new Head(board);
    new Apple(board);
    const modal = document.createElement('div');
  modal.setAttribute('id', 'game-start-modal');
  modal.innerText = 'Select a difficulty to start game:\n';

  const easyBtn = document.createElement('button');
  easyBtn.setAttribute('id', 'easyBtn');
  easyBtn.innerText = 'EASY';
  easyBtn.onclick = function() {
    head.SPEED = 500;
    modal.style.display = 'none';
  }
  
  const medBtn = document.createElement('button');
  medBtn.setAttribute('id', 'medBtn');
  medBtn.innerText = 'MEDIUM';
  medBtn.onclick = function() {
    head.SPEED = 250;
    modal.style.display = 'none';
  }

  const hardBtn = document.createElement('button');
  hardBtn.setAttribute('id', 'hardBtn');
  hardBtn.innerText = 'HARD';
  hardBtn.onclick = () => {
    head.SPEED = 100;
    modal.style.display = 'none';
  }

  const insaneBtn = document.createElement('button');
  insaneBtn.setAttribute('id', 'insaneBtn');
  insaneBtn.innerText = 'INSANE';
  insaneBtn.onclick = () => {
    head.SPEED = 40;
    modal.style.display = 'none';
  }

  modal.append(easyBtn, medBtn, hardBtn, insaneBtn);
  body.append(modal);

  // Listen to 'keydown' event occurring in <body>.
  body.addEventListener('keydown', (e) => {
    // Clear away modal if user wants to start game by pressing an arrow key
    // without clicking on a difficulty. Default speed is 250 (medium).
    modal.style.display = 'none';

    const currDir = head.currentDirection;

    switch (e.code) {
      case 'ArrowLeft':
        if (currDir !== 'right') head.currentDirection = 'left';
        break;
      case 'ArrowRight':
        if (currDir !== 'left') head.currentDirection = 'right';
        break;
      case 'ArrowUp':
        if (currDir !== 'down') head.currentDirection = 'up';
        break;
      case 'ArrowDown':
        if (currDir !== 'up') head.currentDirection = 'down';
        break;
    }
  })
});