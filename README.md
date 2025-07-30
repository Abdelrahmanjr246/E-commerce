
# 🛒 E-commerce React App

A modern, responsive e-commerce web application built with **React**, **React Router**, and **Tailwind CSS**, featuring full shopping functionality including cart, wishlist, authentication, and order tracking.

**🔗 Live Demo:** [https://abdelrahmanjr246.github.io/E-commerce/](https://abdelrahmanjr246.github.io/E-commerce/)

---

## 🚀 Features

* 🏠 **Homepage** with product and category sliders
* 🛍️ **Product Listing** with filtering, sorting, and pagination
* 🔍 **Product Details** with add to cart/wishlist
* ❤️ **Wishlist** (protected route)
* 🛒 **Cart** with quantity and removal controls
* 🔐 **Authentication** (register, login, forgot/reset password)
* 📦 **Orders Page** for logged-in users
* 🌙 Fully **responsive** layout using Tailwind CSS
* ☁️ **Context API** for Auth, Cart, and Wishlist state
* 🔔 Toast feedback with `react-hot-toast`

---

## 🧱 Tech Stack

| Tech               | Purpose                             |
| ------------------ | ----------------------------------- |
| ⚛️ React           | UI library                          |
| 🧭 React Router    | Client-side routing                 |
| 💨 Tailwind CSS    | Styling                             |
| 🧠 Context API     | Global state (Auth, Cart, Wishlist) |
| ✅ Formik + Yup     | Form validation                     |
| 🍞 react-hot-toast | Notifications                       |
| 🐱 GitHub Pages    | Deployment                          |

---

## 📂 Folder Structure

```
src/
├── Components/
├── Context/
├── Pages/
├── Protected/
├── App.jsx
└── main.jsx
```

---

## 📦 Getting Started

```bash
git clone https://github.com/Abdelrahmanjr246/E-commerce.git
cd E-commerce
npm install
npm run dev
```

To build and preview production:

```bash
npm run build
npm run preview
```

---

## 🛠️ Deployment

Deployed using GitHub Pages via Vite.
In `vite.config.js`, the `base` is set based on environment:

```js
base: mode === 'production' ? '/E-commerce/' : '/'
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
