// Real quotes from famous copywriters/books
const quotes = [
  "“On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar.” — David Ogilvy",
  "“The consumer isn't a moron; she is your wife.” — David Ogilvy",
  "“If it doesn't sell, it isn't creative.” — David Ogilvy",
  "“Nobody reads ads. People read what interests them. Sometimes it's an ad.” — Howard Gossage",
  "“Make it simple. Make it memorable. Make it inviting to look at.” — Leo Burnett",
  "“Creative without strategy is called art. Creative with strategy is called advertising.” — Jef Richards"
];
let qIndex = 0;
function rotateQuote() {
  const quoteEl = document.getElementById('quote');
  if (!quoteEl) return;
  quoteEl.classList.remove('active');
  setTimeout(() => {
    quoteEl.innerText = quotes[qIndex];
    quoteEl.classList.add('active');
    qIndex = (qIndex + 1) % quotes.length;
  }, 1000);
}
setInterval(rotateQuote, 10000);
if (document.getElementById('quote')) rotateQuote();

// Modals
function openModal(type) {
  document.getElementById('modalBg').style.display = 'flex';
  document.querySelectorAll('.modal-content').forEach(m => m.classList.add('hidden'));
  document.getElementById(type + 'Modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modalBg').style.display = 'none';
}

// Auth
function register() {
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  if (!email || !pass) return alert('Fill all fields');
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) return alert('Email exists');
  const code = Math.floor(1000 + Math.random() * 9000);
  localStorage.setItem('tempReg', JSON.stringify({email, pass, code}));
  alert(`Code sent to ${email}: ${code} (demo - enter it)`);
  openModal('verify');
}
function verifyCode() {
  const input = document.getElementById('verifyInput').value;
  const temp = JSON.parse(localStorage.getItem('tempReg'));
  if (input == temp.code) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({email: temp.email, pass: temp.pass});
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', temp.email);
    alert('Registered & logged in!');
    closeModal();
    localStorage.removeItem('tempReg');
  } else alert('Wrong code');
}
function login() {
  const email = document.getElementById('logEmail').value.trim();
  const pass = document.getElementById('logPass').value;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const found = users.find(u => u.email === email && u.pass === pass);
  if (found) {
    localStorage.setItem('currentUser', email);
    alert('Logged in!');
    closeModal();
    location.reload();
  } else alert('Wrong credentials');
}
function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}
function isLoggedIn() {
  return !!localStorage.getItem('currentUser');
}
function requireLogin(page) {
  if (!isLoggedIn()) { openModal('login'); return; }
  location.href = page;
}

// Application steps
let appStep = 0;
let appData = {};
const appSteps = document.querySelectorAll('.app-step');
function showAppStep() {
  appSteps.forEach(s => s.classList.remove('active'));
  appSteps[appStep].classList.add('active');
  // Dynamic inserts
  if (appData.name) document.querySelectorAll('.dynamic-name').forEach(el => el.innerText = appData.name);
  if (appData.age) document.querySelectorAll('.dynamic-age').forEach(el => el.innerText = appData.age);
}
function nextApp() {
  // Validation example (add more as needed)
  const current = appSteps[appStep];
  const inputs = current.querySelectorAll('input[required], textarea[required]');
  for (let i of inputs) if (!i.value.trim()) return alert('Fill all fields');
  // Save data
  if (appStep === 1) { // personal info
    appData.name = current.querySelector('#firstName').value + ' ' + current.querySelector('#lastName').value;
    appData.age = current.querySelector('#age').value;
  }
  // Branching
  if (appStep === 9 && current.querySelector('input[name="fullstackExp"]:checked').value === 'no') {
    appStep += 1; // skip to other exp
  }
  appStep++;
  showAppStep();
}
function backApp() {
  appStep--;
  showAppStep();
}
function submitApplication() {
  // Save to localStorage or simulate
  alert('Application submitted!');
  location.href = 'success.html';
}
if (appSteps.length) showAppStep();
