// Authentication Form JavaScript
const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const submitBtn = document.getElementById("submitBtn");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const toggleFormText = document.getElementById("toggleFormText");
const formTitle = document.getElementById("formTitle");

let isLogin = true;

// Email validation
function validateEmail(email) {
  if (!email) return "ایمیل را وارد کنید.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.toLowerCase())) return "ایمیل معتبر نیست.";
  return "";
}

// Password validation
function validatePassword(password) {
  if (!password) return "رمز عبور را وارد کنید.";
  if (!isLogin && password.length < 8)
    return "رمز عبور باید حداقل ۸ کاراکتر باشد.";
  return "";
}

// Confirm password validation
function validateConfirmPassword(confirmPassword, password) {
  if (!confirmPassword) return "تکرار رمز عبور را وارد کنید.";
  if (confirmPassword !== password) return "رمز عبور و تکرار آن یکسان نیست.";
  return "";
}

function validateForm() {
  const emailVal = emailInput.value.trim();
  const passwordVal = passwordInput.value.trim();
  const confirmPasswordVal = confirmPasswordInput.value.trim();

  const emailErr = validateEmail(emailVal);
  const passwordErr = validatePassword(passwordVal);
  let confirmPasswordErr = "";

  emailError.textContent = emailErr;
  emailError.classList.toggle("active", !!emailErr);

  passwordError.textContent = passwordErr;
  passwordError.classList.toggle("active", !!passwordErr);

  if (!isLogin) {
    confirmPasswordErr = validateConfirmPassword(
      confirmPasswordVal,
      passwordVal,
    );
    confirmPasswordError.textContent = confirmPasswordErr;
    confirmPasswordError.classList.toggle("active", !!confirmPasswordErr);
  } else {
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.remove("active");
  }

  if (isLogin) {
    submitBtn.disabled = !!emailErr || !!passwordErr;
  } else {
    submitBtn.disabled = !!emailErr || !!passwordErr || !!confirmPasswordErr;
  }
}

// Event listeners for form inputs
emailInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
confirmPasswordInput.addEventListener("input", validateForm);

// Toggle between login and register forms
toggleFormBtn.addEventListener("click", () => {
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "ورود به حساب کاربری";
    submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3H9A.75.75 0 019 3.75h-1.5z" clip-rule="evenodd" />
        <path fill-rule="evenodd" d="M14.47 2.47a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06l4.72-4.72H9a.75.75 0 010-1.5h9.19l-4.72-4.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
      </svg>
      ورود
    `;
    confirmPasswordGroup.style.display = "none";
    toggleFormText.textContent = "حساب کاربری ندارید؟";
    toggleFormBtn.textContent = "ثبت نام";

    // Remove forgot password link
    const forgotLink = document.getElementById("forgotPasswordLink");
    if (forgotLink) forgotLink.remove();
  } else {
    formTitle.textContent = "ثبت نام";
    submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
      </svg>
      ثبت نام
    `;
    confirmPasswordGroup.style.display = "block";
    toggleFormText.textContent = "حساب کاربری دارید؟";
    toggleFormBtn.textContent = "ورود";

    // Add forgot password link if it doesn't exist
    if (!document.getElementById("forgotPasswordLink")) {
      const forgotLink = document.createElement("button");
      forgotLink.type = "button";
      forgotLink.id = "forgotPasswordLink";
      forgotLink.textContent = "فراموشی رمز عبور؟";
      forgotLink.style = `
        display: block;
        margin: 1rem auto 0;
        background: none;
        border: none;
        color: var(--primary-600);
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        user-select: none;
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      `;
      forgotLink.addEventListener("click", () => {
        showForgotPasswordModal();
      });
      forgotLink.addEventListener("mouseenter", () => {
        forgotLink.style.background = "rgba(14, 165, 233, 0.1)";
        forgotLink.style.color = "var(--primary-700)";
      });
      forgotLink.addEventListener("mouseleave", () => {
        forgotLink.style.background = "transparent";
        forgotLink.style.color = "var(--primary-600)";
      });
      authForm.after(forgotLink);
    }
  }

  // Reset validation and form
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  emailError.classList.remove("active");
  passwordError.classList.remove("active");
  confirmPasswordError.classList.remove("active");
  submitBtn.disabled = true;

  // Update password icons
  updatePasswordIcons();
});

