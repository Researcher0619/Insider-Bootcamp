let timer;
let remainingTime = 0;

const input = document.getElementById('timeInput');
const countdown = document.getElementById('countdown');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

startBtn.addEventListener('click', () => {
  const value = parseInt(input.value);
  if (isNaN(value) || value <= 0) {
    alert('Lütfen geçerli bir süre girin.');
    return;
  }

  clearInterval(timer);
  remainingTime = value;
  countdown.textContent = remainingTime;

  timer = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(timer);
      countdown.textContent = 'Süre doldu!';
    } else {
      countdown.textContent = remainingTime;
    }
  }, 1000);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  countdown.textContent = 'Hazır';
  input.value = '';
});
