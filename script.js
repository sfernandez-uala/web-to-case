document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("webToCase");

  function showError(field, show, message = "") {
    if (show) {
      field.classList.add("is-invalid");
      const feedback = field.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = message || feedback.textContent;
      }
    } else {
      field.classList.remove("is-invalid");
    }
  }

  // Validación en tiempo real
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.required) {
        showError(field, !field.value.trim());
      }
      if (field.type === "email" && field.value.trim()) {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        showError(field, !isValidEmail, "Por favor, ingrese un email válido");
      }
    });

    field.addEventListener("input", () => {
      if (field.value.trim()) {
        showError(field, false);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validar todos los campos
    form.querySelectorAll("input, textarea").forEach((field) => {
      if (field.required && !field.value.trim()) {
        showError(field, true);
        isValid = false;
      }
      if (field.type === "email" && field.value.trim()) {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        showError(field, !isValidEmail, "Por favor, ingrese un email válido");
        if (!isValidEmail) isValid = false;
      }
    });

    if (isValid) {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const dni = document.getElementById("dni").value;
      const description = document.getElementById("description");
      const spinner = document.querySelector(".spinner-border");
      spinner.classList.remove("d-none");

      // Agregar nombre y apellido a la descripción
      description.value = `Nombre: ${firstName}\nApellido: ${lastName}\nDNI: ${dni}\n\n${description.value}`;

      // Crear FormData y enviar el formulario usando fetch
      const formData = new FormData(form);
      formData.set("description", description.value);

      // Obtener el token de reCAPTCHA v3 y enviar el formulario
      grecaptcha.ready(() => {
        grecaptcha.execute('6LcF89oqAAAAAEYBp1wbHvf3nHsW8rrXa9mtXpw9', { action: 'submit' }).then((token) => {
          formData.set('g-recaptcha-response', token);

          fetch(form.action, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (response.ok) {
                window.location.href = "/thanks.html";
              } else {
                console.error("Error en la solicitud:", response.statusText);
              }
            })
            .catch((error) => {
              console.error("Error en la solicitud:", error);
            })
            .finally(() => {
              // Ocultar el spinner
              spinner.classList.add("d-none");
            });
        });
      });
    }
  });
});