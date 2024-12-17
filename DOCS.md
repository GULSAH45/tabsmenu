# Tabs Menü Projesi Dokümantasyonu

## Proje Genel Bakış

Tabs Menü, modern bir restoran zinciri için geliştirilmiş interaktif bir web uygulamasıdır. Kullanıcılar menüyü görüntüleyebilir, sepete ürün ekleyebilir ve farklı lokasyonları harita üzerinde inceleyebilir.

## Proje Yapısı

```
tabsmenu/
├── index.html          # Ana sayfa
├── location.html       # Lokasyonlar sayfası
├── menu.html          # Menü sayfası
├── app.js             # Ana JavaScript dosyası
├── location.css       # Lokasyon sayfası stilleri
└── style.css          # Genel stiller
```

## Temel Özellikler

### 1. Menü Sistemi
- Kategorilere ayrılmış menü kartları
- Dinamik fiyatlandırma
- Sepet yönetimi
- Arama ve filtreleme

### 2. Lokasyon Yönetimi
- Interaktif harita (Leaflet.js)
- Özelleştirilmiş konum işaretçileri
- Lokasyon detayları
- Smooth scroll navigasyon

### 3. Sepet Sistemi
- Ürün ekleme/çıkarma
- Miktar güncelleme
- Toplam fiyat hesaplama
- Local storage entegrasyonu

## Teknik Detaylar

### JavaScript Fonksiyonları

#### `updateCartDisplay()`
```javascript
// Sepeti günceller ve görüntüler
// Local storage ile senkronize eder
```

#### `addToCart(item)`
```javascript
// Yeni ürün ekler
// Miktarı günceller
// Fiyatı hesaplar
```

#### `initMap()`
```javascript
// Leaflet haritasını başlatır
// Konum işaretçilerini ekler
// Popup'ları yapılandırır
```

### CSS Yapısı

#### Tema Renkleri
```css
:root {
  --primary-color: #d4af37;
  --secondary-color: #1a1a1a;
  --text-color: #ffffff;
}
```

#### Responsive Breakpoints
```css
/* Mobile: 0-768px */
/* Tablet: 769px-1024px */
/* Desktop: 1025px+ */
```

## API Entegrasyonları

### Leaflet.js
- Versiyon: Son kararlı sürüm
- Özelleştirilmiş dark tema
- Custom marker ve popup'lar

## Performans Optimizasyonları

1. Lazy Loading
   - Görüntüler için loading="lazy"
   - JavaScript modülleri için dynamic import

2. CSS Optimizasyonları
   - CSS containment
   - will-change optimizasyonu
   - Critical CSS

3. JavaScript Optimizasyonları
   - Event delegation
   - Debounced event handlers
   - Efficient DOM manipülasyonu

## Güvenlik Önlemleri

1. Content Security Policy (CSP)
2. XSS koruması
3. CORS yapılandırması
4. Input validasyonu

## Deployment

1. Statik dosyaların CDN üzerinden sunulması
2. Gzip/Brotli sıkıştırma
3. Cache stratejileri
4. SSL/TLS yapılandırması

## Bakım ve Güncelleme

### Versiyon Kontrol
- Semantic versioning
- Git branching stratejisi
- Deployment workflow

### Hata Ayıklama
- Console logging stratejisi
- Error tracking
- Performance monitoring

## Gelecek Geliştirmeler

1. PWA desteği
2. Çoklu dil desteği
3. Online ödeme entegrasyonu
4. Kullanıcı hesapları
5. Sipariş takip sistemi

## Katkıda Bulunma

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Create pull request

## Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.
