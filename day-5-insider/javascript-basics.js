// Kullanıcı bilgilerini al ve nesnede sakla
const user = {
  name: prompt('Lütfen adınızı giriniz:'),
  age: prompt('Lütfen yaşınızı giriniz:'),
  profession: prompt('Lütfen mesleğinizi giriniz:'),
};

console.log('Kullanıcı Bilgileri:', user);

// Sepet için ürün dizisi
let cart = [];

// Başlangıçta bazı ürünler ekleyelim
cart.push({ name: 'Elma', price: 5 });
cart.push({ name: 'Ekmek', price: 3 });
cart.push({ name: 'Süt', price: 10 });

// Sepeti listeleme fonksiyonu
function listCart() {
  console.log('Sepetinizdeki Ürünler:');
  cart.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - ${product.price} TL`);
  });
}

// Toplam fiyatı hesaplama (reduce kullanarak)
function calculateTotal() {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  console.log(`Toplam Fiyat: ${total} TL`);
  return total;
}

// Ürün ekleme fonksiyonu
function addProduct() {
  const name = prompt('Eklemek istediğiniz ürünün adı:');
  const price = parseFloat(prompt('Ürünün fiyatı:'));

  if (name && !isNaN(price)) {
    cart.push({ name, price });
    console.log(`${name} sepete eklendi.`);
  } else {
    console.log('Geçersiz giriş!');
  }
}

// Ürün çıkarma fonksiyonu
function removeProduct() {
  listCart();
  const index =
    parseInt(prompt('Çıkarmak istediğiniz ürünün numarasını girin:')) - 1;

  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    console.log(`${removed[0].name} sepetten çıkarıldı.`);
  } else {
    console.log('Geçersiz ürün numarası!');
  }
}

// Kullanıcı etkileşimi
while (true) {
  const choice = prompt(`
    Ne yapmak istersiniz?
    1. Sepeti Görüntüle
    2. Toplam Fiyatı Hesapla
    3. Ürün Ekle
    4. Ürün Çıkar
    5. Çıkış
    
    Seçiminiz (1-5):`);

  switch (choice) {
    case '1':
      listCart();
      break;
    case '2':
      calculateTotal();
      break;
    case '3':
      addProduct();
      break;
    case '4':
      removeProduct();
      break;
    case '5':
      console.log('Çıkış yapılıyor...');
      // Programı sonlandırmak için döngüden çık
      throw new Error('Program sonlandırıldı');
    default:
      console.log('Geçersiz seçim! Lütfen 1-5 arasında bir sayı girin.');
  }
}
