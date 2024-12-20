export class Button {

    container;
    button;
    callback;
  
    constructor(container, callback, text) {
        this.container = container;
        this.callback = callback;
  
        // construct btn
        this.button = document.createElement('button');
        this.button.innerHTML = text;
        this.button.classList.add('btn-alt')
  
        // add click functionality
        this.button.addEventListener('click', this.callback);
        
        this.container.append(this.button);
    }

}