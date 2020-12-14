<h1>TUI TASK</h1>

A nestjs service for getting user repos.

Requirement:
1) NPM installed
3) Postman installed

Design:
Layers seggregation [ request flow ]
Authentication middleware -> Authorization Guard -> Controller -> Service -> Helper-services [ clients for calling downstream apis]

Steps to run the service:
1) npm install
2) npm run start:dev
3) import postman collection TUI.postman_collection.json and environment dev.postman_environment.json into your Postman.
4) run the api.

Author - Akshay [akshay.9284570124@gmail.com] <br>