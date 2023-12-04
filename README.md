# Scrum & Agile Task Management

Scrum Masters can create tasks for employees in this project.

This project powered by React.JS and Express.

<img width="1372" alt="Screen Shot 2023-12-04 at 20 48 22" src="client\public\assets\img\Capture.PNG">


Get Started
-----------

```
Open command line and apply that steps:

1. Environment Setup
 install node js 16
 #Alternative install nvm to manage node version
 https://github.com/nvm-sh/nvm
 https://github.com/coreybutler/nvm-windows
 git clone 
 use branch sprint-v1 or create new branch from sprint-v1 for sel-development
 install MongoDB

2. Installation
 cd <project path>
 npm install

3. Project Setup
 cd server && cp .env.example .env && cd ..

4. Test Run
 npm run start

5. remark
server api port: 3001
Frontend: https://react.dev
Backend: https://expressjs.com

HTTP Request
-----------
http://localhost:3000/

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /tasks | `GET` | Empty | List all tasks. |
| /tasks | `POST` | {'title':'task title', 'content':'task content', status:1, date:Date.now, color:SpecialField, dueDate:Date, createdBy:ObjectId, contributors: Object.Id } | Create a new task. |
| /tasks/update/:id | `PUT` | {'title':'task title', 'content':'task content', status:1, date:Date.now, color:SpecialField, dueDate:Date, createdBy:ObjectId, contributors: Object.Id } | Update task by id. |
| /tasks/delete/:id | `DELETE` | Empty | Delete task by id. |
| /users | `GET` | Empty | List all users. |
| /users | `POST` | {'username':'emreorhan', 'name':'Emre', lastName:'Orhan', createdBy:ObjectId, profilePhoto:'emre.jpg' } | Create a new user. |
| /story | `GET` | Empty | List all projects. |
  



