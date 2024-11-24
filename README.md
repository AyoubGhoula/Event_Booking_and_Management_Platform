# EventMaster

**EventMaster** is a modern event management platform that allows users to seamlessly create, manage, and participate in various events. Designed with cutting-edge technologies like **Laravel**, **React.js**, and **TypeScript**, EventMaster ensures a secure, scalable, and user-friendly experience.

## Features

- **User Roles**:  
  - Organizers: Create and manage events.  
  - Participants: Browse and join events.  

- **Event Management**:  
  - Create, update, and delete events.  
  - Add and display event images.  

- **Search and Filters**:  
  - Find events by title, date, or type.  
  - Separate views for old and upcoming events.  

- **Secure Authentication**:  
  - Token-based authentication with auto-expiry after 30 minutes of inactivity.  

- **Interactive UI**:  
  - Popup for detailed event information.  
  - Smooth animations using `react-pip`.  
  - Tooltips for better user guidance (`react-tooltip`).  

## Tech Stack

- **Frontend**:  
  - React.js  
  - Tailwind CSS  
  - TypeScript  

- **Backend**:  
  - Laravel  
  - MySQL  

- **Other Tools**:  
  - React Tooltip for enhanced UI  
  - Animations with `react-pip`  
  - JWT for secure API authentication  

## Installation

### Prerequisites

- Node.js (v16+ recommended)  
- PHP (v8+ recommended)  
- Composer  
- MySQL  

### Steps

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/EventMaster.git
   cd EventMaster
    <h2>Installation</h2>

    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (v16+ recommended)</li>
        <li>PHP (v8+ recommended)</li>
        <li>Composer</li>
        <li>MySQL</li>
    </ul>

    <h3>Steps</h3>
    <ol>
        <li>Clone the repository:
            <div class="code-block">
                <pre>git clone https://github.com/your-username/EventMaster.git  
cd EventMaster</pre>
            </div>
        </li>
        <li><strong>Backend Setup (Laravel):</strong>
            <ul>
                <li>Install dependencies:
                    <div class="code-block">
                        <pre>composer install</pre>
                    </div>
                </li>
                <li>Configure <code>.env</code> file with your database credentials.</li>
                <li>Run migrations and seeders:
                    <div class="code-block">
                        <pre>php artisan migrate --seed</pre>
                    </div>
                </li>
                <li>Start the server:
                    <div class="code-block">
                        <pre>php artisan serve</pre>
                    </div>
                </li>
            </ul>
        </li>
        <li><strong>Frontend Setup (React):</strong>
            <ul>
                <li>Navigate to the <code>frontend</code> directory:
                    <div class="code-block">
                        <pre>cd frontend</pre>
                    </div>
                </li>
                <li>Install dependencies:
                    <div class="code-block">
                        <pre>npm install</pre>
                    </div>
                </li>
                <li>Start the development server:
                    <div class="code-block">
                        <pre>npm run dev</pre>
                    </div>
                </li>
            </ul>
        </li>
        <li>Open the application in your browser:
            <div class="code-block">
                <pre>http://localhost:8000</pre>
            </div>
        </li>
    </ol>

    <h2>Contributing</h2>
    <p>We welcome contributions!</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch for your feature/bug fix.</li>
        <li>Commit your changes and push to your fork.</li>
        <li>Open a pull request with a detailed description of your changes.</li>
    </ol>

    <h2>License</h2>
    <p>This project is licensed under the <a href="#">MIT License</a>.</p>

    <h2>Contact</h2>
    <p>For questions or support, feel free to reach out:</p>
    <ul>
        <li><strong>Developer:</strong> Ayoub Ghoula</li>
        <li><strong>Email:</strong> <a href="mailto: ayoubghoula40@gmail.com">ayoubghoula40@gmail.com</a></li>
    </ul>

</body>
</html>