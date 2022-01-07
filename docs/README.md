### user
- id
- full name 
- username
- password

### transaction
- id
- user (id) foreign key
- amount
- tansaction type { paid , recieved}

### Backend
- Node.js
- Express
- Sequealize
- Postgresql
- JWT

### Frontend
- React
- Material - UI



$ docker run       --name postgres       -e POSTGRES_PASSWORD=password       -p 5432:5432       -d postgres

### User Routes
- Register
- Login
- GetUserById

### Transaction Routes
- Create Tranaction 
- Get All transaction by user
- get Transaction By Id
- Delete Transaction
