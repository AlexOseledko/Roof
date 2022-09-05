(function () {
    class FormWizard {
        constructor(options) {
            this.form = document.querySelector(options.form);
            this.reg = {
                email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                name: /^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/,
            };
            this.init();
        }

        openThankYou() {
            const doNotSell = document.querySelector('.do-not-sell');
            const thankYou = document.querySelector('.thank-you');

            thankYou.classList.add('show');
            doNotSell.classList.remove('show');
        }

        openGoToHomeWindow() {
            const zipModal = document.querySelector('.quiz.modal');
            const toHome = document.querySelector('.to-home-page');

            toHome.classList.add('show');
            zipModal.classList.remove('show');
        }

        validate(stepEl) {
            const inputs = stepEl.querySelectorAll('input');
            let error = false;

            inputs.forEach(inputEl => {
                if (inputEl.name === 'tel' && this.validateTel(inputEl)) {
                    error = true;
                } if (inputEl.name === 'name' && this.validateName(inputEl)) {
                    error = true;
                } else if (inputEl.name === 'email' && this.validateEmail(inputEl)) {
                    error = true;
                }
            });

            return !error;
        }

        validateEmail(inputEl) {
            const fancyInput = inputEl.closest('.fancy-input');
            const erorEl = fancyInput.querySelector('.error-msg');
            let error = false;
            let errText = '';

            if (!inputEl.value) {
                error = true;
                errText = 'Enter your email please';
            } else if (!this.reg.email.test(inputEl.value)) {
                error = true;
                errText = 'Enter valid email please'
            }

            if (error) fancyInput.classList.add('error');
            else fancyInput.classList.remove('error');

            erorEl.innerText = errText;

            inputEl.addEventListener('input', e => {
                fancyInput.classList.remove('error');
                erorEl.innerText = '';
            })

            return error;
        }

        init() {
            this.form.addEventListener('submit', e => {
                e.preventDefault();
                if (this.validate(this.form)) {
                    this.openThankYou();
                }
            })
        }
    }


    const formModal = new FormWizard({
        form: '#step-form',
    });


})();