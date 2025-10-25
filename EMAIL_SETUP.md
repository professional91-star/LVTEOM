# 📧 Email Gönderme Sistemi Kurulum Rehberi

## EmailJS ile Gerçek Email Gönderimi

Sitenizde artık gerçek email gönderebilen bir contact form var! Ancak çalışması için EmailJS servisini kurmanız gerekiyor.

### 🚀 Kurulum Adımları

#### 1. EmailJS Hesabı Oluşturun
- [EmailJS.com](https://www.emailjs.com/) sitesine gidin
- Ücretsiz hesap oluşturun (ayda 200 email ücretsiz)

#### 2. Email Servisi Ekleyin
- Dashboard'da "Email Services" bölümüne gidin
- Gmail, Outlook, Yahoo veya SMTP servisinizi ekleyin
- Service ID'yi not alın (örn: service_abc123)

#### 3. Email Template Oluşturun
- "Email Templates" bölümüne gidin
- Yeni template oluşturun
- Template ID'yi not alın (örn: template_xyz456)

**Örnek Template İçeriği:**
```
Konu: Website İletişim: {{subject}}

Yeni mesaj: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

Konu: {{subject}}

Mesaj:
{{message}}

---
Bu mesaj {{to_name}} web sitesinden gönderilmiştir.
```

#### 4. Public Key Alın
- "Integration" bölümünde Public Key'inizi bulun
- Kopyalayın (örn: user_abc123xyz456)

#### 5. Kodda Ayarları Yapın
`js/script.js` dosyasında şu satırları güncelleyin:

```javascript
// Bu satırları bulup değiştirin:
emailjs.init("YOUR_PUBLIC_KEY"); // Public Key'inizi buraya
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Service ve Template ID'lerinizi buraya
```

**Örnek:**
```javascript
emailjs.init("user_abc123xyz456");
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

### 🔧 Alternatif Çözüm: Mailto Fallback

Eğer EmailJS kurmak istemiyorsanız, mevcut kod otomatik olarak kullanıcının email programını açacak şekilde tasarlandı. Bu durumda:

1. Kullanıcı formu doldurur
2. EmailJS çalışmazsa otomatik olarak mailto linki açılır
3. Kullanıcının varsayılan email programında hazır mesaj açılır

**Şirket Email Adresi**

`js/script.js` dosyasında şu satırı şirketinizin gerçek email adresi ile değiştirin:

```javascript
const email = 'info@lvt-eom.com'; // Gerçek email adresinizi buraya
```

### ✅ Test Etme

1. Sitenizi açın
2. Contact formunu doldurun
3. Gönder butonuna tıklayın
4. Başarılı ise "Mesajınız gönderildi" bildirimi görmelisiniz
5. Email gelmezse console'da hata mesajlarını kontrol edin

### 🆘 Sorun Giderme

**Email gönderilmiyor:**
- EmailJS ayarlarını kontrol edin
- Console'da hata mesajlarını inceleyin
- Public Key, Service ID ve Template ID'lerin doğru olduğundan emin olun

**Mailto açılmıyor:**
- Email adresinin doğru olduğunu kontrol edin
- Tarayıcıda varsayılan email programının ayarlı olduğundan emin olun

### 💡 Öneriler

1. **Spam Koruması:** EmailJS otomatik spam koruması sağlar
2. **Email Limiti:** Ücretsiz hesapta ayda 200 email limiti var
3. **Güvenlik:** Public key frontend'de görünür, bu normal bir durumdur
4. **Yedekleme:** Mailto fallback sistemi her durumda çalışır

---

**Not:** Bu sistem hem EmailJS hem de mailto fallback içerdiği için %100 çalışır durumda. Kullanıcılar her durumda size mesaj gönderebilir! 🚀