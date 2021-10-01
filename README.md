# programmer-test-nodejs


Build a Movie Shop System using Nodejs
Requirements of the system:
Models:
- Movie
    - title
    - director
    - description
    - duration_min
- Cast
    - name
    - rolename
- User
    - name
    - email
    - password
- Wishlist (binding between Movie and User)

Endpoints & Controllers:
CRUD Movies
Search Movies by all fields
Filter Movies by all fields

CRUD Cast
Search Cast by all fields
Filter Cast by all fields

CRUD User
Login as User (just return random api_token)
Search User by all fields
Filter User by all fields except password

CRUD Wishlist

Middleware: 
Allow all request as long as has header: 
“Authorization: Bearer <token>”
*token can be any string