// Form submission
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();

  if (submitBtn.disabled) return;

  if (isLogin) {
    showNotification("ورود با موفقیت انجام شد!");
  } else {
    showNotification("ثبت نام با موفقیت انجام شد! ایمیل فعال‌سازی ارسال شد.");
  }

  const strengthDiv = document.getElementById("passwordStrength");
  strengthDiv.textContent = "";
  strengthDiv.className = "";

  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  submitBtn.disabled = true;

  // Update password icons
  updatePasswordIcons();
});

// Update password icons based on input state
function updatePasswordIcons() {
  const passwordToggles = document.querySelectorAll(".toggle-password");

  passwordToggles.forEach((btn) => {
    const input = btn.parentElement.querySelector("input");

    if (input.value.length === 0) {
      // Show lock icon when empty
      btn.classList.remove("has-text", "showing-password");
    } else {
      // Show eye icons when there's text
      btn.classList.add("has-text");
      if (input.type === "text") {
        btn.classList.add("showing-password");
      } else {
        btn.classList.remove("showing-password");
      }
    }
  });
}

// Password visibility toggle
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");

    if (input.type === "password") {
      input.type = "text";
      btn.setAttribute("aria-pressed", "true");
      btn.classList.add("showing-password");
    } else {
      input.type = "password";
      btn.setAttribute("aria-pressed", "false");
      btn.classList.remove("showing-password");
    }
    input.focus();
  });
});

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++; // Special characters

  if (strength <= 2) return "ضعیف";
  if (strength === 3) return "متوسط";
  if (strength === 4) return "قوی";
  if (strength === 5) return "خیلی قوی";
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  const strengthDiv = document.getElementById("passwordStrength");

  if (!password) {
    strengthDiv.textContent = "";
    strengthDiv.className = "";
    return;
  }

  const strength = checkPasswordStrength(password);
  strengthDiv.textContent = `قدرت رمز: ${strength}`;

  strengthDiv.className = "";

  switch (strength) {
    case "ضعیف":
      strengthDiv.classList.add("strength-weak");
      break;
    case "متوسط":
      strengthDiv.classList.add("strength-medium");
      break;
    case "قوی":
      strengthDiv.classList.add("strength-strong");
      break;
    case "خیلی قوی":
      strengthDiv.classList.add("strength-very-strong");
      break;
  }
}

passwordInput.addEventListener("input", () => {
  if (!isLogin) {
    updatePasswordStrength();
  } else {
    // Hide password strength in login mode
    const strengthDiv = document.getElementById("passwordStrength");
    strengthDiv.textContent = "";
    strengthDiv.className = "";
  }
  validateForm();
  updatePasswordIcons();
});

confirmPasswordInput.addEventListener("input", () => {
  validateForm();
  updatePasswordIcons();
});

// Initialize form on page load
window.addEventListener("DOMContentLoaded", () => {
  isLogin = true;
  confirmPasswordGroup.style.display = "none";
  toggleFormText.textContent = "حساب کاربری ندارید؟";
  toggleFormBtn.textContent = "ثبت نام";

  // Add forgot password link in login form
  if (!document.getElementById("forgotPasswordLink")) {
    const forgotLink = document.createElement("button");
    forgotLink.type = "button";
    forgotLink.id = "forgotPasswordLink";
    forgotLink.textContent = "فراموشی رمز عبور؟";
    forgotLink.style = `
      display: block;
      margin: 1rem auto 0;
      background: none;
      border: none;
      color: var(--primary-600);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      user-select: none;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    `;
    forgotLink.addEventListener("click", () => {
      showForgotPasswordModal();
    });
    forgotLink.addEventListener("mouseenter", () => {
      forgotLink.style.background = "rgba(14, 165, 233, 0.1)";
      forgotLink.style.color = "var(--primary-700)";
    });
    forgotLink.addEventListener("mouseleave", () => {
      forgotLink.style.background = "transparent";
      forgotLink.style.color = "var(--primary-600)";
    });
    authForm.after(forgotLink);
  }

  // Initialize password icons
  updatePasswordIcons();
});
