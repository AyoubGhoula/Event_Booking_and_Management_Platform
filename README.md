# EventMaster

![EventMaster Banner](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Home.png)

**EventMaster** is a modern event management platform enabling users to create, manage, and participate in diverse events with ease. Built with **Laravel** and **React**, it delivers a seamless and interactive experience.

---

## 🚀 Features

- **User Roles**
  - **Organizers:** Create and manage events
  - **Participants:** Browse and join events

- **Event Management**
  - Create, update, and delete events
  - Upload and display event images

- **Search & Filters**
  - Search by title, date, or type
  - View past and upcoming events separately

- **Secure Authentication**
  - JWT-based authentication with auto-expiry after 30 minutes of inactivity

- **Interactive UI**
  - Event detail popups
  - Smooth animations (`react-pip`)
  - Tooltips with `react-tooltip`

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- TypeScript

**Backend:**
- Laravel
- MySQL

**Other Tools:**
- React Tooltip
- Animations with `react-pip`
- JWT for secure API authentication

---

## 📸 Screenshots

![Details](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20105259.png) ![Create](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20112240.png)   
![4](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20112321.png)
![5](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20112414.png)
![3](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20113131.png)
![6](Conception%20de%20Plateforme%20de%20R%C3%A9servation%20et%20de%20Gestion%20d'%C3%89v%C3%A9nements/img_de_project/Capture%20d%E2%80%99%C3%A9cran%202025-01-19%20113014.png)


---

## 🚦 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PHP (v8+ recommended)
- Composer
- MySQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyoubGhoula/Event_Booking_and_Management_Platform.git
   ```
2. **Setup Backend**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   # Configure your .env file (DB credentials etc)
   php artisan migrate
   php artisan serve
   ```
3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions or support, reach out:

- **Developer:** Ayoub Ghoula  
- **Email:** [ayoubghoula40@gmail.com](mailto:ayoubghoula40@gmail.com)

---

_Star ⭐️ this repo if you like it!_
