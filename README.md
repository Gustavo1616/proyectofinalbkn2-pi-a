# 🛍️E-commerce App
Aplicación web de e-commerce desarrollada con Node.js y Express. Permite a los usuarios explorar productos, gestionar un carrito de compras y autenticarse con diversas estrategias.

## ✨Características Destacadas
Autenticación Flexible: Registro e inicio de sesión con estrategia local y Google OAuth2 (Passport.js, JWT, bcrypt).
Persistencia Configurable: Soporte para MongoDB (con Mongoose) y FileSystem (archivos JSON).
Gestión de Productos: API para operaciones CRUD de productos.
Carrito de Compras: Funcionalidad completa de carrito por usuario.
Vistas Dinámicas: Renderizado de interfaz con Handlebars.
Seguridad: Middlewares para proteger rutas y gestionar sesiones.

## 🚀Tecnologías Principales
Backend: Node.js, Express.js, MongoDB, Mongoose
Autenticación: Passport.js (local, Google, JWT), bcrypt, jsonwebtoken
Front-end: Handlebars.js
Utilidades: dotenv, cookie-parser, morgan, cors, nodemailer.

### ⚙️ Instalación
Clona el repositorio:
```
git clone https://github.com/Gustavo1616/proyectofinalbkn2-pi-a
cd proyectofinalbkn2-pi-a
```
⚙️ Instala dependencias:

npm install

### ▶️ Ejecución
Inicia la aplicación especificando el modo (carga .env.`<mode>`):

Desarrollo:
node app.js --mode dev

Producción:
node app.js --mode prod

La aplicación estará disponible en http://localhost:[PORT].

🗺️ Rutas Principales
```
/: Página de inicio.
/login, /register: Vistas de autenticación.
/products: Vista y API para productos.
/carts/:cid: Vista y API para carritos de compra.
/api/sessions/current: Información del usuario actual (protegida).
```