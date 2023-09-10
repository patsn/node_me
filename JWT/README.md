## Functions:

Back to Main Page: [Click](../)

### Authentication Middleware (handleAccess):

The `handleAccess` middleware is defined to check for valid JWT tokens in the `Authorization` header of incoming requests.<br>
If a valid token is found, it verifies it using the `SECRET_TOKEN` from the environment variables and attaches the decoded user information to the request object (`req.user`).<br>
If the token is missing or invalid, it sends appropriate HTTP responses (`401` or `403`).

### Token Generation Function (genToken):

The `genToken` function generates JWT tokens based on user information.<br>
It can optionally specify a token expiration time (`timer`) using the `expiresIn` option.

---

## Routes:

### GET Data Route ("/getData"):

This route is protected by the `handleAccess` middleware.<br>
It returns JSON data filtered based on the user's name contained in the JWT. It fetches user data from the `userData` array.

### POST Login Route ("/login"):

This route handles user login. It expects a POST request with a `username` in the request body.<br> It generates both an access token (short-lived) and a refresh token (long-lived), stores the refresh token in `refreshTokenDB`, and sends both tokens as a JSON response.

### POST Refresh Access Token Route ("/refreshAccess"):

This route allows the client to request a new access token using a valid refresh token.<br> It verifies the refresh token, and if valid, generates a new access token and sends it as a JSON response.

### DELETE Logout Route ("/logout"):

This route is used to log the user out by removing the associated refresh token from refreshTokenDB.

---
