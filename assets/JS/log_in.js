document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const container = document.querySelector('.container');
  const toggleLinks = document.querySelectorAll('.toggle-form');

  toggleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (loginForm.classList.contains('active')) {
        loginForm.classList.remove('active');
        setTimeout(() => {
          signupForm.classList.add('active');
          container.classList.add('signup-mode');
        }, 300);
      } else {
        signupForm.classList.remove('active');
        setTimeout(() => {
          loginForm.classList.add('active');
          container.classList.remove('signup-mode');
        }, 300);
      }
    });
  });
});

