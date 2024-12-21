window.addToCart = function (itemId, itemName, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  const minusButton = quantityElement.previousElementSibling;
  const isFirstItem = Object.keys(cart).length === 0; // Sepet boş mu kontrol et

  if (cart[itemId]) {
    cart[itemId].quantity += 1;
  } else {
    cart[itemId] = {
      name: itemName,
      price: parseFloat(price),
      image: image,
      quantity: 1,
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();

  // Miktar göstergesini güncelle
  quantityElement.textContent = cart[itemId].quantity;
  minusButton.classList.add("active");

  const cartBtn = document.getElementById("cartBtn");
  cartBtn.classList.add("bounce");
  setTimeout(() => cartBtn.classList.remove("bounce"), 1000);

  // İlk ürün eklendiyse sepeti aç
  if (isFirstItem) {
    toggleCart();
  }
};

window.updateQuantity = function (itemId, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (newQuantity <= 0) {
    delete cart[itemId];
  } else {
    cart[itemId].quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
};

// Login/Signup modal için tab değiştirme
function switchAuthTab(tabName) {
  document.querySelectorAll(".auth-form").forEach((form) => {
    form.classList.remove("active");
  });
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(tabName + "Form").classList.add("active");
  event.target.classList.add("active");
}

// menü kısmındaki tablar. Tab işlevselliği için
//tek bir fonksiyon kullanacağız
function switchTab(tabId) {
  // Tüm tab içeriklerini gizle
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Tüm tab butonlarının aktif sınıfını kaldır
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });

  // Seçilen tab'ı ve butonunu aktif yap
  const selectedTab = document.getElementById(tabId);
  const selectedButton = document.querySelector(
    `.tab-button[data-tab="${tabId}"]`
  );

  if (selectedTab) {
    selectedTab.classList.add("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  }

  // Menü öğelerini render et
  if (selectedTab) {
    selectedTab.innerHTML = ""; // Mevcut içeriği temizle
    menuItems[tabId].forEach((item) => {
      selectedTab.innerHTML += createMenuItem(item, item.image);
    });
  }
}

// Menü öğesi oluşturma fonksiyonu
function createMenuItem(item, image) {
  const itemId = `${item.name.replace(/\s+/g, "-").toLowerCase()}`;
  return `
    <div class="menu-item">
      <img src="${image}" alt="${item.name}" >
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price-cart">
          <span class="price">${item.price}</span>
          <div class="quantity-controls">
            <button class="quantity-btn minus" onclick="decreaseQuantity('${itemId}')">
              <i class="fas fa-minus"></i>
            </button>
            <span id="quantity-${itemId}" class="quantity">0</span>
            <button class="quantity-btn plus" onclick="addToCart('${itemId}', 
            '${item.name}', '${item.price}', '${image}')">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Menü öğeleri ve açıklamaları - tek bir menü verisi kullanacağız
const menuItems = {
  soups: [
    {
      name: "Miso Çorbası",
      description:
        "Geleneksel Japon dashi suyu, tofu, wakame yosunu ve yeşil soğan",
      price: "120 ₺",
      image: "./images/miso.jpg",
    },
    {
      name: "Ramen",
      description:
        "Zengin tonkotsu et suyu, chashu domuz eti, ajitsuke yumurta ve taze noodle",
      price: "180 ₺",
      image: "./images/ramen.jpg",
    },
    {
      name: "Tom Yum Kung",
      description:
        "Tayland'ın meşhur ekşili-baharatlı karides çorbası, mantar ve limon otu",
      price: "160 ₺",
      image: "./images/tomyung.jpg",
    },
    {
      name: "Pho Bo",
      description:
        "Vietnam'ın geleneksel çorbası, dana eti, taze otlar ve pirinç erişte",
      price: "150 ₺",
      image: "./images/phobo.jpg",
    },
  ],
  starters: [
    {
      name: "Gyoza",
      description:
        "Çıtır tabanlı, buharda pişmiş Japon mantısı, özel ponzu sos ile",
      price: "140 ₺",
      image: "./images/gyoza.jpg",
    },
    {
      name: "Dim Sum",
      description:
        "Çeşitli iç malzemelerle hazırlanmış geleneksel Çin mantısı, özel sos ile",
      price: "160 ₺",
      image: "./images/dimsum.jpg",
    },
  ],
  sushi: [
    {
      name: "Dragon Roll",
      description:
        "Karides tempura, yılan balığı, avokado ve unagi sos ile kaplanmış özel roll",
      price: "280 ₺",
      image: "./images/dragon.jpg",
    },
    {
      name: "Rainbow Roll",
      description:
        "Kaliforniya roll üzeri çeşitli taze deniz mahsülleri ile kaplanmış özel suşi",
      price: "260 ₺",
      image: "./images/rainbow.jpg",
    },
    {
      name: "Spicy Tuna Roll",
      description:
        "Baharatlı ton balığı, avokado ve Japonya'dan özel baharatlar",
      price: "240 ₺",
      image: "./images/spicy-tuna.jpg",
    },
  ],
  cocktails: [
    {
      name: "Yuzu Spirit",
      description:
        "Japon yuzu meyvesi, sake, premium cin ve taze nane yaprakları ile hazırlanan serinletici kokteyl",
      price: "180 ₺",
      image: "./images/yuzu.jpg",
    },
  ],
  desserts: [
    {
      name: "Tempura Dondurma",
      description:
        "Sıcak-soğuk kontrastı ile büyüleyen, kızarmış tempura hamuru içinde vanilyalı dondurma",
      price: "140 ₺",
      image: "./images/tempuraice.jpg",
    },
    {
      name: "Mochi",
      description:
        "Geleneksel Japon tatlısı, pirinç hamuru içinde çeşitli dolgular (matcha, çilek, mango)",
      price: "120 ₺",
      image: "./images/mochi.jpg",
    },
  ],
};

// // Japon atasözleri listesi
// const japaneseProverbs = [
//   {
//     japanese: "和の味、心の調和",
//     meaning: "Harmony of Japanese Flavors, Peace of Mind",
//   },
//   {
//     japanese: "一期一会",
//     meaning: "Her karşılaşma bir kez yaşanır",
//   },
//   {
//     japanese: "温故知新",
//     meaning: "Eskiyi öğrenerek yeniyi anlamak",
//   },
//   {
//     japanese: "七転び八起き",
//     meaning: "Yedi kez düş, sekiz kez kalk",
//   },
//   {
//     japanese: "和気藹々",
//     meaning: "Uyumlu ve neşeli atmosfer",
//   },
//   {
//     japanese: "笑門来福",
//     meaning: "Gülümseyen kapıdan şans girer",
//   },
//   {
//     japanese: "千里の道も一歩から",
//     meaning: "Bin millik yolculuk tek adımla başlar",
//   },
//   {
//     japanese: "花鳥風月",
//     meaning: "Doğanın güzelliği (çiçek, kuş, rüzgar, ay)",
//   },
// ];

let currentProverbIndex = 0;

async function changeProverb() {
  const proverbElement = document.getElementById("proverb");
  // currentProverbIndex = (currentProverbIndex + 1) % japaneseProverbs.length;
  // const newProverb = japaneseProverbs[currentProverbIndex];

  const oldProverbs = localStorage.getItem("old-proverbs") ?? "[]";

  const parsedVerbs = JSON.parse(oldProverbs);
  const apiKey = "AIzaSyAOvDQki1LryqXxO6_Yz9oIlBhyu4fK324";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: {
          parts: [
            {
              text: `
          Sen artık japonca atasözü dönen bir AI asistansın.
          Bana sadece rastgele bir japonca atasözü dön.
          Bu atasözü gerçek atasözü olsun.
          ${parsedVerbs.join(
            ", "
          )} bunlar bana eskiden verdiklerin. Bunlardan biri olmasin.
          Bana bunu japonca ve türkçe dön.
          Bu iki dilde dönüşü || karakteriyle ayır.
          Sadece bunu dön başka hiçbir şey ekleme.
        `,
            },
          ],
        },
      }),
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(data);
    const lngs = text.split("||");
    const jpn = lngs[0];
    const trk = lngs[1];
    localStorage.setItem(
      "old-proverbs",
      JSON.stringify([...JSON.parse(oldProverbs), jpn])
    );
    // Fade out efekti
    proverbElement.style.opacity = "0";

    setTimeout(() => {
      proverbElement.innerHTML = `${jpn}<br>
  <span class="proverb-meaning">${trk}</span>`;
      // Fade in efekti
      proverbElement.style.opacity = "1";
    }, 500);
  } catch (error) {
    console.log("Proverb değiştirirken bir hata oluştu:", error);
  }
}
changeProverb();
// Ana uygulama kodu
document.addEventListener("DOMContentLoaded", () => {
  const setupMusicControl = () => {
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (!musicToggle || !bgMusic) return;

    bgMusic.volume = 0.3;
    musicToggle.onclick = async () => {
      try {
        bgMusic.paused ? await bgMusic.play() : bgMusic.pause();
        musicToggle.classList.toggle("playing");
      } catch (error) {
        console.log("Müzik kontrolü hatası:", error);
      }
    };
  };

  setupMusicControl();

  // Tab butonlarına click event listener ekle
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Sayfa yüklendiğinde çorba tab'ını aç
  switchTab("soups");

  // Sepet sayısını güncelle
  updateCartCount();
});

// Sepet butonuna tıklama olayı
document.getElementById("cartBtn").addEventListener("click", function () {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""; // Önceki ürünleri temizle

  // Sepet içeriğini güncelle
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let total = 0;

  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Sepetiniz boş</p>
            </div>
        `;
  } else {
    Object.keys(cart).forEach((itemId) => {
      const item = cart[itemId];
      total += item.price * item.quantity;

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₺${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${itemId}', ${
        item.quantity - 1
      })">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${itemId}', ${
        item.quantity + 1
      })">+</button>
                    </div>
                </div>
            `;
      cartItems.appendChild(itemElement);
    });
  }

  // Sepet sayısını güncelle
  updateCartCount();
});

// Sepet sayısını güncelleyen fonksiyonu ekleyelim
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? "block" : "none";
  }
}

// Yardımcı fonksiyonlar
const CartHelper = {
  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || {};
  },

  setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  updateCount() {
    const cart = this.getCart();
    const count = Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? "block" : "none";
    }
  },

  createItemHTML(item, itemId) {
    // Ortak HTML template
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price-controls">
            <div class="cart-item-price">${item.price} ₺</div>
            <div class="cart-controls">
              <div class="quantity-controls">
                <button class="quantity-btn minus ${
                  item.quantity > 1 ? "active" : ""
                }" onclick="decreaseQuantity('${itemId}')">
                  <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="addToCart('${itemId}', '${
      item.name
    }', '${item.price}', '${item.image}')">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <button class="delete-item" onclick="removeFromCart('${itemId}')" title="Ürünü Sil">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cart = CartHelper.getCart();
  let total = 0;

  cartItems.innerHTML =
    Object.keys(cart).length === 0
      ? '<div class="empty-cart-message">Sepetiniz boş</div>'
      : Object.entries(cart)
          .map(([itemId, item]) => {
            total += item.price * item.quantity;
            return CartHelper.createItemHTML(item, itemId);
          })
          .join("");

  cartTotal.textContent = `${total.toFixed(2)} ₺`;
}

function decreaseQuantity(itemId) {
  const cart = CartHelper.getCart();
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  const minusButton = quantityElement.previousElementSibling;

  if (cart[itemId]?.quantity > 0) {
    cart[itemId].quantity -= 1;

    if (cart[itemId].quantity === 0) {
      delete cart[itemId];
      minusButton.classList.remove("active");
    } else {
      minusButton.classList.add("active");
    }

    CartHelper.setCart(cart);
    updateCartDisplay();
    CartHelper.updateCount();

    quantityElement.textContent = cart[itemId]?.quantity || 0;
  }
}

function toggleCart() {
  const cartContent = document.querySelector(".cart-content");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartBtn = document.getElementById("cartBtn");
  const mainContainer = document.querySelector(".container");

  // Sepet açıksa kapat
  if (cartContent.classList.contains("active")) {
    cartContent.style.transform = "translateX(100%)";
    cartContent.style.opacity = "0";
    cartOverlay.style.opacity = "0";

    setTimeout(() => {
      cartContent.classList.remove("active");
      cartOverlay.classList.remove("active");
      cartContent.style.visibility = "hidden";
      // Ana içeriğin padding ve margin'ini kaldır
      mainContainer.style.paddingRight = "";
      mainContainer.style.marginRight = "";
    }, 300);
  }
  // Sepet kapalıysa aç
  else {
    cartContent.style.visibility = "visible";
    cartContent.classList.add("active");
    cartOverlay.classList.add("active");
    // Scroll çubuğu genişliği + 20px kadar padding ekle
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    mainContainer.style.paddingRight = `${scrollbarWidth}px`;
    mainContainer.style.marginRight = "20px";

    setTimeout(() => {
      cartContent.style.transform = "translateX(0)";
      cartContent.style.opacity = "1";
      cartOverlay.style.opacity = "1";
    }, 10);
  }

  // Sepet butonuna tıklandığında aktif class'ı ekle/çıkar
  cartBtn.classList.toggle("active");
}

// Overlay'e tıklandığında sepeti kapat
document.querySelector(".cart-overlay").addEventListener("click", toggleCart);

function updateQuantityDisplay(itemId, quantity) {
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  quantityElement.textContent = quantity;
  quantityElement.classList.add("changed");
  setTimeout(() => quantityElement.classList.remove("changed"), 300);
}

function clearCart() {
  if (confirm("Sepetteki tüm ürünleri silmek istediğinize emin misiniz?")) {
    localStorage.removeItem("cart");
    updateCartDisplay();
    updateCartCount();

    // Tüm miktar göstergelerini sıfırla
    document.querySelectorAll(".quantity").forEach((el) => {
      el.textContent = "0";
    });

    // Tüm eksi butonları devre dışı bırak
    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.classList.remove("active");
    });
  }
}

function goToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (Object.keys(cart).length === 0) {
    alert("Sepetiniz boş!");
    return;
  }
  // Buraya ödeme sayfasına yönlendirme eklenecek
  alert("Ödeme sayfasına yönlendiriliyorsunuz...");
  // window.location.href = "/checkout.html";
}

function removeFromCart(itemId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[itemId]) {
    delete cart[itemId];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Menüdeki miktar göstergesini sıfırla
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    if (quantityElement) {
      quantityElement.textContent = "0";
      const minusButton = quantityElement.previousElementSibling;
      if (minusButton) {
        minusButton.classList.remove("active");
      }
    }

    updateCartDisplay();
    updateCartCount();
  }
}
