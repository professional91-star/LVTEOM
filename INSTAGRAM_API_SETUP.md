# Instagram API Entegrasyonu Rehberi

## 🔧 Gerçek Instagram Verilerini Entegre Etme

### 1. Instagram Developer Hesabı Oluşturma

1. **Facebook Developers'a gidin**: https://developers.facebook.com/
2. **Hesap oluşturun** veya mevcut Facebook hesabınızla giriş yapın
3. **"Uygulama Oluştur"** butonuna tıklayın
4. **"Diğer"** > **"Sonraki"** seçeneklerini seçin
5. **Uygulama türü**: "İş" seçin
6. **Uygulama detayları**:
   - **Uygulama adı**: "LVT Elektrik Instagram Integration"
   - **E-posta**: İş e-posta adresiniz
   - **Kategori**: "İş ve Endüstri"

### 2. Instagram Basic Display API Ayarları

1. **Ürünler** bölümünden **"Instagram Basic Display"** ekleyin
2. **"Instagram Basic Display" > "Temel Ayarlar"** bölümüne gidin
3. **OAuth Redirect URI'leri** ekleyin:
   ```
   https://yourdomain.com/
   http://localhost:3000/
   ```

### 3. Test Kullanıcıları Ekleme

1. **"Roller" > "Roller"** bölümüne gidin
2. **"Instagram Test Kullanıcıları"** bölümünde **"Ekle"** butonuna tıklayın
3. Instagram kullanıcı adınızı ekleyin: **"lvtelektrikotomasyon"**
4. Davet e-postasını onaylayın

### 4. API Anahtarlarını Alma

1. **"Temel Ayarlar"** bölümünden şu bilgileri alın:
   - **Instagram App ID** (Client ID)
   - **Instagram App Secret** (Client Secret)

### 5. Kodda Güncelleme

`js/script.js` dosyasında aşağıdaki satırları güncelleyin:

```javascript
// Satır ~656 civarında
const clientId = 'YOUR_INSTAGRAM_APP_ID'; // Buraya Instagram App ID'nizi yazın

// Satır ~683 civarında
body: new URLSearchParams({
    client_id: 'YOUR_INSTAGRAM_APP_ID',        // Buraya Instagram App ID'nizi yazın
    client_secret: 'YOUR_INSTAGRAM_APP_SECRET', // Buraya Instagram App Secret'ınızı yazın
    // ... diğer parametreler
})
```

### 6. Güvenlik Notları

⚠️ **ÖNEMLİ**: 
- **Client Secret**'ı asla frontend kodunda kullanmayın!
- Gerçek projede backend sunucu kullanın
- API anahtarlarını environment variables olarak saklayın

### 7. Alternatif Çözüm: Backend Proxy

Daha güvenli bir çözüm için backend proxy oluşturun:

```javascript
// Backend endpoint örneği (Node.js)
app.get('/api/instagram-feed', async (req, res) => {
    try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Instagram verisi alınamadı' });
    }
});
```

### 8. Demo Verilerin Güncellenesi

Şu anda sistem demo verilerle çalışıyor. Instagram API kurulumu tamamlanana kadar bu veriler kullanılacak:

- ✅ **Profil bilgileri**: @lvtelektrikotomasyon
- ✅ **6 demo paylaşım**: Elektrik, otomasyon ve SCADA konularında
- ✅ **Beğeni/yorum sayıları**: Rastgele gerçekçi sayılar
- ✅ **Tıklanabilir linkler**: Instagram profilinize yönlendirme

### 9. Otomatik Güncelleme

Instagram verileri için otomatik güncelleme aktifleştirmek için:

```javascript
// js/script.js dosyasının sonunda
document.addEventListener('DOMContentLoaded', () => {
    const instagramAPI = new InstagramAPI();
    
    // Bu satırın yorumunu kaldırın:
    instagramAPI.startAutoRefresh(); // 5 dakikada bir günceller
});
```

### 10. Sorun Giderme

**Instagram API çalışmıyor mu?**
- Uygulama durumunu kontrol edin (Canlı mı?)
- OAuth yönlendirme URL'lerini doğrulayın
- Access token'ın süresi dolmuş olabilir
- Rate limit'e takılmış olabilirsiniz

**Demo veriler görünmüyor mu?**
- Tarayıcı konsolunu kontrol edin (F12)
- JavaScript hatalarına bakın
- Ağ sekmesinden API çağrılarını kontrol edin

---

## 📱 Şu Anki Durum

✅ **Instagram bölümü aktif**: Demo verilerle çalışıyor  
⏳ **API entegrasyonu**: Rehber hazır, kurulum bekleniyor  
🎯 **Hedef**: Gerçek Instagram feed'i gösterme  

Herhangi bir sorunuz olursa, Instagram Developer Documentation'ı kontrol edebilirsiniz:  
📖 https://developers.facebook.com/docs/instagram-basic-display-api/