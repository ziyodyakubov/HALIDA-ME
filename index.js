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

    // Google Script ga yuborish
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        // Success holati
        alert('Muvaffaqiyatli yuborildi!');
        modalOverlay.classList.add('hidden'); // Modalni yopish
        form.reset(); // Formani tozalash
      } else {
        alert('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
      }
    })
    .catch(error => {
      alert('Tarmoq xatoligi yuz berdi.');
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