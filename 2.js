function hitungVoucher(voucher, totalBelanja, uangBayar) {
    let diskon = 0;
    let uangYangHarusDibayar = totalBelanja;

    if (voucher === 'DumbWaysJos') {
        // Ketentuan voucher DumbWaysJos
        if (totalBelanja >= 50000) {
            diskon = totalBelanja * 0.211; // Potongan 21.1%
            diskon = Math.min(diskon, 20000); // Maksimal diskon 20.000
        }
    } else if (voucher === 'DumbWaysMantap') {
        // Ketentuan voucher DumbWaysMantap
        if (totalBelanja >= 80000) {
            diskon = totalBelanja * 0.30; // Potongan 30%
            diskon = Math.min(diskon, 40000); // Maksimal diskon 40.000
        }
    }

    uangYangHarusDibayar = totalBelanja - diskon;
    let kembalian = uangBayar - uangYangHarusDibayar;

    // Menampilkan hasil
    console.log(`- Uang yang harus dibayar : ${uangYangHarusDibayar}`);
    console.log(`Diskon : ${diskon}`);
    console.log(`Kembalian : ${kembalian}`);
}

// Contoh penggunaan
hitungVoucher('DumbWaysJos', 100000, 100000); // Output: - Uang yang harus dibayar : 80000\nDiskon : 20000\nKembalian : 20000
hitungVoucher('DumbWaysMantap', 90000, 70000); // Output: - Uang yang harus dibayar : 63000\nDiskon : 27000\nKembalian : -10000
