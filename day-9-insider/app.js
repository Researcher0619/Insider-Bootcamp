// Statik JSON verisi
let studentData = [
  { name: 'Ali', class: '10A' },
  { name: 'Ayşe', class: '9B' },
];

// Sayfa yüklendiğinde listeyi oluştur
$(document).ready(function () {
  renderTable();

  // Form gönderildiğinde yeni öğrenci ekle
  $('#studentForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const cls = $('#class').val().trim();

    if (name && cls) {
      studentData.push({ name, class: cls });
      renderTable();
      this.reset();
    }
  });

  // Satıra tıklanınca rengi değiştir
  $('#studentTable tbody').on('click', 'tr', function () {
    $(this).toggleClass('selected');
  });

  // Öğrenciyi sil
  $('#studentTable tbody').on('click', '.delete-btn', function () {
    const index = $(this).data('index');
    studentData.splice(index, 1);
    renderTable();
  });
});

// Tabloyu güncelleyen fonksiyon
function renderTable() {
  const tbody = $('#studentTable tbody');
  tbody.empty();

  studentData.forEach((student, index) => {
    tbody.append(`
      <tr>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td><button class="delete-btn" data-index="${index}">Sil</button></td>
      </tr>
    `);
  });
}
