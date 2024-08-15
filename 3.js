function recursiveBubbleSort(array, n) {
    // Basis dari rekursi: jika ukuran array adalah 1, tidak ada yang perlu dilakukan
    if (n <= 1) {
        return;
    }

    // Satu iterasi dari Bubble Sort untuk mengembalikan elemen terbesar ke akhir
    for (let i = 0; i < n - 1; i++) {
        if (array[i] > array[i + 1]) {
            // Tukar jika elemen saat ini lebih besar dari elemen berikutnya
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
        }
    }

    // Rekursif untuk menyortir bagian array yang tersisa
    recursiveBubbleSort(array, n - 1);
}

function sortArray(inputArray) {
    // Buat salinan array untuk menyimpan hasil yang sudah tersusun
    let sortedArray = [...inputArray];

    // Terapkan recursive bubble sort
    recursiveBubbleSort(sortedArray, sortedArray.length);

    // Pisahkan bilangan ganjil dan genap
    let ganjil = sortedArray.filter(num => num % 2 !== 0);
    let genap = sortedArray.filter(num => num % 2 === 0);

    // Output hasil
    console.log(`Array: ${sortedArray.join(', ')}`);
    console.log(`Ganjil: ${ganjil.join(', ')}`);
    console.log(`Genap: ${genap.join(', ')}`);
}

// Contoh penggunaan
sortArray([2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11]);
