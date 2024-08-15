function isPrime(num) {


    // Periksa faktor dari 5 hingga akar kuadrat num
    for (let i = 5; i * i <= num; i += 6) {
        console.log(i);

    }

    return true;  // Jika tidak ada faktor ditemukan, num adalah bilangan prima
}

// Contoh penggunaan
console.log(isPrime(7));  // true
console.log(isPrime(40)); // false

for (let i = 5; i * i <= 7; i += 6) {
    console.log(1);

}
