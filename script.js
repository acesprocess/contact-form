const form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("status");
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Mesajınız başarıyla iletildi! Teşekkür ederiz.";
      status.className = "success";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Hata! Mesaj gönderilemedi.";
        }
      });
      status.className = "error";
    }
  }).catch(error => {
    status.innerHTML = "Hata! Bir sorun oluştu.";
    status.className = "error";
  });
}

form.addEventListener("submit", handleSubmit);

// Dil Verileri (Sözlük)
const translations = {
    tr: {
        header: "Bizimle İletişime Geçin",
        label_name: "Ad Soyad",
        place_name: "Adınızı yazınız...",
        label_email: "E-posta Adresi",
        place_email: "örnek@mail.com",
        label_message: "Mesajınız",
        place_message: "Size nasıl yardımcı olabiliriz?",
        btn_send: "Gönder",
        btn_lang: "English" // Butonun üzerinde yazacak metin
    },
    en: {
        header: "Contact Us",
        label_name: "Full Name",
        place_name: "Enter your name...",
        label_email: "Email Address",
        place_email: "example@mail.com",
        label_message: "Your Message",
        place_message: "How can we help you?",
        btn_send: "Send Message",
        btn_lang: "Türkçe" // İngilizce moddayken butonda Türkçe yazsın
    }
};

let currentLang = "tr"; // Varsayılan dil

function toggleLanguage() {
    // Dili değiştir (TR ise EN yap, EN ise TR yap)
    currentLang = currentLang === "tr" ? "en" : "tr";

    // Tüm "data-lang" özniteliğine sahip elementleri bul ve metnini değiştir
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[currentLang][key]) {
            element.innerText = translations[currentLang][key];
        }
    });

    // Tüm "data-lang-placeholder" olan inputları bul ve placeholder'ını değiştir
    document.querySelectorAll("[data-lang-placeholder]").forEach(element => {
        const key = element.getAttribute("data-lang-placeholder");
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });

    // Butonun kendi metnini de güncelle
    document.getElementById("lang-btn").innerText = translations[currentLang]["btn_lang"];
}