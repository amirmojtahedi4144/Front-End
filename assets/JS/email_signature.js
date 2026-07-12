// متغیرهای سراسری
const form = document.getElementById("signatureForm");
const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copyBtn");
const logoInput = document.getElementById("logo");
let logoDataURL = "";

// تعریف رنگ‌های تم
const colors = {
  blue: "#3b82f6",
  green: "#10b981",
  red: "#ef4444",
  gray: "#6b7280",
  purple: "#8b5cf6",
  orange: "#f97316",
};

// آیکون‌های شبکه‌های اجتماعی
const socialIcons = {
  instagram: `<svg class="social-icon" viewBox="0 0 24 24"><path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2a3.75 3.75 0 00-3.75 3.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.75 2.5a1 1 0 110 2 1 1 0 010-2zM12 7.25a4.75 4.75 0 11.001 9.501A4.75 4.75 0 0112 7.25z"/></svg>`,
  linkedin: `<svg class="social-icon" viewBox="0 0 24 24"><path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.63 1.33 2.97 2.97 2.97s2.97-1.34 2.97-2.97c0-1.64-1.33-2.98-2.96-2.98zM2.5 21.5h5v-12h-5v12zm7.5-12h4.75v1.7h.07c.66-1.25 2.28-2.58 4.7-2.58 5.03 0 6 3.32 6 7.64v8.24h-5v-7.3c0-1.75-.03-4-2.5-4-2.5 0-2.88 1.95-2.88 3.94v7.36h-5v-12z"/></svg>`,
  telegram: `<svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.13-.02.2z"/></svg>`,
  whatsapp: `<svg class="social-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>`,
};

// تابع بارگذاری داده‌های ذخیره شده
function loadSavedData() {
  const saved = localStorage.getItem("emailSignatureData");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      form.name.value = data.name || "";
      form.job.value = data.job || "";
      form.email.value = data.email || "";
      form.phone.value = data.phone || "";
      form.website.value = data.website || "";
      form.instagram.value = data.instagram || "";
      form.linkedin.value = data.linkedin || "";
      form.telegram.value = data.telegram || "";
      form.whatsapp.value = data.whatsapp || "";
      form.themeColor.value = data.theme || "blue";

      if (data.logoDataURL) {
        logoDataURL = data.logoDataURL;
      }

      generatePreview(data);
    } catch (error) {
      console.error("خطا در بارگذاری داده‌های ذخیره شده:", error);
    }
  }
}

// تابع مدیریت آپلود لوگو
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (ev) {
      logoDataURL = ev.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    logoDataURL = "";
  }
}

// تابع مدیریت ارسال فرم
function handleFormSubmit(event) {
  event.preventDefault();

  const data = {
    name: form.name.value.trim(),
    job: form.job.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    website: form.website.value.trim(),
    instagram: form.instagram.value.trim(),
    linkedin: form.linkedin.value.trim(),
    telegram: form.telegram.value.trim(),
    whatsapp: form.whatsapp.value.trim(),
    theme: form.themeColor.value,
    logoDataURL: logoDataURL,
  };

  generatePreview(data);

  // ذخیره در localStorage
  localStorage.setItem("emailSignatureData", JSON.stringify(data));
}

// تابع تولید پیش‌نمایش
function generatePreview(data) {
  const colorHex = colors[data.theme] || "#2563EB";
  preview.style.setProperty("--primary-color", colorHex);

  const logoHtml = data.logoDataURL
    ? `<td style="width:120px; padding-right:15px;">
    <img src="${data.logoDataURL}" alt="لوگو" class="logo-preview" />
  </td>`
    : `<td style="width:120px; padding-right:15px;"></td>`;

  const html = `
    <table>
      <tbody>
        <tr>
          ${logoHtml}
          <td>
            <p class="name">${escapeHTML(data.name)}</p>
            <p class="job-title">${escapeHTML(data.job)}</p>
            <p><strong>ایمیل:</strong> <a href="mailto:${escapeHTML(data.email)}">${escapeHTML(data.email)}</a></p>
            ${data.phone ? `<p><strong>تلفن:</strong> <a href="tel:${escapeHTML(data.phone)}">${escapeHTML(data.phone)}</a></p>` : ""}
            ${data.website ? `<p><strong>وب‌سایت:</strong> <a href="${escapeHTML(data.website)}" target="_blank">${escapeHTML(data.website)}</a></p>` : ""}
            <p style="margin-top: 12px;">
              ${data.instagram ? `<a class="social-link" href="${escapeHTML(data.instagram)}" target="_blank" title="Instagram">${socialIcons.instagram}</a>` : ""}
              ${data.linkedin ? `<a class="social-link" href="${escapeHTML(data.linkedin)}" target="_blank" title="LinkedIn">${socialIcons.linkedin}</a>` : ""}
              ${data.telegram ? `<a class="social-link" href="${escapeHTML(data.telegram)}" target="_blank" title="Telegram">${socialIcons.telegram}</a>` : ""}
              ${data.whatsapp ? `<a class="social-link" href="https://wa.me/${escapeHTML(data.whatsapp)}" target="_blank" title="WhatsApp">${socialIcons.whatsapp}</a>` : ""}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  `;
  preview.innerHTML = html;
  copyBtn.disabled = false;
}

