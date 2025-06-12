
# 🕌 Prayer Times Web App


A modern and responsive Arabic web application that displays daily prayer times across cities in Saudi Arabia with an elegant and user-friendly interface.

🔗 [Live Demo](https://voluble-mooncake-375773.netlify.app/)

---

## 💡 Project Idea

The app aims to provide users with accurate daily prayer times, allowing them to select a city and view a real-time countdown to the next prayer. It utilizes reliable APIs and offers a visually appealing RTL (right-to-left) Arabic interface.

---

## ✨ Features

* Displays five daily prayer times: **Fajr**, **Dhuhr**, **Asr**, **Maghrib**, and **Isha**.
* Automatically calculates and shows the **time remaining** until the next prayer.
* Allows **city selection** from a list of Saudi Arabian cities.
* Fully **RTL Arabic interface** for a native experience.
* **Responsive design** compatible with all devices.
* Includes **visual illustrations** for each prayer to enhance user interaction.

---

## 🚀 Live Demo

Explore the live application:
👉 [https://voluble-mooncake-375773.netlify.app/](https://voluble-mooncake-375773.netlify.app/)

---

## 🛠️ Tech Stack

* **React.js** – Frontend framework
* **Material UI (MUI)** – UI components
* **Moment.js** – Time and date manipulation
* **Axios** – API requests
* **Aladhan API** – Source for prayer times
* **Netlify** – Hosting and deployment

---

## ⚙️ Getting Started Locally

Follow these steps to run the app locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/prayer-time-react.git
   cd prayer-time-react/prayers-timings
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   npm start
   ```

4. **Open in browser:**

   ```
   http://localhost:5173/
   ```

---

## 📁 Folder Structure

```
src/
  ├── component/
  │   ├── MainContent.jsx
  │   ├── Prayer.jsx
  │   └── images/
  ├── App.jsx
  ├── index.js
  └── ...
```

---

## 📡 Prayer Time Data Source

Prayer timings are fetched from the reliable [Aladhan API](https://aladhan.com/prayer-times-api).

---

## 🖼️ Screenshots

![App Screenshot](https://voluble-mooncake-375773.netlify.app/Screenshot (138).png…]())
*Main interface showing prayer times and remaining time*

---

## 🐞 Challenges Faced

* **Unifying card dimensions** to maintain a consistent UI.
* **Displaying all prayer cards in a single row** without wrapping.
* **Dynamically calculating the time remaining** for the next prayer.
* **RTL layout adjustments** to ensure full Arabic support.
* **Ensuring full responsiveness** across different screen sizes.
* **Restricting layout to 100vh**, while allowing scroll when needed on smaller devices.

---

## 🔮 Future Improvements

* Add a **dark mode** toggle.
* Integrate **geolocation** for auto-detecting user’s city.
* Support for **more countries** and cities.
* Provide **notifications or alerts** before each prayer.
* Multilingual support (Arabic/English toggle).

---

## 👨‍💻 Contributing

Contributions and suggestions are welcome!
Feel free to open an **Issue** or submit a **Pull Request** for any improvements or feature ideas.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

