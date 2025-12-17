// Real quotes from sources (Ogilvy books, podcasts, etc.)
const quotes = [
  "“The most important word in the vocabulary of advertising is TEST.” — David Ogilvy",
  "“If it doesn’t sell, it isn’t creative.” — David Ogilvy",
  "“The consumer isn’t a moron. She is your wife.” — David Ogilvy",
  "“Nobody reads advertising. People read what interests them.” — Howard Gossage",
  "“On average, 5 times as many people read the headline as read the body copy.” — David Ogilvy",
  "“Good advertising is written from the consumer’s point of view.” — Claude Hopkins"
];
let qIndex = 0;
function rotateQuote() {
  document.getElementById('quote').classList.remove('active');
  setTimeout(() => {
    document.getElementById('quote').innerText = quotes[qIndex];
    document.getElementById('quote').classList.add('active');
    qIndex = (qIndex + 1) % quotes.length;
  }, 1000);
}
setInterval(rotateQuote, 10000);
rotateQuote();

// Login check
function checkLogin(redirect) {
  if (!localStorage.getItem('currentUser')) { openModal('login'); return false; }
  location.href = redirect;
  return true;
}

// Register with code
let verifyCode = '';
function register() {
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;
  if (!email || !pass) return alert('Fill fields');
  verifyCode = Math.floor(1000 + Math.random() * 9000);
  alert(`Code sent to ${email}: ${verifyCode} (demo)`);
  document.getElementById('verifyStep').classList.remove('hidden');
}
function verify() {
  if (document.getElementById('codeInput').value == verifyCode) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({email: document.getElementById('regEmail').value, pass: document.getElementById('regPass').value});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered!'); closeModal(); 
  } else alert('Wrong code');
}

// Application multi-step
let step = 0; let data = {};
const steps = document.querySelectorAll('.step');
function showStep() { steps.forEach(s => s.classList.remove('active')); steps[step].classList.add('active'); }
function next() {
  // Save data + validation logic here (e.g., required fields)
  if (step === 5) data.name = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
  // Dynamic name/age insert
  if (step > 5) document.querySelector('.dynamic-name').innerText = data.name || '';
  // Branching example for experience question
  if (step === 10 && document.querySelector('input[name="fullstackExp"]:checked').value === 'no') { step += 2; } // skip to other exp
  step++; showStep();
}
function back() { step--; showStep(); }
function submitApp() { alert('Submitted!'); location.href = 'success.html'; } // new success page
