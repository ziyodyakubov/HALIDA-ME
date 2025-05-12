const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const openModalBtn = document.querySelectorAll(".openModalBtn")


openModalBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlay.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.remove('scale-75', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
      }, 10);
    });
  });

  // Modal tashqarisiga bosganda yopish
  modalOverlay.addEventListener('click', () => {
    modalContent.classList.add('scale-75', 'opacity-0');
    setTimeout(() => {
      modalOverlay.classList.add('hidden');
    }, 300);
  });

const form = document.querySelector('form[name="contact-form"]');

// Forma submit qilinganda
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Forma default yuborilishini to‘xtatamiz
  
    const nameInput = form.querySelector('input[name="your-name"]');
    const numberInput = form.querySelector('input[name="your-number"]');
  
    const nameValue = nameInput.value.trim();
    const numberValue = numberInput.value.trim();
  
    if (!nameValue && !numberValue) {
      alert("Ma'lumotlaringizni kiriting ❗️");
      return;
    }
  
    if (!nameValue) {
      alert("Iltimos, ismingizni yozing ❗️");
      return;
    }
  
    if (!numberValue) {
      alert("Iltimos, telefon raqamingizni yozib qoldiring ❗️");
      return;
    }
  
    if (numberValue.length < 9) {
      alert('Telefon raqamingizni qayta tekshiring ❗️');
      return;
    }
  
    // Google Script ga yuborish
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        alert('Muvaffaqiyatli yuborildi 🎉');
        modalOverlay.classList.add('hidden'); // Modalni yopish
        form.reset(); // Formani tozalash
      } else {
        alert('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring ⚠️');
      }
    })
    .catch(error => {
      alert('Tarmoq xatoligi yuz berdi ❗️');
    });
  });
  
  

  // Enter bosilganda ham submit bo‘lishi tabiiy (form ichida) — qo‘shimcha kod shart emas,
  // lekin faqat Enter ga ishlashini xohlasangiz, shuni ham yozib qo‘yaman:

  form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Default Enterni to‘xtatib
      form.querySelector('button[type="submit"]').click(); // Submit tugmasini bosamiz
    }
  });

  // Modalni tashqariga bosganda yopish
  modalOverlay.addEventListener('click', function() {
    modalOverlay.classList.add('hidden');
  });

  const TIMER_KEY = 'discount_timer_end';
  const DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

  // Tekshir: oldin saqlangan tugash vaqti bormi?
  let endTime = localStorage.getItem(TIMER_KEY);

  if (!endTime) {
    endTime = Date.now() + DURATION;
    localStorage.setItem(TIMER_KEY, endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function updateTimer() {
    const now = Date.now();
    let diff = endTime - now;

    if (diff <= 0) {
      document.getElementById('hours').textContent = "00";
      document.getElementById('minutes').textContent = "00";
      document.getElementById('seconds').textContent = "00";
      return;
    }

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  const interval = setInterval(() => {
    updateTimer();
    if (Date.now() >= endTime) {
      clearInterval(interval);
      localStorage.removeItem(TIMER_KEY);
    }
  }, 1000);