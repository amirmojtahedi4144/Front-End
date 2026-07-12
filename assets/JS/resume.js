'use strict';

// =============================================
// 1. element toggle helper
// =============================================
const elementToggleFunc = function (elem) {
  elem.classList.toggle('active');
};

// =============================================
// 2. SIDEBAR TOGGLE
// =============================================
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn?.addEventListener('click', function () {
  elementToggleFunc(sidebar);
});

// =============================================
// 3. TESTIMONIALS MODAL
// =============================================
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle('active');
  overlay?.classList.toggle('active');
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    const avatar = this.querySelector('[data-testimonials-avatar]');
    const title = this.querySelector('[data-testimonials-title]');
    const text = this.querySelector('[data-testimonials-text]');

    if (modalImg) {
      modalImg.src = avatar?.src || '';
      modalImg.alt = avatar?.alt || '';
    }
    if (modalTitle) modalTitle.innerHTML = title?.innerHTML || '';
    if (modalText) modalText.innerHTML = text?.innerHTML || '';

    testimonialsModalFunc();
  });
}

modalCloseBtn?.addEventListener('click', testimonialsModalFunc);
overlay?.addEventListener('click', testimonialsModalFunc);

// =============================================
// 4. PORTFOLIO FILTER (Mobile Select & Desktop)
// =============================================
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');

// Map Persian categories to English data-category values
const categoryMap = {
  'همه': 'all',
  'طراحی وب': 'web design',
  'اپلیکیشن': 'applications',
  'توسعه وب': 'web development'
};

// ----- Mobile select -----
select?.addEventListener('click', function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function () {
    const selectedText = this.innerText.trim();
    const selectedValue = categoryMap[selectedText] || 'all';

    if (selectValue) selectValue.innerText = selectedText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// ----- Filter items -----
const filterItems = document.querySelectorAll('[data-filter-item]');

function filterFunc(selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category;
    if (selectedValue === 'all' || selectedValue === itemCategory) {
      filterItems[i].classList.add('active');
    } else {
      filterItems[i].classList.remove('active');
    }
  }
}

// ----- Desktop filter buttons -----
let lastClickedBtn = filterBtns[0];

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener('click', function () {
    const selectedText = this.innerText.trim();
    const selectedValue = categoryMap[selectedText] || 'all';

    if (selectValue) selectValue.innerText = selectedText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
}

// =============================================
// 5. CONTACT FORM – enable/disable submit button
// =============================================
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    if (form?.checkValidity()) {
      formBtn?.removeAttribute('disabled');
    } else {
      formBtn?.setAttribute('disabled', '');
    }
  });
}

// =============================================
// 6. PAGE NAVIGATION
// =============================================
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    const targetPage = this.innerHTML.trim();

    for (let j = 0; j < pages.length; j++) {
      const pageName = pages[j].dataset.page?.trim();
      if (pageName === targetPage) {
        pages[j].classList.add('active');
        navigationLinks[j].classList.add('active');
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove('active');
        navigationLinks[j].classList.remove('active');
      }
    }
  });
}

// =============================================
// 7. Prevent form submission (demo)
// =============================================
form?.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ پیام شما با موفقیت ارسال شد! (دمو)');
  form.reset();
  if (formBtn) formBtn.disabled = true;
});