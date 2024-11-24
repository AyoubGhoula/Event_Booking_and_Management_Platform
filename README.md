<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EventMaster - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0 20px;
            color: #333;
            background-color: #f9f9f9;
        }
        h1, h2, h3 {
            color: #222;
        }
        h1 {
            margin-top: 20px;
            font-size: 2.5em;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow-x: auto;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .code-block {
            margin: 20px 0;
        }
    </style>
</head>
<body>

    <h1>EventMaster</h1>
    <p><strong>EventMaster</strong> is a modern event management platform that allows users to seamlessly create, manage, and participate in various events. Designed with cutting-edge technologies like <strong>Laravel</strong>, <strong>React.js</strong>, and <strong>TypeScript</strong>, EventMaster ensures a secure, scalable, and user-friendly experience.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>User Roles:</strong>
            <ul>
                <li>Organizers: Create and manage events.</li>
                <li>Participants: Browse and join events.</li>
            </ul>
        </li>
        <li><strong>Event Management:</strong>
            <ul>
                <li>Create, update, and delete events.</li>
                <li>Add and display event images.</li>
            </ul>
        </li>
        <li><strong>Search and Filters:</strong>
            <ul>
                <li>Find events by title, date, or type.</li>
                <li>Separate views for old and upcoming events.</li>
            </ul>
        </li>
        <li><strong>Secure Authentication:</strong> Token-based authentication with auto-expiry after 30 minutes of inactivity.</li>
        <li><strong>Interactive UI:</strong>
            <ul>
                <li>Popup for detailed event information.</li>
                <li>Smooth animations using <code>react-pip</code>.</li>
                <li>Tooltips for better user guidance (<code>react-tooltip</code>).</li>
            </ul>
        </li>
    </ul>

    <h2>Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> React.js, Tailwind CSS, TypeScript</li>
        <li><strong>Backend:</strong> Laravel, MySQL</li>
        <li><strong>Other Tools:</strong>
            <ul>
                <li>React Tooltip for enhanced UI</li>
                <li>Animations with <code>react-pip</code></li>
                <li>JWT for secure API authentication</li>
            </ul>
        </li>
    </ul>

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