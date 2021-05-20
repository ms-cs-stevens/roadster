# Roadster

Make sure you have MongoDB installed and running on your system.

In a terminal(anywhere) type in the follwing to get the Redis server running on the default port: sudo service redis-server start

Test whether the redis server is running by typing in: redis-cli ping
It should return "PONG"

Please check whether or not the key.json file is present at server\firebase

Open 2 terminals in the project folder:
Terminal 1-
    cd server
    npm i
    npm run seed
    npm start

Terminal 2-
    cd client
    npm i
    npm start

The server will start running at localhost:4000
The React client will start running at localhost:3000 automatically

Core Features in the application:
    Firebase authentication
    Journeys CRUD
    Create PDFs of a Journey to share
    Google Location API to visualize a trip
    Set a journey as customizable or non-customizable by co-travellers if any
    Adding 1 or more images for a trip
    Private group chat among co travellers(only)
    Public comments on a journey
    Caching of User data