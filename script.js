let orderModal = new bootstrap.Modal(document.getElementById('orderModal'));

const productTemplates = {
    "Keychain Custom": ["Spotify", "Ucapan", "Custom Desain"],
    "Keychain Strip Custom": ["Scrapbook", "Custom Desain"],
    "Stiker e-Money Custom": ["Sim Spongebob", "Dino", "Custom Desain"]
};

function openOrderForm(productName) {
    document.getElementById('orderProduct').value = productName;

    let select = document.getElementById('orderType');
    select.innerHTML = '';
    select.appendChild(new Option("Pilih...", ""));
    productTemplates[productName].forEach(t => {
        select.appendChild(new Option(t, t));
    });

    orderModal.show();
}

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

/* --- Ulasan Pembeli via Google Sheets --- */
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzSqQEUt5B4TSmbCglxQYp_-wJg-EdGcM8fWeRtu1Jg2upzZWw6tE-wKdDQufWizNPt/exec"; // Ganti dengan URL Web App kamu

// Load review dari Google Sheets
async function loadReviews() {
    try {
        let res = await fetch(WEB_APP_URL + "?action=get");
        let reviews = await res.json();
        let list = document.getElementById('reviewList');
        list.innerHTML = '';
        reviews.forEach(r => {
            let col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card shadow-sm">
                    <p>"${r.text}"</p>
                    <small class="text-muted">- ${r.name}</small>
                </div>
            `;
            list.appendChild(col);
        });
    } catch (err) {
        console.error("Gagal load ulasan", err);
    }
}

// Submit review ke Google Sheets
document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (localStorage.getItem('hasReviewed')) {
        alert('Kamu sudah pernah memberikan ulasan.');
        return;
    }

    let name = document.getElementById('reviewName').value;
    let text = document.getElementById('reviewText').value;

    try {
        let res = await fetch(WEB_APP_URL + "?action=add", {
            method: "POST",
            body: JSON.stringify({ name, text }),
            headers: { "Content-Type": "application/json" }
        });
        let result = await res.json();
        if (result.status === "success") {
            localStorage.setItem('hasReviewed', 'true');
            loadReviews();
            document.getElementById('reviewForm').reset();
            alert('Terima kasih atas ulasannya!, Jangan lupa beli lagi yaa!');
        } else {
            alert("Gagal mengirim ulasan");
        }
    } catch (err) {
        console.error("Error kirim ulasan", err);
    }
});

loadReviews();
