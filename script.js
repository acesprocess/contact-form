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