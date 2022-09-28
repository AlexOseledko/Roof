(function () {
  (function () {
    var throttle = function (type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function () {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(function () {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };
    throttle("resize", "optimizedResize");
  })();

  (function init100vh() {
    function setHeight() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setHeight();
    window.addEventListener('resize', setHeight);
  })();


  const navHeandler = {
    navElem: document.querySelector('.nav'),
    scrolledClass: "scrolled",
    stickMenuToggle() {
      if (scrollY >= 600) this.navElem.classList.add(this.scrolledClass)
      else this.navElem.classList.remove(this.scrolledClass)
      window.addEventListener('scroll', e => {
        if (scrollY >= 600) this.navElem.classList.add(this.scrolledClass)
        else this.navElem.classList.remove(this.scrolledClass)
      })
    },
    init() {
      this.stickMenuToggle();
    }
  }


  function smoothScroll() {
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }


  ;(function selectInit() {
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
      var x, y, i, xl, yl, arrNo = [], f;
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

    var selects = document.getElementsByClassName('fancy-select');
    for (let i = 0; i < selects.length; i++) {
      const fancySelect = selects[i];
      const selectElem = fancySelect.querySelector('select');
      const selectSelected = fancySelect.querySelector('.select-selected');
      const originSelectSelected = selectSelected.innerText;

      function addOpenClass() {
        if (originSelectSelected !== selectSelected.innerText) {
          fancySelect.classList.add('open');
        }
      }

      selectElem.addEventListener('selectState', (e) => {
        if (!selectElem.classList.contains(e.detail.forElemWithClass)) return;
        const optionsArr = Array.from(selectElem.options);
        optionsArr.forEach((optionEl, i) => {
          if (optionEl.value === e.detail.state) {
            selectSelected.innerHTML = optionEl.innerText;
            selectElem.selectedIndex = i;
           addOpenClass();
          }
        })
      });

      fancySelect.addEventListener('click', addOpenClass)
    }
  })();


  class FormWizard {
    constructor(options) {
      this.form = document.querySelector(options.form);
      this.steps = this.form.querySelectorAll(options.steps);
      this.progress = document.querySelector(options.progress);
      this.applyBtnSelector = options.nextBtn;

      this.reg = {
        email: /^(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
        name: /^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)$/,
      };
      this.step = 0;
      this.stepsAmount = this.steps.length;
      this.init();
    }

    closeModalWindow() {
      const mainContent = document.querySelector('.main-content');
      const zipModal = document.querySelector('.quiz.modal');
      const shureModal = document.querySelector('.are-you-shure');
      const toHome = document.querySelector('.to-home-page');

      const errMsg = this.form.querySelectorAll('.error-msg');
      const aplayBtns = this.form.querySelectorAll(this.applyBtnSelector);
      const yesNoBtns = this.form.querySelectorAll('.yes-btn, .no-btn');
      const dataInfo = this.form.querySelectorAll('.data-info');
      const fancyInput = this.form.querySelectorAll('.fancy-input');

      mainContent.classList.remove('overflow');
      zipModal.classList.remove('show');
      shureModal.classList.remove('show');
      toHome.classList.remove('show');

      this.form.reset();
      this.toStep(0);

      aplayBtns.forEach(el => {
        el.classList.remove('hide');
        if (el.dataset.state === 'disable') {
          el.setAttribute('disabled', 'disabled');
        }
      })
      yesNoBtns.forEach(el => el.classList.add('hide'));
      dataInfo.forEach(el => el.innerText = '');
      errMsg.forEach(el => el.innerText = '');
      fancyInput.forEach(el => el.classList.remove('error'))
    }
    toggleConfirmExitWindow() {
      const zipModal = document.querySelector('.quiz.modal');
      const shureModal = document.querySelector('.are-you-shure');

      shureModal.classList.toggle('show');
      zipModal.classList.toggle('show');
    }
    openGoToHomeWindow() {
      const zipModal = document.querySelector('.quiz.modal');
      const toHome = document.querySelector('.to-home-page');

      toHome.classList.add('show');
      zipModal.classList.remove('show');
    }
    toStep(n) {
      this.step = n;
      this.steps.forEach((stepEl, i) => {
        if (i < this.step) {
          stepEl.classList.remove('active', 'next');
          stepEl.classList.add('prev');
        } else if (i === this.step) {
          stepEl.classList.remove('prev', 'next');
          stepEl.classList.add('active');
        } else {
          stepEl.classList.remove('prev', 'active');
          stepEl.classList.add('next');
        }
      })

      this.updateHeroMsg(this.steps[this.step]);
      this.progressUpdate();
    }
    progressUpdate() {
      this.progress.style.width = (100 / this.stepsAmount) * (this.step + 1) + '%';
    }
    nextStep() {
      this.step++;
      this.toStep(this.step);
    }
    validate(stepEl) {
      const inputs = stepEl.querySelectorAll('input, select');
      let error = false;

      inputs.forEach(inputEl => {
        if (inputEl.name === 'phone' && this.validateTel(inputEl)) {
          error = true;
        } else if (inputEl.name === 'name' && this.validateName(inputEl)) {
          error = true;
        } else if ((inputEl.name === 'address' || inputEl.name === 'city' || inputEl.name === 'state') && this.validateAddress(inputEl)) {
          error = true;
        } else if (inputEl.name === 'email' && this.validateEmail(inputEl)) {
          error = true;
        } else if (inputEl.nodeName === 'SELECT' && this.validateSelect(inputEl)) {
          error = true;
        } else if (inputEl.name === 'leadid_tcpa_disclosure' && this.validateTCPA(inputEl)) {
          error = true;
        }
      });

      return !error;
    } 
    validateTCPA(inputEl) {
      const fancyInput = inputEl.closest('.add-info');
      const erorEl = fancyInput.querySelector('.error-msg');
      let error = false;
      let errText = '';

      if (!inputEl.checked) {
        error = true;
        errText = 'This is a required checkbox';
      }

      if (error) fancyInput.classList.add('error');
      else fancyInput.classList.remove('error');

      erorEl.innerText = errText;

      inputEl.addEventListener('change', e => {
        fancyInput.classList.remove('error');
        erorEl.innerText = '';
      })

      return error;
    }
    validateSelect(inputEl) {
      const fancySelect = inputEl.closest('.fancy-select');
      const customSelect = inputEl.closest('.custom-select');
      const erorEl = fancySelect.querySelector('.error-msg');
      let error = false;
      let errText = '';


      if (inputEl.value === 0 || inputEl.value === '0') {
        error = true;
        errText = 'Please select one value';
      }

      if (error) fancySelect.classList.add('error');
      else fancySelect.classList.remove('error');

      erorEl.innerText = errText;
      customSelect.addEventListener('click', e => {
        fancySelect.classList.remove('error');
        erorEl.innerText = '';
      })

      return error;
    }
    validateEmail(inputEl) {
      const fancyInput = inputEl.closest('.fancy-input');
      const erorEl = fancyInput.querySelector('.error-msg');
      let error = false;
      let errText = '';

      if (!inputEl.value) {
        error = true;
        errText = 'Enter your email please';
      } else if (!this.reg.email.test(inputEl.value.trim())) {
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
    validateAddress(inputEl) {
      const fancyInput = inputEl.closest('.fancy-input') || inputEl.closest('.fancy-select');
      const erorEl = fancyInput.querySelector('.error-msg');
      let error = false;
      let errText = '';

      if (!inputEl.value) {
        error = true;
        errText = 'This is a required field';
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
      const value = inputEl.value.trim();
      let error = false;
      let errText = '';

      if (!value) {
        error = true;
        errText = 'Enter your full name please';
      } else if (!value.trim().includes(' ')) {
        error = true;
        errText = 'Enter valid full name: first name and last name'
      } else if (!this.reg.name.test(value.trim())) {
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
    validateTel(inputEl) {
      const fancyInput = inputEl.closest('.fancy-input');
      const erorEl = fancyInput.querySelector('.error-msg');
      const value = inputEl.value.trim();
      let error = false;
      let errText = '';


      if (!value) {
        error = true;
        errText = 'Enter your phone number please';
      } else if (value.length < 14) {
        error = true;
        errText = 'Enter valid phone number please'
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
    updateConfirmPhone(tel) {
      if (this.form.querySelector('.phone-confirm')) {
        const phoneConfirmEl = this.form.querySelector('.phone-confirm');
        phoneConfirmEl.innerText = tel;
      }
    }
    
    initModernize() {
      const task = document.querySelector('input[name="service_type"]:checked').value;
      const material = document.querySelector('input[name="roof_material"]:checked').value;
      const materialInput = document.querySelector('input.modernize_service');
      const taskInput = document.querySelector('input.modernize_RoofingPlan');

      const materialIdObj = {
        'Asphalt Shingle': 'ROOFING_ASPHALT',
        'Cedar Shake': 'ROOFING_CEDAR_SHAKE',
        'Natural Slate': 'ROOFING_NATURAL_SLATE',
        'Tar Torch Down': 'ROOFING_TAR_TORCHDOWN',
        'Aluminum': 'ROOFING_METAL',
        'Tile': 'ROOFING_TILE',
      }

      const taskIdObj = {
        'Replace': 'Completely replace roof',
        'Install': 'Install roof on new construction',
        'Repair': 'Repair existing roof'
      }

      if (taskInput && task && taskIdObj[task])  taskInput.value = taskIdObj[task];
      else taskInput?.remove();

      if (materialInput && material && materialIdObj[material])  materialInput.value = materialIdObj[material];
      else materialInput?.remove();
    }


    initNetworx() {
      const input = document.querySelector('input.networx_task_id');
      const task = document.querySelector('input[name="service_type"]:checked').value;
      const material = document.querySelector('input[name="roof_material"]:checked').value;
      const taskIdObj = {
        'Replace': {
          'Asphalt Shingle': 325,
          'Cedar Shake': 329,
          'Natural Slate': 327,
          'Tar Torch Down': 335,
          'Aluminum': 331,
          'Tile': 333,
        },
        'Install': {
          'Asphalt Shingle': 313,
          'Cedar Shake': 317,
          'Natural Slate': 315,
          'Tar Torch Down': 323,
          'Aluminum': 319,
          'Tile': 321,
        },
        'Repair': {
          'Asphalt Shingle': 301,
          'Cedar Shake': 305,
          'Natural Slate': 303,
          'Tar Torch Down': 311,
          'Aluminum': 307,
          'Tile': 309,
        },
        'Shingle over existing roof': {
          'Asphalt Shingle': 301,
        }
      }

      if (task && material && task === 'Shingle over existing roof' && !taskIdObj[task][material]) {
        input.value = taskIdObj[task]['Asphalt Shingle'];
      } else if (task && material && taskIdObj[task] && taskIdObj[task][material]) {
        input.value = taskIdObj[task][material];
      }
    }
    updateHeroMsg(elem) {
      const heroMsgElems = document.querySelector('#hero-msg');
      if (elem.dataset.info) {
        heroMsgElems.innerText = elem.dataset.info;
      } else {
        heroMsgElems.innerText = '';
      }
    }
    submitForm(form) {
      const preloader = document.querySelector('.submit-preloader');
      preloader.classList.add('active');

      this.initNetworx();
      this.initModernize();

      const formInputs = form.querySelectorAll('input, select, button');
      const formData = new FormData(form);
      const data = {
        stream_key: localStorage.getItem('stream_key'),
        order: {}
      }


      for (let elem of formData.entries()) {
        const key = elem[0];
        const value = elem[1];
        const hiOrderParams = ['name', 'phone', 'email', 'zip', 'country', 'state', 'city', 'address'];

        if (key === 'phone') {
          data[key] = value.replace(/\D+/g, "");
        } else if (key === 'email') {
          data[key] = value.toLowerCase();
        } else if (hiOrderParams.includes(key)) {
          data[key] = value;
        } else {
          data.order[key] = value;
        }
      }

      // Display the key/value pairs
      // console.log(JSON.stringify(data));
      // return;

      fetch('https://hm.afflifter.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        location.href = './success.html' + location.search;
        this.enableFormInputs(formInputs);
        preloader.classList.remove('active');
        this.closeModalWindow();
      })
    }

    enableFormInputs(formInputs) {
      formInputs.forEach(element => {
        element.removeAttribute('disabled');
      });
    }
    disableFormInputs(formInputs) {
      formInputs.forEach(element => {
        element.setAttribute('disabled', true);
      });
    }
    init() {
      const changePhoneEl = this.form.querySelector('.change-phone');
      const closeBtn = document.querySelector('.close-modal-btn');
      const exitQuiz = document.querySelector('.are-you-shure .exit');
      const goHome = document.querySelector('.to-home-page .exit');
      const continueQuiz = document.querySelector('.are-you-shure .continue');

      function logKey(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
        }
      }

      this.progressUpdate();

      this.steps[this.step].classList.remove('prev', 'next');
      this.steps[this.step].classList.add('active');

      this.updateHeroMsg(this.steps[this.step]);

      this.steps.forEach(stepEl => {
        const applyBtn = stepEl.querySelector(this.applyBtnSelector);
        const yesBtn = stepEl.querySelector('.yes-btn');
        const noBtn = stepEl.querySelector('.no-btn');
        const inputs = stepEl.querySelectorAll('input');
        const dataInfo = stepEl.querySelector('.data-info');

        inputs.forEach(inputEl => {
          if (inputEl.type === 'radio') {
            inputEl.addEventListener('change', e => {
              if (inputEl.checked) applyBtn.removeAttribute('disabled')
              else applyBtn.setAttribute('disabled');

              if (inputEl.dataset.info) {
                dataInfo.innerText = inputEl.dataset.info;
                yesBtn.classList.remove('hide');
                noBtn.classList.remove('hide');
                applyBtn.classList.add('hide');
              } else {
                dataInfo.innerText = '';
                yesBtn.classList.add('hide');
                noBtn.classList.add('hide');
                applyBtn.classList.remove('hide');
              }
            })
          } else if (inputEl.name === 'phone') {
            inputEl.addEventListener('input', (e) => {
              var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
              e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
              this.updateConfirmPhone(e.target.value);
            });
          }
          inputEl.addEventListener('keydown', logKey);
        });

        try {
          noBtn.addEventListener('click', e => {
            e.preventDefault();
            this.openGoToHomeWindow();
          })
          noBtn.addEventListener('keydown', logKey);
        } catch (er) { }

        try {
          yesBtn.addEventListener('click', e => {
            e.preventDefault();
            if (this.validate(stepEl)) {
              this.nextStep();
            }
          })
          yesBtn.addEventListener('keydown', logKey);
        } catch (er) { }

        try {
          if (!applyBtn.classList.contains('submit')) {
            applyBtn.addEventListener('click', e => {
              e.preventDefault();
              if (this.validate(stepEl)) {
                this.nextStep();
              }
            })
            applyBtn.addEventListener('keydown', logKey);
          }
        } catch (er) { }
      })

      changePhoneEl.addEventListener('click', e => {
        e.preventDefault();
        this.toStep(this.step - 1);
      })

      closeBtn.addEventListener('click', e => {
        this.toggleConfirmExitWindow();
      })

      exitQuiz.addEventListener('click', e => {
        e.preventDefault();
        this.closeModalWindow();
      })

      goHome.addEventListener('click', e => {
        e.preventDefault();
        this.closeModalWindow();
      })

      continueQuiz.addEventListener('click', e => {
        e.preventDefault();
        this.toggleConfirmExitWindow();
      })

      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.submitForm(this.form);
      })
    }
  }


  function zipCodeHeandler() {
    const zipInputs = document.querySelectorAll('input.zip-modal-open');

    function openModal(zipCode) {
      const mainContent = document.querySelector('.main-content');
      const zipModal = document.querySelector('.quiz.modal');
      const zipInput = document.querySelector('input.zip-input');
      zipInput.value = zipCode;
      mainContent.classList.add('overflow');
      zipModal.classList.add('show');
    }

    zipInputs.forEach(input => {
      const form = input.closest('form.enter-zip-code-wrap');
      const errorMsg = form.querySelector('.error-msg');

      form.addEventListener('submit', e => {
        e.preventDefault();

        if (input.value.length === 5) openModal(input.value), form.reset();
        else errorMsg.innerText = 'Enter valid zip-code: 6 numbers';

      });
      input.addEventListener('input', e => {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})/);
        e.target.value = x[1];
        if (e.target.value.length === 5) {
          errorMsg.innerText = '';
        }
      })
    })
  }


  google.maps.event.addDomListener(window, 'load', function () {
    const stateInput = document.querySelector('.input-state');
    const cityInput = document.querySelector('.input-city');
    const addressInput = document.querySelector('.input-address');

    let places = new google.maps.places.Autocomplete(addressInput, {
      types: ['address'],
      placeholder: ' ',
      componentRestrictions: { country: ['us'] }
    });

    google.maps.event.addListener(places, 'place_changed', function () {
      let place = places.getPlace();
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();
      let latlng = new google.maps.LatLng(latitude, longitude);
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let endPosition = (isNaN(results[0].address_components[results[0].address_components.length - 2].long_name)) ? 0 : 1;
            let state = results[0].address_components[results[0].address_components.length - 3 - endPosition]?.short_name;
            let city = results[0].address_components[results[0].address_components.length - 5 - endPosition]?.long_name;

            if (city) cityInput.value = city;
            if (state) {
              stateInput.dispatchEvent(new CustomEvent('selectState', {
                detail: {
                  forElemWithClass: 'input-state',
                  state: state,
                }
              }));
            }

          }
        }
      });
    });
  });


  const gallerySwiper = new Swiper('.gallery-slider', {
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 8
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });


  const reviewSwiper = new Swiper('.review-slider', {
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 8
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });


  smoothScroll();
  navHeandler.init();
  zipCodeHeandler();
  const formModal = new FormWizard({
    form: '#step-form',
    steps: '.step',
    progress: '#form-progress',
    nextBtn: '.aplay-btn'
  });
})();

