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
- Register    :done
- Login       :done
- GetUserById :

### Transaction Routes
- Create Tranaction                       : done
- Get All transaction by user             :done
- get Transaction By Id
- update transaction by Id
- Delete Transaction



MY NOTES

When i get all the transactions of a perticular user, i want to populate the data with the party name and username 