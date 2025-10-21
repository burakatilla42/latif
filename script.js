document.getElementById('year').textContent = new Date().getFullYear();

// Cart logic
const cart = [];

function renderCart(){
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('cartTotal');
  list.innerHTML = '';
  let total = 0;
  cart.forEach((it, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${it.name} x${it.qty}</span><strong>${it.price*it.qty} TL</strong>`;
    list.appendChild(li);
    total += it.price*it.qty;
  });
  totalEl.textContent = cart.length ? 'Toplam: ' + total + ' TL' : 'Sepet boş.';
}

document.querySelectorAll('.menu-item .add').forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    const item = e.target.closest('.menu-item');
    const name = item.dataset.name;
    const price = parseInt(item.dataset.price, 10);
    // Eğer aynı ürün varsa qty artır
    const existing = cart.find(c=>c.name===name);
    if(existing) existing.qty += 1;
    else cart.push({name, price, qty:1});
    renderCart();
  });
});

function handleOrder(e){
  e.preventDefault();
  if(cart.length === 0){
    alert('Lütfen önce sepete ürün ekleyin.');
    return false;
  }
  const form = e.target;
  const name = form.name.value.trim();
  const address = form.address.value.trim();
  const phone = form.phone.value.trim();
  const note = form.note.value.trim();

  // Build message
  let msg = 'Yeni sipariş%0A';
  msg += 'İsim: ' + encodeURIComponent(name) + '%0A';
  msg += 'Telefon: ' + encodeURIComponent(phone) + '%0A';
  msg += 'Adres: ' + encodeURIComponent(address) + '%0A%0A';
  msg += 'Sipariş:%0A';

  let total = 0;
  cart.forEach(it => {
    msg += '- ' + encodeURIComponent(it.name) + ' x' + it.qty + ' = ' + (it.price*it.qty) + ' TL%0A';
    total += it.price*it.qty;
  });

  msg += '%0AToplam: ' + total + ' TL%0A';
  if(note) msg += '%0ANot: ' + encodeURIComponent(note) + '%0A';

  // WhatsApp link (Turkey: +90 538 022 3442)
  const waNumber = '905380223442';
  const waUrl = 'https://wa.me/' + waNumber + '?text=' + msg;
  window.open(waUrl, '_blank');
  return false;
}