// تابع کپی کردن کد HTML
function copySignatureCode() {
  if (!preview.innerHTML) return;

  navigator.clipboard
    .writeText(preview.innerHTML)
    .then(() => {
      showNotification(
        "کد HTML امضا کپی شد! حالا می‌توانید در ایمیل خودتان استفاده کنید.",
        "success",
      );
    })
    .catch(() => {
      showNotification("خطا در کپی کردن کد.", "error");
    });
}

// تابع نمایش اعلان
function showNotification(message, type = "info") {
  // ایجاد عنصر اعلان
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // استایل‌های اعلان
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  // رنگ‌بندی بر اساس نوع
  if (type === "success") {
    notification.style.backgroundColor = "#16a34a";
  } else if (type === "error") {
    notification.style.backgroundColor = "#dc2626";
  } else {
    notification.style.backgroundColor = "#2563eb";
  }

  // اضافه کردن به صفحه
  document.body.appendChild(notification);

  // حذف بعد از 3 ثانیه
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// تابع محافظت در برابر XSS
function escapeHTML(text) {
  if (!text) return "";
  return text.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return m;
    }
  });
}

// تابع اعتبارسنجی فرم
function validateForm(data) {
  const errors = [];

  if (!data.name.trim()) {
    errors.push("نام و نام خانوادگی الزامی است");
  }

  if (!data.job.trim()) {
    errors.push("سمت یا عنوان شغلی الزامی است");
  }

  if (!data.email.trim()) {
    errors.push("ایمیل الزامی است");
  } else if (!isValidEmail(data.email)) {
    errors.push("فرمت ایمیل صحیح نیست");
  }

  if (data.website && !isValidUrl(data.website)) {
    errors.push("فرمت وب‌سایت صحیح نیست");
  }

  if (data.instagram && !isValidUrl(data.instagram)) {
    errors.push("فرمت لینک اینستاگرام صحیح نیست");
  }

  if (data.linkedin && !isValidUrl(data.linkedin)) {
    errors.push("فرمت لینک لینکدین صحیح نیست");
  }

  if (data.telegram && !isValidUrl(data.telegram)) {
    errors.push("فرمت لینک تلگرام صحیح نیست");
  }

  if (data.whatsapp && !isValidPhone(data.whatsapp)) {
    errors.push("فرمت شماره واتساپ صحیح نیست");
  }

  return errors;
}

// تابع اعتبارسنجی ایمیل
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// تابع اعتبارسنجی URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// تابع اعتبارسنجی شماره تلفن
function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
}

// تابع پاک کردن فرم
function clearForm() {
  form.reset();
  logoDataURL = "";
  preview.innerHTML = "";
  copyBtn.disabled = true;
  localStorage.removeItem("emailSignatureData");
  showNotification("فرم پاک شد", "info");
}

// تابع تغییر تم تاریک/روشن
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);

  // اعمال کلاس dark به عناصر
  const elements = document.querySelectorAll(
    ".container, .form-input, .file-input, .select-input, .preview-container",
  );
  elements.forEach((element) => {
    if (isDark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  });
}

// تابع بارگذاری تنظیمات تم
function loadThemeSettings() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    const elements = document.querySelectorAll(
      ".container, .form-input, .file-input, .select-input, .preview-container",
    );
    elements.forEach((element) => {
      element.classList.add("dark");
    });
  }
}

// رویدادهای صفحه
document.addEventListener("DOMContentLoaded", function () {
  // بارگذاری تنظیمات
  loadThemeSettings();
  loadSavedData();

  // اضافه کردن event listeners
  logoInput.addEventListener("change", handleLogoUpload);
  form.addEventListener("submit", handleFormSubmit);
  copyBtn.addEventListener("click", copySignatureCode);

  // اضافه کردن دکمه تغییر تم (اختیاری)
  const themeToggle = document.createElement("button");
  themeToggle.textContent = "🌙";
  themeToggle.className = "theme-toggle";
  themeToggle.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 10px;
    border-radius: 50%;
    border: none;
    background: #2563eb;
    color: white;
    cursor: pointer;
    font-size: 18px;
    z-index: 1000;
  `;
  themeToggle.addEventListener("click", toggleDarkMode);
  document.body.appendChild(themeToggle);

  // اضافه کردن event listener برای دکمه پاک کردن
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", clearForm);
});

// اضافه کردن استایل‌های انیمیشن برای اعلان‌ها
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);