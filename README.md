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
   <pre>git clone https://github.com/your-username/EventMaster.git  
cd EventMaster</pre>

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

  #License

This project is licensed under the <pre>MIT License</pre>.

# Contact

For questions or support, feel free to reach out:

Developer: Ayoub Ghoula

Email: ayoubghoula24@gmail.com