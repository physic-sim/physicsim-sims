export class Button {
    container;
    wrapper;
    button;
    tooltip;
    callback;

    constructor(container, callback, icn, tooltip=null) {
        this.container = container;
        this.callback = callback;

        // construct wrapper
        this.wrapper = document.createElement("div")
        this.wrapper.classList.add("btn-wrapper")

        // construct btn
        this.button = document.createElement('button');
        const icon = document.createElement('span')
        icon.classList.add('material-symbols-outlined')
        icon.innerHTML = icn;
        this.button.append(icon)
        this.button.classList.add('btn-alt');
        this.wrapper.append(this.button)

        // add click functionality
        this.button.addEventListener('click', this.callback);

        // construct tooltip
        if (tooltip) {
            this.tooltip = document.createElement("span");
            this.tooltip.classList.add("btn-tooltip")
            this.tooltip.innerText = tooltip;
            this.wrapper.append(this.tooltip);
        }

        this.container.append(this.wrapper);
    }
}
