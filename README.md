# Web-to-Case con reCAPTCHA (Pruebas)

Este proyecto implementa un formulario **Web-to-Case** que envía casos directamente a Salesforce, incluyendo validación con **Google reCAPTCHA** para evitar envíos automáticos de bots.

## 🚀 Características

- Envío directo de datos a Salesforce sin necesidad de backend.
- Integración con **Google reCAPTCHA v2** para mayor seguridad.
- Validación en el cliente antes de enviar el formulario.
- Protección adicional con un campo honeypot.

## 📋 Requisitos

1. Una cuenta de **Salesforce** con Web-to-Case habilitado.
2. Claves de **Google reCAPTCHA v2**:
   - **Site Key** (visible en el frontend).
   - **Secret Key** (no se usa en Web-to-Case, solo en servidores).
3. Un dominio donde alojar el formulario (GitHub Pages, Netlify, etc.).

## 📄 Instalación y Uso

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/sfernandez-uala/web-to-case.git
cd web-to-case
```
### 2️⃣ Configurar el Formulario

Edita `index.html` y reemplaza:

- **ORG\_ID** con el ID de tu organización en Salesforce.
- **TU\_SITE\_KEY** con tu clave pública de reCAPTCHA.
- **RET\_URL** con la URL de redirección tras el envío.