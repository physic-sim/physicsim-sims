export class NumInput {
    base;
    input;
    disabled;

    constructor(base, val, disabled = false, onClick = null) {
        this.base = base;
        this.disabled = disabled;
        // construct html framework
        let input = document.createElement('input');
        input.classList.add('num-input-input');
        if (disabled) {
            input.classList.add('input-disabled');
        }
        input.disabled = disabled;

        if (onClick !== null) {
            this.base.addEventListener('click', onClick);
        }

        this.input = input;
        this.input.type = 'number';
        this.input.required = true;
        this.input.value = Number(val);
        base.appendChild(this.input);
        
        // add auto scroll to top to prevent permanent scrolling on mobile
        this.input.addEventListener("blur", () => {
            setTimeout(() => {
                // force a repaint (sometimes needed on iOS)
                document.body.style.height = "101%";
                window.scrollTo(0, 0);
                requestAnimationFrame(() => {
                    document.body.style.height = "";
                });
            }, 250); // delay lets keyboard fully close
        });
    }

    get() {
        return Number(this.input.value);
    }

    set(val) {
        this.input.value = val;
    }

    toggleDisable() {
        this.disabled = !this.disabled;
        this.input.disabled = this.disabled;
        if (this.disabled) {
            this.input.classList.add('input-disabled');
        } else {
            this.input.classList.remove('input-disabled');
        }
    }
}
