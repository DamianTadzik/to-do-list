Alright, let's set you up to connect your local web page to the MySQL database provided by UST. Since your web page is local and you're dealing with client-side JavaScript, you'll need to create a server-side script that acts as an intermediary to handle database connections. Here's a simplified example using Node.js and Express:

1. Install Node.js


2. Run terminal in server/ directory


3. OPTIONAL? Run npm init in terminal if needed


4. OPTIONAL? Install Required Packages if not installed:
Run npm init to create a package.json file. Follow the prompts to set up your project.


5. OPTIONAL? Replace 'your_username', 'your_password', and 'your_database_name' with your UST-provided credentials.


6. Execute node server.js in the terminal to start your local server.


Now, your JavaScript on the local webpage can make requests to this server, and the server, in turn, can interact with the MySQL database. This is a simplified example, and in a real-world scenario, you'd implement proper error handling, security measures, and separation of concerns. Make sure to secure your database credentials and consider using environment variables for sensitive information. If you have more questions or need further clarification, feel free to ask!