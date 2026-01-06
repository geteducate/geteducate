const quotes = [
  ""On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar." — David Ogilvy",
  ""The consumer isn't a moron; she is your wife." — David Ogilvy",
  ""If it doesn't sell, it isn't creative." — David Ogilvy",
  ""Nobody reads ads. People read what interests them. Sometimes it's an ad." — Howard Gossage",
  ""Make it simple. Make it memorable. Make it inviting to look at." — Leo Burnett",
  ""Creative without strategy is called art. Creative with strategy is called advertising." — Jef Richards"
];

let quoteIndex = 0;

function rotateQuote() {
  const quoteEl = document.getElementById('quote');
  if (!quoteEl) return;

  quoteEl.classList.remove('active');

  setTimeout(() => {
    quoteEl.innerText = quotes[quoteIndex];
    quoteEl.classList.add('active');
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 1000);
}

if (document.getElementById('quote')) {
  setInterval(rotateQuote, 10000);
}

function toggleMenu() {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('active');
  }
}

function updateHeaderAuth() {
  const headerButtons = document.getElementById('headerButtons');
  if (!headerButtons) return;

  const username = localStorage.getItem('currentUsername');
  const email = localStorage.getItem('currentUser');

  if (username || email) {
    const displayName = username || email;
    headerButtons.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="color: var(--gray-700); font-weight: 500;">Welcome, <strong>${displayName}</strong></span>
        <button onclick="logout()" class="btn btn-ghost" style="padding: 10px 20px;">Logout</button>
      </div>
    `;
  } else {
    headerButtons.innerHTML = `
      <a href="auth.html" class="btn btn-ghost">Login</a>
      <a href="auth.html" class="btn btn-primary">Get Started</a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderAuth();

  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        const nav = document.getElementById('mainNav');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });
});

function isLoggedIn() {
  return !!localStorage.getItem('currentUser');
}

function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentUsername');
  location.href = 'index.html';
}

function requireLogin(page) {
  if (!isLoggedIn()) {
    alert('Please login first');
    location.href = 'auth.html';
    return false;
  }
  location.href = page;
  return true;
}

let appStep = 0;
let appData = {};

function initializeApplication() {
  const appSteps = document.querySelectorAll('.app-step');
  if (appSteps.length > 0) {
    showAppStep();
  }
}

function showAppStep() {
  const appSteps = document.querySelectorAll('.app-step');
  appSteps.forEach(step => step.classList.remove('active'));

  if (appSteps[appStep]) {
    appSteps[appStep].classList.add('active');
  }

  if (appData.name) {
    document.querySelectorAll('.dynamic-name').forEach(el => el.innerText = appData.name);
  }
  if (appData.age) {
    document.querySelectorAll('.dynamic-age').forEach(el => el.innerText = appData.age);
  }
}

function nextApp() {
  const appSteps = document.querySelectorAll('.app-step');
  const current = appSteps[appStep];

  const inputs = current.querySelectorAll('input[required], textarea[required]');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert('Please fill all required fields');
      return;
    }
  }

  const radios = current.querySelectorAll('input[type="radio"][required]');
  if (radios.length > 0) {
    const radioNames = [...new Set([...radios].map(r => r.name))];
    for (let name of radioNames) {
      const checked = current.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        alert('Please select an option');
        return;
      }
    }
  }

  if (appStep === 1) {
    const firstName = current.querySelector('#firstName');
    const lastName = current.querySelector('#lastName');
    const age = current.querySelector('#age');

    if (firstName && lastName) {
      appData.name = `${firstName.value} ${lastName.value}`;
    }
    if (age) {
      appData.age = age.value;
    }
  }

  appStep++;
  if (appStep >= appSteps.length) {
    submitApplication();
    return;
  }

  showAppStep();
}

function backApp() {
  if (appStep > 0) {
    appStep--;
    showAppStep();
  }
}

function submitApplication() {
  const timestamp = new Date().toISOString();
  const applicationData = {
    ...appData,
    timestamp,
    status: 'pending'
  };

  localStorage.setItem('lastApplication', JSON.stringify(applicationData));

  alert('Application submitted successfully!');
  location.href = 'success.html';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
  initializeApplication();
}
