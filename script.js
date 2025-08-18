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
  let message = `Halo, min! Saya ingin pesan:\nProduk: ${product}\nJumlah: ${quantity}\nDesain: ${type}\nCatatan: `;
  let waURL = "https://wa.me/6283811281941?text=" + encodeURIComponent(message);
  window.open(waURL, "_blank");
  orderModal.hide();
});

/* 🔹 Offline fallback untuk ulasan (baca dari localStorage kalau Firestore ga kebaca) */
function loadReviewsOffline() {
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  let list = document.getElementById('reviewList');
  if (!list) return;
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

// fallback load jika firebase gagal
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("reviewList").children.length === 0) {
      loadReviewsOffline();
    }
  }, 2000);
});
