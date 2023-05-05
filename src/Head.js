class Head {
    constructor(el) {
        this.board = document.querySelector('#board');

        //create the head on the board
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'head');
        el.appendChild(this.node);

        //set direction to null as default so snake doesn't start moving until key press
        this.currentDirection = null;
        this.SPEED = 250;

        //set starting position of head to top-left corner of the board
        this.node.style.top = 0;
        this.node.style.left = 0;

        
    }
}