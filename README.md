# ToPickPlace
This is my Pet Project (A project where I can experiment with new tecnologies and methodologies)

## The idea :bulb:
ToPickPlace assigns seats to all attendees for a given event using a genetic algorithm.
The seats are assigned considering the topics which attendees are interesting to.

## Features
The user should be able to:
1. create an event
2. draw a seats map 
2. register attendees
3. select the topics in which they are interested
4. obtain the best seat assignment topic-based to increase the communication between attendees.

## Project Components
ToPickPlace consists of three main components:
- [x] ToPickPlaceGUI: Single Page Application in ( React + Redux + Typescript)
- [x] ToPickPlaceAPI: WebAPI to handle the events (Java)
- [x] ToPickPlacePlanner: A genetic alorithm that assign seats based on the topic which attendees are interesting to (C#)
- [x] Edge Router (Traefik)
- [x] Data Store: all data are stored in Cloud Firestore Colletions 

## Containers
Each component runs on its container and they are orchestrated with  docker-compose.
 ```dockerUp``` is a command-line tool to define which container start (it is useful in development).

### Run :running:
once you started all containers using ```dockerUp``` you go to:
http://localhost/event to open the web app