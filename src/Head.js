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

        // Keep track of the # of body segments and save the instances of Body in an array.
        this.size = 0;
        this.bodies = [];

        // Keep records of the coordinates that the head node has travelled to. 
        this.headPositions = [];

        // Trigger the first invocation of move().
        // Remember to bind 'this' to move(), so that move() can point to (via 'this') the instance of Head that called it.
        // Otherwise, 'this' in move() will be the Windows object.
        setTimeout(this.move.bind(this), this.SPEED);
    }
    /* This method moves the head and body segments and simultaneously 
  checks for out-of-bounds and collision with the apple. */
  move() {
    // The move method is recursively called.
    // setTimeout's ID is saved in a constant so clearTimeout can later access and clear it.
    const moveTimeoutID = setTimeout(this.move.bind(this), this.SPEED);

    const head = this.node;
    const direction = this.currentDirection;
    
    // Retrieve the top & left coordinates of the head node as integers (not strings).
    let topPosition = Number(head.style.top.replace('px', ''))
    let leftPosition = Number(head.style.left.replace('px', ''))

    // Move the head node by reassigning its coordinates with new values
    switch (direction) {
      case 'right':
        head.style.left = `${leftPosition += 50}px`;
        break;
      case 'left':
        head.style.left = `${leftPosition -= 50}px`;
        break;
      case 'up':
        head.style.top = `${topPosition -= 50}px`;
        break;
      case 'down':
        head.style.top = `${topPosition += 50}px`;
        break;
    }

    const apple = document.querySelector('#apple');
    const applePos = {
      // Store X and Y coordinates as numeric values.
      top: Number(apple.style.top.replace('px', '')),
      left: Number(apple.style.left.replace('px', '')),
    };
    
    // Check whether head collides with apple.
    if (topPosition === applePos.top && leftPosition === applePos.left) {      
      apple.remove();

      let newApple = new Apple(this.board);

      // Check if new apple lands on the head.
      // Could use do-while loop to continously generate new apple until it doesn't land on the head.
      while (newApple.node.style.top === `${topPosition}px` && newApple.node.style.left === `${leftPosition}px`) {
        newApple.node.remove();
        newApple = new Apple(this.board);
      }

      // Generate new body segment.
      const body = new Body(this.board);
      this.bodies.push(body);
      this.size += 1;
    }
    
    // Record head positions but keep the array just 1 el longer than this.bodies.
    this.headPositions.unshift({top: topPosition, left: leftPosition});
    if (this.headPositions.length > this.size + 1) {
      this.headPositions.pop();
    }

    // Periodically move bodies if segments exist.
    if (this.size > 0) this.moveBodies(moveTimeoutID);

    // Check whether the head node is out-of-bounds at any interval.
    if (leftPosition >= 700 || topPosition >= 700 || leftPosition < 0 || topPosition < 0) {
      const userInput = confirm('Game Over! \nClick OK to restart game.');

      if (userInput) this.resetGame(moveTimeoutID);
      else clearTimeout(moveTimeoutID);
    }

    /********** End of move() method *****************/
  }
  moveBodies(timeoutID) {
    const head = this.node;

    // Assign each body segment's position with head's position records.
    // * See Comment 1 at bottom for reason for using for-loop instead of .forEach.
    for (let i = 0; i < this.bodies.length; i += 1) {
      const body = this.bodies[i];

      body.node.style.top = this.headPositions[i + 1].top;
      body.node.style.left = this.headPositions[i + 1].left;

      // Check if the head collides with any body segment.
      // * See Comment 2 at bottom for the reason for including i!==0/1/2 in the conditional.
      if (body.node.style.top === head.style.top && body.node.style.left === head.style.left
        && i !== 0 && i !== 1 && i !== 2) {
        const userInput = confirm('Game Over! \nClick OK to restart game.');

        if (userInput) {
          this.resetGame(timeoutID);
        } else {
          clearTimeout(timeoutID);
          return;
        }
      }
    }  
  }

  resetGame(timeoutID) {
    clearTimeout(timeoutID);

    // Re-display the game start modal.
    const modal = document.getElementById('game-start-modal');
    modal.style.display = 'flex';
    
    // Remove old apple and body segments.
    const oldApple = document.getElementById('apple');
    oldApple.remove();
    const oldBodySegments = document.querySelectorAll('.body');
    oldBodySegments.forEach(oldBodySegment => oldBodySegment.remove());

    // Reset these values to defaut and re-position head.
    this.currentDirection = null;
    this.SPEED = 250;
    this.node.style.top = 0;
    this.node.style.left = 0
    this.size = 0;
    this.bodies = [];
    this.headPositions = [];

    // Generate a new apple.
    new Apple(this.board);
    
    // Kickstart head's movements again.
    this.move();
  }
}