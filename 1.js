function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) { // Periksa faktor dari 5 hingga akar kuadrat n
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function Generate(number) {
    const primes = [];
    let n = 2;
    while (primes.length < number) {
        if (isPrime(n)) primes.push(n);
        n++;
    }
    return primes;

}

function printTriangle(base) {
    if (base <= 0 || base >= 10) {
        alert("input salah");
        return;

    }

    const primes = Generate(base * base);
    let index = 0;

    for (let i = base; i > 0; i--) {
        let line = '';
        for (let j = 0; j < i; j++) {
            line += primes[index++] + ' ';

        }
        console.log(line);  // Cetak baris, menghapus spasi ekstra di akhir

    }
}
var p = prompt("masukkan angka 1 - 9");

printTriangle(p);
