## Routes:

Back to Main Page: [Click](../)


### Get All Users Endpoint: 
A GET endpoint `/users` is defined to retrieve all users. <br>
In this code, it returns the `users` array as JSON. In a production environment, this would be replaced with a database query.

### Create User Endpoint: 
A POST endpoint `/users` is defined to create a new user. <br>
It hashes the user's password using bcrypt, generates a unique `uuid` for the user, and stores the user object in the users array. <br>
If successful, it responds with a status code `201` Created. If an error occurs, it responds with a status code `500` Internal Server Error.

### Login Endpoint: 
A POST endpoint `/users/login` is defined for user authentication. <br>
It searches for a user with the provided `name`, compares the hashed password with the input password using bcrypt, and responds with "Success" if the authentication is successful or "Not Allowed" if it fails. If an error occurs during the process, it responds with a status code `500` Internal Server Error.