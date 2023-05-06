class Apple {
    constructor(el) {
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'apple');
    
        // 'el' is the #board elem.
        el.appendChild(this.node);
    
        // Randomize the position of the apple node.
        const randomX = Math.floor(Math.random() * 14) * 50;
        const randomY = Math.floor(Math.random() * 14) * 50;
    
        this.node.style.left = randomX;
        this.node.style.top = randomY;
      }
}