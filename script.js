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

/* Ulasan Pembeli */
function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
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
}

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (localStorage.getItem('hasReviewed')) {
        alert('Kamu sudah pernah memberikan ulasan.');
        return;
    }
    let name = document.getElementById('reviewName').value;
    let text = document.getElementById('reviewText').value;
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push({name, text});
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('hasReviewed', 'true');
    loadReviews();
    document.getElementById('reviewForm').reset();
    alert('Terima kasih atas ulasannya!,Jangan lupa beli lagi yaa!');
});

loadReviews();
