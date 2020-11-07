# Synopsis

This is an API for a Pharmacy Inventory using using MongoDB.
[check it out here](https://medecine-inventory.herokuapp.com/drug)

### Guidelines

Following a CRUD approach (Create, Read, Update, Delete)

## Directory Structure

```bash

doctolib_api
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
