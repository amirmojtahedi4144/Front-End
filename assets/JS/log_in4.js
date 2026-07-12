const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldError(fieldEl, message) {
  fieldEl.classList.add("field--error");
  const input = fieldEl.querySelector("input");
  if (input) input.setAttribute("aria-invalid", "true");

  let err = fieldEl.querySelector(".field__error");
  if (!err) {
    err = document.createElement("span");
    err.className = "field__error";
    err.setAttribute("role", "alert");
    fieldEl.appendChild(err);
  }
  err.textContent = message;
}

function clearFieldError(fieldEl) {
  fieldEl.classList.remove("field--error");
  const input = fieldEl.querySelector("input");
  if (input) input.removeAttribute("aria-invalid");
  const err = fieldEl.querySelector(".field__error");
  if (err) err.remove();
}

function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed) return "ایمیل را وارد کنید";
  if (!EMAIL_RE.test(trimmed)) return "ایمیل معتبر وارد کنید";
  return null;
}

function validateLogin(form) {
  let valid = true;
  const emailField = form.querySelector('[name="email"]').closest(".field");
  const passwordField = form.querySelector('[name="password"]').closest(".field");

  clearFieldError(emailField);
  clearFieldError(passwordField);

  const emailErr = validateEmail(form.querySelector('[name="email"]').value);
  if (emailErr) {
    showFieldError(emailField, emailErr);
    valid = false;
  }

  const password = form.querySelector('[name="password"]').value;
  if (!password) {
    showFieldError(passwordField, "رمز عبور را وارد کنید");
    valid = false;
  }

  return valid;
}

function validateRegister(form) {
  let valid = true;
  const nameField = form.querySelector('[name="name"]').closest(".field");
  const emailField = form.querySelector('[name="email"]').closest(".field");
  const passwordField = form.querySelector('[name="password"]').closest(".field");
  const confirmField = form.querySelector('[name="confirm"]').closest(".field");
  const termsCheck = form.querySelector(".check--block");

  [nameField, emailField, passwordField, confirmField].forEach(clearFieldError);
  termsCheck.classList.remove("field--error");
  termsCheck.querySelector(".field__error")?.remove();

  const name = form.querySelector('[name="name"]').value.trim();
  if (!name) {
    showFieldError(nameField, "نام را وارد کنید");
    valid = false;
  } else if (name.length < 3) {
    showFieldError(nameField, "حداقل ۳ کاراکتر");
    valid = false;
  }

  const emailErr = validateEmail(form.querySelector('[name="email"]').value);
  if (emailErr) {
    showFieldError(emailField, emailErr);
    valid = false;
  }

  const password = form.querySelector('[name="password"]').value;
  if (!password) {
    showFieldError(passwordField, "رمز عبور را وارد کنید");
    valid = false;
  } else if (password.length < 8) {
    showFieldError(passwordField, "حداقل ۸ کاراکتر");
    valid = false;
  }

  const confirm = form.querySelector('[name="confirm"]').value;
  if (!confirm) {
    showFieldError(confirmField, "رمز را دوباره وارد کنید");
    valid = false;
  } else if (confirm !== password) {
    showFieldError(confirmField, "رمز عبور یکسان نیست");
    valid = false;
  }

  if (!form.querySelector('[name="terms"]').checked) {
    termsCheck.classList.add("field--error");
    const err = document.createElement("span");
    err.className = "field__error";
    err.setAttribute("role", "alert");
    err.textContent = "پذیرش قوانین الزامی است";
    termsCheck.appendChild(err);
    valid = false;
  }

  return valid;
}

function wireForm(form, validate) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate(form)) {
      const note = form.querySelector(".form__note");
      if (note) note.textContent = "اعتبارسنجی موفق — نمایشی، به سرور ارسال نمی‌شود.";
    }
  });

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field) clearFieldError(field);
      if (input.name === "terms") {
        const terms = form.querySelector(".check--block");
        terms.classList.remove("field--error");
        terms.querySelector(".field__error")?.remove();
      }
    });
  });
}

const loginForm = document.getElementById("form-login");
const registerForm = document.getElementById("form-register");

wireForm(loginForm, validateLogin);
wireForm(registerForm, validateRegister);

const registerPassword = registerForm.querySelector('[name="password"]');
const registerConfirm = registerForm.querySelector('[name="confirm"]');
registerConfirm.addEventListener("input", () => {
  if (registerConfirm.value && registerConfirm.value !== registerPassword.value) {
    showFieldError(registerConfirm.closest(".field"), "رمز عبور یکسان نیست");
  } else {
    clearFieldError(registerConfirm.closest(".field"));
  }
});
