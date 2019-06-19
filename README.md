# [movie-kg-backend](https://github.com/ChenCyl/movie-kg-backend)

> :point_right: [Front end​](https://github.com/ChenCyl/movie-kg-frontend)


## How to Start

### Database (Neo4j) Preparation

> `src/assets/films.json` is the meta data. 

#### Step 1: convert `.json` into `.csv`.

Use `src/tools/json2csv.js` to convert `.json` into `.csv`.

```bash
node src/tools/json2csv.js
```

#### Step 2: clear db

stop the database, and enter the database directory (if you have **Neo4j Desktop**, you just open it -> click manager button -> click terminal button), then you need to execute in terminal:

```bash
rm -r data/databases/graph.db
```

#### Step 3: import data

```bash
bin/neo4j-admin import --nodes /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/movie.csv \
--nodes [...]/src/assets/director.csv \
--nodes [...]/src/assets/cast.csv \
--nodes [...]/src/assets/writer.csv \
--relationships [...]/src/assets/rel-directed.csv \
--relationships [...]/src/assets/rel-acted.csv \
--relationships [...]/src/assets/rel-written.csv \
--ignore-duplicate-nodes true \
--ignore-missing-nodes true
```

Finally start the databese.

### Project setup

```bash
npm install
npm start
```

## API

### GET /api/:name

Get data by node name.  **Support fuzzy queries**.

eg: GET http://localhost:3000/api/成龙

```json
{
  "status": true, // false means CQL is wrong
  "entity": {
    "nodes": [
      {
        "id": "1054531", 
        "name": "成龙",
        "type": "Person"
      },
      {
        "id": "1299858",
        "name": "龙兄虎弟 龍兄虎弟",
        "type": "Movie",
        "rating": "6.9"
      },
      {
        "id": "1299120",
        "name": "A计划续集 A計劃續集",
        "type": "Movie",
        "rating": "7.4"
      },
      ...
    ],
    "links": [
      {
        "source": "1299858",
        "target": "1054531",
        "id": "12998581054531",
        "value": "Directed/Acted_in"
      },
  		...
		]
  }
}
```

### GET /api/movies/highrate

Get movies whose rate score is more than 9.

eg: GET http://localhost:3000/api/movies/highrate

```json
{
  "status": true,
  "entity": {
    "nodes": [
      {
        "id": "19955871",
        "name": "车轮不息 Where The Trail Ends",
        "type": "Movie",
        "rating": "9.1"
      },
      {
        "id": "24857754",
        "name": "吉屋出租：百老汇剧场版 Rent: Filmed Live on Broadway",
        "type": "Movie",
        "rating": "9.1"
      },
      ...
    ],
    "links": []
  }
}
```

### GET /api/people/filmmost

Get the actor who made the most movies.

eg: GET http://localhost:3000/api/people/filmmost

```json
{
  "status": true,
  "entity": {
    "nodes": [
      {
        "id": "1054430",
        "name": "伍迪·艾伦",
        "type": "Person"
      }
    ],
    "links": []
  }
}
```

## Reference 

Repo: [Crud-nodejs-neo4j](https://github.com/Yashjeet/Crud-nodejs-neo4j), A simple REST apis application to create,read,update and delete user.

