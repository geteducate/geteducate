/* Modal */
function openModal(type){
  document.getElementById('modalBg').style.display='flex';
  document.getElementById('registerModal').classList.add('hidden');
  document.getElementById('loginModal').classList.add('hidden');
  document.getElementById('adminLoginModal').classList.add('hidden');
  if(type==='login') document.getElementById('loginModal').classList.remove('hidden');
  else if(type==='register') document.getElementById('registerModal').classList.remove('hidden');
  else if(type==='adminLogin') document.getElementById('adminLoginModal').classList.remove('hidden');
}
function closeModal(){ document.getElementById('modalBg').style.display='none'; }
function toggleModal(type){
  if(type==='login'){
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('registerModal').classList.add('hidden');
  }else{
    document.getElementById('registerModal').classList.remove('hidden');
    document.getElementById('loginModal').classList.add('hidden');
  }
}

/* Users */
function register(){
  const email=document.getElementById('regEmail').value;
  const pass=document.getElementById('regPass').value;
  if(!email||!pass){ alert('Fill all fields'); return; }
  let users=JSON.parse(localStorage.getItem('users')||'[]');
  users.push({email:email,password:pass});
  localStorage.setItem('users',JSON.stringify(users));
  alert('Registered! Check your email for 4-digit code (simulated).');
  toggleModal('login');
}
function login(){
  const email=document.getElementById('logEmail').value;
  const pass=document.getElementById('logPass').value;
  let users=JSON.parse(localStorage.getItem('users')||'[]');
  let found=users.find(u=>u.email===email && u.password===pass);
  if(found){ alert('Access granted!'); closeModal(); } else alert('Wrong credentials!');
}
function loginAdmin(){
  const user=document.getElementById('adminUser').value;
  const pass=document.getElementById('adminPass').value;
  if(user==='geteducateio8' && pass==='@Shuhrat2008'){
    closeModal();
    document.getElementById('adminPanel').style.display='flex';
    updateStats();
  }else{ alert('Wrong admin credentials!'); }
}
function updateStats(){
  let users=JSON.parse(localStorage.getItem('users')||'[]');
  document.getElementById('totalUsers').innerText=users.length;
  document.getElementById('newUsers').innerText=Math.floor(Math.random()*5+1);
  document.getElementById('adsOffers').innerText=Math.floor(Math.random()*3);
}

/* Quotes Rotation */
const quotes=[
  "“The way to get started is to quit talking and begin doing.” — Walt Disney",
  "“Marketing is really just about sharing your passion.” — Michael Hyatt",
  "“Copywriting is salesmanship in print.” — Robert Bly",
  "“Make every detail perfect and limit the number of details to perfect.” — Jack Dorsey",
  "“Don’t find customers for your products, find products for your customers.” — Seth Godin",
  "“Good copy can sell anything.” — David Ogilvy"
];
let qIndex=0;
setInterval(()=>{
  qIndex=(qIndex+1)%quotes.length;
  document.getElementById('rotatingQuote').innerText=quotes[qIndex];
},10000);

/* Multi-step Application Form */
let currentStep=0;
function showStep(index){
  let steps=document.querySelectorAll('.step');
  steps.forEach(s=>s.classList.remove('active'));
  if(steps[index]) steps[index].classList.add('active');
}
function nextStep(){
  currentStep++;
  showStep(currentStep);
}
function backStep(){
  currentStep--;
  showStep(currentStep);
}
