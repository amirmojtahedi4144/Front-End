// جابجایی تب‌ها و تغییر فرم
const tabs = document.querySelectorAll('.tab');
const underline = document.querySelector('.tab-underline');
const form = document.querySelector('.login-form');

function renderForm(type) {
  if (type === 'signin') {
    form.innerHTML = `
      <div class="input-group">
        <span class="icon mail"></span>
        <input type="text" placeholder="Username" required>
      </div>
      <div class="input-group">
        <span class="icon lock"></span>
        <input type="password" placeholder="Password" required>
      </div>
      <div class="remember-row">
        <label class="remember-label">
          Remember me
          <input type="checkbox" class="toggle">
          <span class="slider"></span>
        </label>
      </div>
      <button type="submit" class="sign-in-btn">SIGN IN</button>
    `;
  } else {
    form.innerHTML = `
      <div class="input-group">
        <span class="icon mail"></span>
        <input type="text" placeholder="Username" required>
      </div>
      <div class="input-group">
        <span class="icon mail"></span>
        <input type="email" placeholder="Email" required>
      </div>
      <div class="input-group">
        <span class="icon lock"></span>
        <input type="password" placeholder="Password" required>
      </div>
      <div class="input-group">
        <span class="icon lock"></span>
        <input type="password" placeholder="Confirm Password" required>
      </div>
      <button type="submit" class="sign-in-btn">SIGN UP</button>
    `;
  }
  attachSwitchHandler();
}

function attachSwitchHandler() {
  const toggle = document.querySelector('.toggle');
  const slider = document.querySelector('.slider');
  const label = document.querySelector('.remember-label');
  if (toggle && slider && label) {
    // حذف هندلرهای قبلی
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    // کلیک روی لیبل یا سوئیچ
    label.addEventListener('click', function(e) {
      if (e.target === newToggle) return; // اگر خود چک‌باکس بود، پیش‌فرض کافی است
      newToggle.checked = !newToggle.checked;
      e.preventDefault();
    });
  }
}

// مقدار اولیه فرم
renderForm('signin');

tabs.forEach((tab, idx) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    underline.style.left = (idx * 50) + '%';
    if (idx === 0) {
      renderForm('signin');
      document.querySelector('.forgot').style.display = '';
    } else {
      renderForm('signup');
      document.querySelector('.forgot').style.display = 'none';
    }
  });
});
