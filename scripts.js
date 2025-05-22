function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('mobile-menu').classList.add('hidden');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        form.reset();
      } else {
        alert('Ошибка при отправке. Попробуйте позже.');
      }
    })
    .catch(() => {
      alert('Ошибка при отправке. Попробуйте позже.');
    });
}

// Показ кнопки "Наверх"
window.addEventListener('scroll', () => {
  const button = document.getElementById('scroll-top');
  if (window.scrollY > 500) {
    button.classList.remove('hidden');
  } else {
    button.classList.add('hidden');
  }
});

// Загрузка данных
function loadData() {
  // Коты
  fetch('data/cats.json')
    .then(response => response.json())
    .then(cats => {
      const gallery = document.getElementById('cats-gallery');
      gallery.innerHTML = cats.map(cat => `
        <div class="bg-card rounded-lg overflow-hidden shadow-md hover-lift">
          <div class="relative h-64 overflow-hidden">
            <img src="${cat.imageUrl}" alt="${cat.name}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
            ${!cat.available ? '<div class="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm">Продан</div>' : ''}
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">${cat.name}</h3>
              <span class="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">${cat.gender}</span>
            </div>
            <p class="text-muted-foreground mb-2">Возраст: ${cat.age}</p>
            <p class="text-muted-foreground mb-4">${cat.description}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">${cat.price.toLocaleString()} ₽</span>
              <button class="bg-${cat.available ? 'primary' : 'muted'} text-${cat.available ? 'primary-foreground' : 'muted-foreground'} px-3 py-1 rounded-md text-sm ${cat.available ? 'hover:bg-primary/90' : ''}" ${!cat.available ? 'disabled' : ''}>
                ${cat.available ? 'Забронировать' : 'Продан'}
              </button>
            </div>
          </div>
        </div>
      `).join('');
    });

  // Преимущества
  fetch('data/advantages.json')
    .then(response => response.json())
    .then(advantages => {
      const gallery = document.getElementById('advantages-gallery');
      gallery.innerHTML = advantages.map(advantage => `
        <div class="bg-card rounded-lg p-6 shadow-md text-center hover-lift">
          <div class="w-16 h-16 mx-auto mb-4">
            <img src="${advantage.imageUrl}" alt="${advantage.title}" class="w-full h-full object-contain" />
          </div>
          <h3 class="text-xl font-bold mb-2">${advantage.title}</h3>
          <p class="text-muted-foreground">${advantage.description}</p>
        </div>
      `).join('');
    });

  // Отзывы
  fetch('data/testimonials.json')
    .then(response => response.json())
    .then(testimonials => {
      const gallery = document.getElementById('testimonials-gallery');
      gallery.innerHTML = testimonials.map(testimonial => `
        <div class="bg-card rounded-lg p-6 shadow-md hover-lift">
          <div class="flex items-center mb-4">
            ${testimonial.imageUrl ? `
              <img src="${testimonial.imageUrl}" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4 object-cover" />
            ` : `
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <span class="text-primary font-bold">${testimonial.name.charAt(0)}</span>
              </div>
            `}
            <div>
              <h3 class="font-bold">${testimonial.name}</h3>
              <div class="flex">
                ${Array.from({ length: 5 }, (_, i) => {
                  if (i < Math.floor(testimonial.rating)) {
                    return '<svg class="star star-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>';
                  } else if (i === Math.floor(testimonial.rating) && testimonial.rating % 1 >= 0.5) {
                    return '<svg class="star star-half" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>';
                  } else {
                    return '<svg class="star star-empty" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>';
                  }
                }).join('')}
              </div>
            </div>
          </div>
          <p class="text-muted-foreground">${testimonial.text}</p>
        </div>
      `).join('');
    });
}

// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', loadData);