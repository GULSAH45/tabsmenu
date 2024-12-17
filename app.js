// Global olarak tanımlanması gereken fonksiyonlar
window.addToCart = function (itemId, itemName, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

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

  const cartBtn = document.getElementById("cartBtn");
  cartBtn.classList.add("bounce");
  setTimeout(() => cartBtn.classList.remove("bounce"), 1000);
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

// Ana uygulama kodu
document.addEventListener("DOMContentLoaded", function () {
  // Müzik kontrolü kurulumu
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let isMusicPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", () => {
      if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove("playing");
      } else {
        bgMusic.play();
        musicToggle.classList.add("playing");
      }
      isMusicPlaying = !isMusicPlaying;
    });

    // Ses seviyesini ayarla
    bgMusic.volume = 0.3;
  }

  // Menü öğesi oluşturma fonksiyonu
  function createMenuItem(item, image) {
    const price =
      item.price || Math.floor(Math.random() * (800 - 200 + 1) + 200);
    const itemId = `${item.name.replace(/\s+/g, "-").toLowerCase()}`; // Benzersiz ID oluştur

    return `
      <div class="menu-item">
        <img src="${image}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="price-cart">
            <span class="price">${price} ₺</span>
            <button class="add-to-cart" onclick="addToCart('${itemId}', '${item.name}', ${price}, '${image}')">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Menü öğeleri ve açıklamaları
  const menuItems = {
    soups: [
      {
        name: "Tom Yum",
        description: "Tayland'ın meşhur ekşili baharatlı çorbası",
      },
      { name: "Ramen", description: "Özel ev yapımı noodle ve zengin et suyu" },
      { name: "Pho", description: "Vietnam'ın geleneksel çorbası" },
      { name: "Wonton Çorbası", description: "El yapımı mantı ve tavuk suyu" },
    ],
    starters: [
      {
        name: "Gyoza",
        description:
          "Çıtır tabanlı, buharda pişmiş Japon mantısı, özel ponzu sos ile",
      },
      {
        name: "Mongolian Chicken",
        description:
          "Tatlı-acı soslu, susamlı Moğol usulü tavuk, taze yeşilliklerle",
      },
    ],
    sushi: [
      { name: "Dragon Roll", description: "Yılan balığı ve avokado ile" },
      { name: "Rainbow Roll", description: "Karışık deniz mahsülleri" },
      { name: "Spicy Tuna Roll", description: "Baharatlı ton balığı" },
      { name: "Salmon Nigiri", description: "Taze somon ile" },
      { name: "California Roll", description: "Yengeç, avokado ve salatalık" },
    ],
    cocktails: [
      { name: "Sake Martini", description: "Japon sakesi ile" },
      { name: "Lychee Mojito", description: "Taze liçi meyvesi ile" },
      { name: "Matcha Sour", description: "Yeşil çay likörü ile" },
      { name: "Wasabi Mary", description: "Wasabi ile harmanlanmış kokteyl" },
      { name: "Yuzu Spritz", description: "Yuzu meyvesi ve prosecco ile" },
    ],
    desserts: [
      {
        name: "Tempura Dondurma",
        description:
          "Kızarmış çıtır tempura kaplamalı vanilyalı dondurma, karamel sos ile",
        price: "95₺",
      },
      {
        name: "Taiyaki Sundae",
        description:
          "Balık şeklinde waffle içinde vanilyalı dondurma, kırmızı fasulye ezmesi ve taze meyveler",
        price: "110₺",
      },
      {
        name: "Sakura Daifuku",
        description:
          "Kiraz çiçeği aromalı mochi içinde tatlı krem, sakura yaprakları ile süslenir",
        price: "90₺",
      },
    ],
  };

  // Menü görselleri
  const images = {
    soups: [
      "https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg",
      "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg",
      "https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg",
      "https://images.pexels.com/photos/2365945/pexels-photo-2365945.jpeg",
    ],
    starters: [
      "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    ],
    sushi: [
      "https://images.pexels.com/photos/858496/pexels-photo-858496.jpeg",
      "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
      "https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg",
      "https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg",
    ],
    cocktails: [
      "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg",
      "https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg",
      "https://images.pexels.com/photos/3407778/pexels-photo-3407778.jpeg",
      "https://images.pexels.com/photos/2531186/pexels-photo-2531186.jpeg",
      "https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg",
    ],
    desserts: [
      "https://images.pexels.com/photos/2792186/pexels-photo-2792186.jpeg", // Tempura Dondurma
      "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg", // Taiyaki Sundae
      "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg", // Sakura Daifuku
    ],
  };

  // Sepet öğeleri
  let cartItems = {};

  // Sepet fonksiyonları
  function openCartModal() {
    const modal = document.getElementById("cartModal");
    document.body.style.overflow = "hidden";
    modal.classList.add("active");
    updateCartDisplay();
  }

  function closeCartModal() {
    const modal = document.getElementById("cartModal");
    document.body.style.overflow = "";
    modal.classList.remove("active");
  }

  // Sepet görünümünü güncelle
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    let total = 0;

    cartItemsContainer.innerHTML = "";

    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (Object.keys(cart).length === 0) {
      cartItemsContainer.innerHTML = `
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
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
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
        cartItemsContainer.appendChild(itemElement);
      });
    }

    cartTotal.textContent = `₺${total.toFixed(2)}`;
    updateCartCount();
  }

  // Sepet sayısını güncelle
  function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const totalItems = Object.values(cart).reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "block" : "none";
  }

  // Tab içeriğini yükle
  function loadTabContent(category) {
    const container = document.getElementById(category);
    const items = menuItems[category];
    const menuHTML = items
      .map((item, index) => createMenuItem(item, images[category][index]))
      .join("");
    container.innerHTML = menuHTML;
  }

  // Tab işlevselliği
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Aktif tab'ı değiştir
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // İçeriği değiştir
      const tabId = button.getAttribute("data-tab");
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
        if (content.id === tabId) {
          content.classList.add("active");
          if (!content.innerHTML.trim()) {
            loadTabContent(tabId);
          }
        }
      });
    });
  });

  // İlk tab'ı yükle
  loadTabContent("soups");

  // Sayfa yüklendiğinde
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");

    // Sepet butonuna tıklama olayı ekle
    const cartBtn = document.getElementById("cartBtn");
    console.log("Cart button:", cartBtn);

    if (cartBtn) {
      cartBtn.onclick = function () {
        console.log("Cart button clicked");
        openCartModal();
      };
    }

    // Modal dışına tıklandığında kapat
    const cartModal = document.getElementById("cartModal");
    if (cartModal) {
      cartModal.addEventListener("click", function (e) {
        if (e.target === cartModal) {
          closeCartModal();
        }
      });
    }

    // Kapatma butonuna tıklandığında kapat
    const closeBtn = document.querySelector(".close-cart");
    if (closeBtn) {
      closeBtn.onclick = closeCartModal;
    }

    // İlk yüklemede sepet sayısını güncelle
    updateCartCount();
  });

  // Intersection Observer için animasyon
  const animateOnScroll = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Menü kartlarını gözlemle
    document.querySelectorAll(".menu-card").forEach((card) => {
      observer.observe(card);
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
    });

    // Lokasyon kartlarını gözlemle
    document.querySelectorAll(".location-info").forEach((loc) => {
      observer.observe(loc);
      loc.style.opacity = "0";
      loc.style.transform = "translateY(20px)";
    });
  };

  // Smooth scroll fonksiyonu
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top butonu
  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-to-top";
  scrollButton.innerHTML = "↑";
  document.body.appendChild(scrollButton);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Tab değişim animasyonu
  const animateTabChange = (oldTab, newTab) => {
    if (oldTab) {
      oldTab.style.opacity = "0";
      setTimeout(() => {
        oldTab.style.display = "none";
        newTab.style.display = "grid";
        setTimeout(() => {
          newTab.style.opacity = "1";
        }, 50);
      }, 300);
    } else {
      newTab.style.display = "grid";
      newTab.style.opacity = "1";
    }
  };

  // Sayfa yüklendiğinde animasyonları başlat
  document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll();

    // Sayfa geçiş animasyonu
    document.body.classList.add("page-transition");
  });

  // Login/Signup tab switching
  function switchTab(tab) {
    // Remove active class from all tabs and forms
    document
      .querySelectorAll(".auth-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".auth-form")
      .forEach((f) => f.classList.remove("active"));

    // Add active class to selected tab and form
    if (tab === "login") {
      document.querySelector(".auth-tab:first-child").classList.add("active");
      document.querySelector("#loginForm").classList.add("active");
    } else {
      document.querySelector(".auth-tab:last-child").classList.add("active");
      document.querySelector("#signupForm").classList.add("active");
    }
  }

  // Sayfa geçişleri için
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").endsWith(".html")) {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = this.getAttribute("href");
        }, 200);
      }
    });
  });

  // Sayfa yüklendiğinde
  document.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "1";
  });
});
