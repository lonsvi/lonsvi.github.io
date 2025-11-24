function initChart() {
  const ctx = document.getElementById('waterChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
      datasets: [{
        data: [1200,1450,1600,1100,1900,2100,1700],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76,175,80,0.1)',
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { display: false } }
    }
  });
}