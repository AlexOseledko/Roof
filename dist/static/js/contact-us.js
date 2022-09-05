(function () {

    function selectInit(params) {
        var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
    }

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

        validateName(inputEl) {
            const fancyInput = inputEl.closest('.fancy-input');
            const erorEl = fancyInput.querySelector('.error-msg');
            let error = false;
            let errText = '';

            if (!inputEl.value) {
                error = true;
                errText = 'Enter your full name please';
            } else if (!inputEl.value.trim().includes(' ')) {
                error = true;
                errText = 'Enter valid full name: first name and last name'
            } else if (!this.reg.name.test(inputEl.value)) {
                error = true;
                errText = 'Enter valid full name, only latter and space'
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


    selectInit();
})();