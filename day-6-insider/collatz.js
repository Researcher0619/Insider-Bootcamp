function findLongestCollatz(limit) {
  let maxLength = 0;
  let startingNumber = 0;

  // Önbellek (cache) kullanarak performansı artırıyoruz
  const cache = {};

  for (let i = 1; i < limit; i++) {
    let length = 0;
    let n = i;

    while (n !== 1) {
      // Önbellekte varsa kullan
      if (cache[n]) {
        length += cache[n];
        break;
      }

      // Collatz kurallarını uygula
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      length++;
    }

    // 1'i de sayıyoruz
    length++;
    cache[i] = length;

    // En uzun zinciri güncelle
    if (length > maxLength) {
      maxLength = length;
      startingNumber = i;
    }
  }

  return startingNumber;
}

// 1 milyondan küçük sayılar için çözüm
const result = findLongestCollatz(1000000);
console.log(`En uzun zinciri oluşturan başlangıç sayısı: ${result}`);
