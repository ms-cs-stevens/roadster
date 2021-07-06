# Roadster

## Section 1 - Some screenshots:

##### Creating a journey

<img width="1436" alt="Screen Shot 2021-07-06 at 11 56 49 AM" src="https://user-images.githubusercontent.com/26408955/124632372-45859900-de52-11eb-817b-c54975f69279.png">

##### Editing a journey

<img width="1419" alt="Screen Shot 2021-07-06 at 11 59 00 AM" src="https://user-images.githubusercontent.com/26408955/124632244-2be45180-de52-11eb-89f9-bf9800c6c43b.png">

##### Authentication

<img width="1440" alt="Screen Shot 2021-07-06 at 12 02 15 PM" src="https://user-images.githubusercontent.com/26408955/124632423-5209f180-de52-11eb-9914-6d4596094134.png">

##### Chat feature

<img width="1435" alt="Screen Shot 2021-07-06 at 12 02 46 PM" src="https://user-images.githubusercontent.com/26408955/124632443-57673c00-de52-11eb-8137-ee6265fea8cb.png">

##### Journey Dashboard
<img width="1437" alt="Screen Shot 2021-07-06 at 12 06 02 PM" src="https://user-images.githubusercontent.com/26408955/124632789-a4e3a900-de52-11eb-881b-be75d63fe02f.png">

##### Image upload for user profile and for journeys
<img width="1440" alt="Screen Shot 2021-07-06 at 12 06 25 PM" src="https://user-images.githubusercontent.com/26408955/124632847-b1680180-de52-11eb-89d3-e4f900998767.png">

## Section 2 - Installation:

Make sure you have MongoDB installed and running on your system.

In a terminal(anywhere) type in the follwing to get the Redis server running on the default port: sudo service redis-server start

Test whether the redis server is running by typing in: redis-cli ping
It should return "PONG"

- All the api keys and authetication keys are stored .env file of the client
- On node side, there is a variables.env file that has port details and mondo db url

Please check whether or not the key.json file is present at server\firebase

### Open 2 terminals in the project folder:

Terminal 1-
* cd server
* npm i
* npm run seed
* npm start

Terminal 2-
* cd client
* npm i
* npm start

### The server will start running at localhost:4000
### The React client will start running at localhost:3000 automatically

### Core Features in the application:
* Firebase authentication
* Journeys CRUD
* Create PDFs of a Journey to share
* Google Location API to visualize a trip
* Set a journey as customizable or non-customizable by co-travellers if any
* Adding 1 or more images for a trip
* Private group chat among co travellers(only)
* Public comments on a journey
* Caching of User data
