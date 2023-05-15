document.addEventListener('DOMContentLoaded', () => {
    //find the body
    const body = document.querySelector('body');
    //find the board
    const board = document.querySelector('#board');

    //create new head and apple element
    const head = new Head(board);
    new Apple(board);
  

  
  body.addEventListener('keydown', (e) => {
    //move head based on direction from arrow keys, and ensure it can't go backwards
    if (e.code === 'ArrowLeft' && head.currentDirection !== 'right') {
      head.currentDirection = 'left';
    }
    if (e.code === 'ArrowRight' && head.currentDirection !== 'left') {
      head.currentDirection = 'right';
    }
    if (e.code === 'ArrowDown' && head.currentDirection !== 'up') {
      head.currentDirection = 'down';
    }
    if (e.code === 'ArrowUp' && head.currentDirection !== 'down') {
      head.currentDirection = 'up';
    }
  })
});