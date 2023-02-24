# **Pomodoro API**

This is the backend component for the Pomodoro-React web application. It's built with Node.js, Express, and MongoDB, Passport.js, and provides the API endpoints that the frontend interacts with.

## **Getting Started**

1. Clone this repository and cd into the project directory.
2. Install dependencies with npm install.
3. Create a .env file in the root directory with the following variables:
   <pre><code>PORT='port-number'
   URI= 'mongo-db-uri'
   PRIV= 'private key (RSA)'
   PUB= 'public key (RSA)'
   </code></pre>

   Replace 'port-number' with the desired port number for the server to run on, 'mongo-db-uri' with the URI for your MongoDB database, and PRIV and PUB with RSA keys of your choosing to sign JSON web tokens.

4. Start the server with npm start.

## **API Endpoints**

---

### **/register POST**

Registers a new user.

Request body (Form or URL Params):

<pre><code>
{
  "username": "username",
  "password": "password"
}
</code></pre>

Returns a JSON object containing a success or failure message:

<pre><code>
{
  "message": "successfully registered",
}
</code></pre>

---

### **/login POST**

Logs a user in and returns a JSON web token.

Request body (Form or URL Params):

<pre><code>
{
  "username": "username",
  "password": "password"
}
</code></pre>

Returns a JSON object containing the JWT:

<pre><code>
{
  "success": BOOLEAN,
  "token": STRING(Json Web Token),
  "expiresIn": DATE
}
</code></pre>

---

### **Authenticated Routes**

---

### **/api/user/summary GET**

Gets a summary of a user.

Returns a JSON object containing the user's summary:

<pre><code>
{
  "projects": [
    {
      "id": INTEGER,
      "title": STRING,
      "user": MONGOID,
      "description": STRING,
      "start_date": DATE,
      "end_date": DATE
    }
  ],
  "tasks": [
     {
        "id": MONGOID,
        "project": MONGOID,
        "user": MONGOID,
        "title": STRING,
        "created": DATE,
        "completed": BOOLEAN,
        "timeSpent": INTEGER,
        "estimatedTime": INTEGER,
     }
    ],
  "logs": [
     {
        "_id": MONGOID,
        "task": MONGOID,
        "user": MONGOID,
        "completed": BOOLEAN,
        "duration": INTEGER,
        "startTime": DATE,
     }
  ]
}
</code></pre>

---

### **/api/project GET**

Gets a list of all projects.

Returns a JSON object containing the list of projects for a user:

<pre><code>
{
  "projects": [
    {
      "id": INTEGER,
      "title": STRING,
      "user": MONGOID,
      "description": STRING,
      "start_date": DATE,
      "end_date": DATE
    }
  ]
</code></pre>

### **/api/project POST**

Creates a new project for a user.

Request body (Form or URL Params):

<pre><code>
{
  "title": STRING
  "estimatedTime": INTEGER,
}
</code></pre>

Returns a JSON object containing a success or failure message:

<pre><code>
{ message: "success" }
</code></pre>

---

### **/api/project/:id GET**

Gets a specific project.

Returns a JSON object containing the project details:

<pre><code>
{
  "project": {
    "id": MONGOID,
    "user":MONGOID,
    "title": STRING,
    "description": STRING,
    "start_date": DATE,
    "end_date": DATE
  }
}
</code></pre>

---

### **/api/project/:id PUT**

Updates a specific project.

Request body (Form or URL Params):

<pre><code>
{
  "title": STRING,
  "timeSpent": INTEGER,
  "estimatedTime: INTEGER,
  "completed": BOOLEAN,
}
</code></pre>

Returns a JSON object containing a success or failure message:

<pre><code>
{
  "message": "success",
}

</code></pre>

---

### **/api/project/:id DELETE**

Deletes a specific project.

Returns a JSON object containing a success or failure message:

<pre><code>
{
  "message": "success",
}
</code></pre>

---

### **/api/task GET**

Gets a list of all tasks.

Returns a JSON object containing the list of tasks:

<pre><code>
{
"tasks": [
            {
            "id": MONGOID,
            "project": MONGOID,
            "user": MONGOID,
            "title": STRING,
            "created": DATE,
            "completed": BOOLEAN,
            "timeSpent": INTEGER,
            "estimatedTime": INTEGER,
            }
        ]
}
</code></pre>

---

### **/api/task POST**

Creates a new task.

Request body (Form or URL Params):

<pre><code>
{
  "project_id": PROJECT_ID,
  "title": STRING
  "estimatedTime": INTEGER,
  "due_date": DATE
}
</code></pre>

Returns a JSON object containing a success or failure message:

<pre><code>
{ message: "success" }
</code></pre>

---

### **/api/task/:id DELETE**

Deletes the task with the specified id.

Request parameters:

<pre><code>
{
  "id": TASK_ID,
}
</code></pre>

Returns a JSON object containing a success or failure message:

<pre><code>
{
  "message": "task deleted successfully",
}
</code></pre>

---

### **/api/task/:id PUT**

Updates the task with the specified id.

Request parameters:

<pre><code>
{
  "id": MONGOID,
}
</code></pre>

Request body (Form or URL Params):

<pre><code>
{
  "title": STRING,
  "timeSpent": INTEGER,
  "estimatedTime": INTEGER,
  "completed": BOOLEAN,
  "project": MONGOID,
}
</code></pre>

Returns a JSON object with a success or failure message

<pre><code>
{
  "message":"success"
}
</code></pre>

---

### **/api/log POST**

Creates a new time log.

Request body (Form or URL Params):

<pre><code>
{
  "task": MONGOID,
  "completed": BOOLEAN,
  "duration": INTEGER
}
</code></pre>

Returns a JSON object containing the ID of the created log entry:

<pre><code>
{
  "id": MONGOID
}
</code></pre>

---

### **/api/log/:id PUT**

Updates an existing time log.

Request body (Form or URL Params):

<pre><code>
{
  "task": MONGOID
  "completed": BOOLEAN,
  "duration": INTEGER
}
</code></pre>

Returns a JSON object containing a success message:

<pre><code>
{
  "message": "success",
}
</code></pre>

---

### **/api/log/:id GET**

Gets an existing time log.

Returns a JSON object containing the time log:

<pre><code>
{
  "log": {
    "_id": MONGOID,
    "task": MONGOID,
    "user": MONGOID,
    "completed": BOOLEAN,
    "duration": INTEGER,
    "startTime": DATE,
  }
}
</code></pre>
