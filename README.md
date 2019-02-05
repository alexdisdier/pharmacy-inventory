# Synopsis

This is a test to create a database using MongoDB. We'll be using the example of a pharmacist who needs an inventory for his drugs.

### Guidelines  🚧

Following a CRUD approach (Create, Read, Update, Delete)

1. Develop a web service to add (CREATE) a new drug to the inventory

- URL: http://localhost:3000/create
- Method used: POST
- Query params:

```javascript
{
  "name": "ASPEGIC" ,
  "quantity": 10
}
```

- If the creation was successful, we'll return the informations concerning that new drug.

2. The second web service will be used to display (READ) all the drugs and their quantities.

- URL: http://localhost:3000/
- Method used: GET

3. The third web service will update the quantity of a specific drug (UPDATE)

- URL: http://localhost:3000/drugs/add
- Method used: POST
- Params:

```javascript
{
  "id": "5b2b9b4db2842e190ab98229",
  "quantity": 5
}
```

4. The fourth and final web service will remove (DELETE) a drug from the inventory.

- URL: http://localhost:3000/drugs/remove
- Method used: POST
- Params

```javascript
{
  "id": "5b2b9b4db2842e190ab98229",
  "quantity": 2
}
```

## Directory Structure

```bash

doctolib_api
├── .git
│   ├── models
│   │   ├── drug.js
│   │   ├── log.js
│   ├── routes
│   │   ├── drug.js
│   │   ├── log.js
├── .gitignore
├── index.js
├── package.json
└── README.md

```

## Back up

- export backup from mongodb in root directory.

```bash
mongodump --db dbName  --out export-data
```

- Create a database user in mLab (Heroku Add-on)

```bash
mongorestore -h ****** -d ******* -u <user> -p <password> ./export-data/dbName/
```

## Built With

- [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Testing With

- [Postman](https://www.getpostman.com/) -> Improves API development

## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)

## Acknowledgments

- This is part of a FullStack Developer Bootcamp [@Le Reacteur](https://www.lereacteur.io)
