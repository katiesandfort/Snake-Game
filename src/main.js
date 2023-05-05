document.addEventListener('DOMContentLoaded', () => {
    //find the body
    const body = document.querySelector('body');
    //find the board
    const board = document.querySelector('#board');

    //create new head and apple element
    const head = new Head(board);
    new Apple(board);

    

    //
});