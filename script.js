let orderModal = new bootstrap.Modal(document.getElementById('orderModal'));

const productTemplates = {
    "Keychain Custom": ["Spotify", "Ucapan", "Custom Desain"],
    "Keychain Strip Custom": ["Scrapbook", "Custom Desain"],
    "Stiker e-Money Custom": ["Sim Spongebob", "Dino", "Custom Desain"]
};

function openOrderForm(productName) {
    document.getElementById('orderProduct').value = productName;

    let select = document.getElementById('orderType');
    select.innerHTML = ''; // reset
    select.appendChild(new Option("Pilih...", ""));
    productTemplates[productName].forEach(t => {
        select.appendChild(new Option(t, t));
    });

    orderModal.show();
}

// Form pemesanan
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let product = document.getElementById('orderProduct').value;
    let quantity = document.getElementById('orderQuantity').value;
    let type = document.getElementById('orderType').value;
    let message = `Halo, min saya nama: \nSaya ingin pesan:\nProduk: ${product}\nJumlah: ${quantity}\nDesain: ${type}\nCatatan: `;
    let waURL = "https://wa.me/6283811281941?text=" + encodeURIComponent(message);
    window.open(waURL, "_blank");
    orderModal.hide();
});

/* =====================
   Ulasan Pembeli (Google Sheets)
   ===================== */

function loadReviews() {
    let list = document.getElementById('reviewList');
    list.innerHTML = '';

    // Ambil data dari Google Sheets (opsional jika mau menampilkan)
    fetch("https://script.google.com/macros/s/AKfycbzSqQEUt5B4TSmbCglxQYp_-wJg-EdGcM8fWeRtu1Jg2upzZWw6tE-wKdDQufWizNPt/exec?read=true") // kalau mau menampilkan ulasan dari sheet
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach(r => {
                let col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card shadow-sm p-3">
                        <p>"${r.ulasan}"</p>
                        <small class="text-muted">- ${r.nama}</small>
                    </div>
                `;
                list.appendChild(col);
            });
        })
        .catch(err => console.error("Gagal memuat ulasan:", err));
}

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let nama = document.getElementById('reviewName').value;
    let ulasan = document.getElementById('reviewText').value;

    fetch("https://script.google.com/macros/s/AKfycbzSqQEUt5B4TSmbCglxQYp_-wJg-EdGcM8fWeRtu1Jg2upzZWw6tE-wKdDQufWizNPt/exec", {
        method: "POST",
        body: JSON.stringify({ nama, ulasan }),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") {
            alert("Terima kasih atas ulasannya!");
            document.getElementById('reviewForm').reset();
            loadReviews(); // refresh list
        } else {
            alert("Gagal mengirim ulasan.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Terjadi kesalahan saat mengirim ulasan.");
    });
});

// Load ulasan saat halaman dibuka
loadReviews();
