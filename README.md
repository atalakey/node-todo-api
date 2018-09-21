# node-todo-api

A NodeJS app.

The app uses the Express framework, Mongoose ORM, jsonwebtoken (JWT) package and bcryptjs library to create a simple RESTful API in the form of a todo list.

## App description (nine HTTP requests)

### signup (HTTP method: POST, Path: /users)
An HTTP POST request to create a new user.

### login (HTTP method: POST, Path: /users/login)
An HTTP POST request to login using an existing user.

### inquiry (HTTP method: GET, Path: /users/me)
An HTTP GET request to query about the currently logged in user.

### logout (HTTP method: DELETE, Path: /users/me/token)
An HTTP DELETE request to logout the currently logged in user.

### create todo (HTTP method: POST, Path: /todos)
An HTTP POST request to create a new todo.

### get todos (HTTP method: GET, Path: /todos)
An HTTP GET request to get all todos created by the currently logged in user.

### get todo (HTTP method: GET, Path: /todos/:id)
An HTTP GET request to get a specific todo created by the currently logged in user.

### update todo (HTTP method: PATCH, Path: /todos/:id)
An HTTP PATCH request to update a specific todo created by the currently logged in user.

### delete todo (HTTP method: DELETE, Path: /todos/:id)
An HTTP DELETE request to delete a specific todo created by the currently logged in user.

## Installation

Be sure to have NodeJS installed.

### Prerequisites:
```
1. You must have nodejs and MongoDB driver installed.
2. It is recommended to have Postman and MongoDB Compass installed.
```

### To install the prerequisites (macOS only)
```
1. Install Homebrew:

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Tap cask:

    brew tap caskroom/cask

3. Install nodejs:

    brew install node

4. Install MongoDB:

    brew install mongodb

5. Install Postman:

    brew cask install postman

6. Install MongoDB Compass:

    brew cask install mongodb-compass
```

### To use the application:
``` 
1. Clone the project:

    git clone https://github.com/atalakey/node-todo-api.git ~/Desktop/node-todo-api

2. Navigate to where you cloned the project:

    cd ~/Desktop/node-todo-api

3. Install App local packages:

    npm install
```

## Run the App

```
- Start the node express server:

    npm start

- Import the environment and collection JSON configuration files from node-todo-api/postman into Postman.

- Setup MongoDB Compass to connect to the local database.

- Create a user using Postman by firing a POST request to /users.
```

# Disclaimer:
This app is for demo purposes only.
