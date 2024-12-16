document.addEventListener("DOMContentLoaded", function () {
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
  };

  // Menü öğesi HTML'ini oluştur
  function createMenuItem(item, image) {
    return `
      <div class="menu-item">
        <img src="${image}" alt="${item.name}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="price">${Math.floor(
            Math.random() * (800 - 200 + 1) + 200
          )} ₺</span>
        </div>
      </div>
    `;
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

  // Müzik kontrolü için
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  musicToggle.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    }
  });
});
