// Modal and Notification JavaScript

// Notification modal
const notificationModal = document.getElementById("notificationModal");
const notificationMessage = document.getElementById("notificationMessage");
const notificationCloseBtn = notificationModal.querySelector(".close-btn");
let notificationTimeout;

function showNotification(msg) {
  notificationMessage.textContent = msg;
  notificationModal.classList.add("active");
  notificationModal.classList.remove("hide");
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notificationModal.classList.remove("active");
    notificationModal.classList.add("hide");
  }, 4500);
}

notificationCloseBtn.addEventListener("click", () => {
  notificationModal.classList.remove("active");
  notificationModal.classList.add("hide");
  clearTimeout(notificationTimeout);
});

// Forgot password modal
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const forgotEmailInput = document.getElementById("forgotEmail");
const forgotEmailError = document.getElementById("forgotEmailError");
const forgotSubmitBtn = document.getElementById("forgotSubmitBtn");
const forgotCloseBtn = document.getElementById("forgotCloseBtn");

function showForgotPasswordModal() {
  forgotPasswordModal.classList.remove("hidden");
  forgotEmailInput.value = "";
  forgotEmailError.textContent = "";
  forgotSubmitBtn.disabled = true;
  forgotEmailInput.focus();
}

function hideForgotPasswordModal() {
  forgotPasswordModal.classList.add("hidden");
}

function validateForgotEmail(email) {
  if (!email) return "ایمیل را وارد کنید.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.toLowerCase())) return "ایمیل معتبر نیست.";
  return "";
}

forgotEmailInput.addEventListener("input", () => {
  const err = validateForgotEmail(forgotEmailInput.value.trim());
  forgotEmailError.textContent = err;
  forgotEmailError.classList.toggle("active", !!err);
  forgotSubmitBtn.disabled = !!err;
});

forgotCloseBtn.addEventListener("click", () => {
  hideForgotPasswordModal();
});

forgotPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = forgotEmailInput.value.trim();
  const err = validateForgotEmail(email);
  if (err) {
    forgotEmailError.textContent = err;
    forgotEmailError.classList.add("active");
    return;
  }

  // Simulate sending recovery link
  hideForgotPasswordModal();
  showNotification(`لینک بازیابی رمز عبور به ${email} ارسال شد.`);
});

// Close modal when clicking outside
forgotPasswordModal.addEventListener("click", (e) => {
  if (e.target === forgotPasswordModal) {
    hideForgotPasswordModal();
  }
});

// Export functions for use in other files
window.showNotification = showNotification;
window.showForgotPasswordModal = showForgotPasswordModal;
