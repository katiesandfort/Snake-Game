class Apple {
    constuctor(el) {
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'apple');
       
        //el is the #board element when we invoke Apple in main.js
        el.appendChild(this.node);

        //randomize the position of the apple node.
        const randomX = Math.floor(Math.random() * 14) * 50;
        const randomY = Math.floor(Math.random() * 14) * 50;

        this.node.style.left = randomX;
        this.node.style.right = randomY;
    }
}