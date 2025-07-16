// Global değişkenler
let page = 0;
const limit = 5;
let loading = false;
let hasMorePosts = true;

// Sayfa yüklendiğinde çalışacak fonksiyon
$(document).ready(function () {
  // İlk postları yükle
  loadPosts();

  // Sayfa scroll eventini dinle
  $(window).scroll(function () {
    // Sayfanın sonuna yaklaşıldı mı kontrol et
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - 100
    ) {
      // Daha fazla post varsa ve şu anda yükleme yapılmıyorsa
      if (hasMorePosts && !loading) {
        loadPosts();
      }
    }
  });
});

// Postları yükleme fonksiyonu
function loadPosts() {
  // Yükleme durumunu güncelle
  loading = true;
  $('#loading').show();

  // API'den veri çekme
  $.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${
      page * limit
    }&_limit=${limit}`
  )
    .done(function (data) {
      // Eğer boş dizi dönerse daha fazla post yoktur
      if (data.length === 0) {
        hasMorePosts = false;
        $('#loading').hide();
        return;
      }

      // Postları ekrana ekle
      data.forEach(function (post) {
        $('#postContainer').append(`
                    <div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </div>
                `);
      });

      // Sonraki sayfa için sayaç artır
      page++;

      // Yükleme durumunu güncelle
      loading = false;
      $('#loading').hide();
    })
    .fail(function (error) {
      // Hata durumu
      $('#error').show();
      $('#loading').hide();
      console.error('API hatası:', error);
    });
}
