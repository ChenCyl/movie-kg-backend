const { Parser } = require('json2csv');
const fs = require("fs")

// 同步读取
let filmsData = fs.readFileSync('src/assets/films.json');

filmsData = JSON.parse(filmsData.toString())

// 电影
const movie_fields = [
  {
    label: 'id:ID(Movie-ID)',
    value: '_id'
  },
  {
    label: 'name',
    value: 'title'
  },
  {
    label: 'pubdate',
    value: 'pubdate'
  },
  {
    label: 'rating',
    value: 'rating.average'
  },
  {
    label: ':LABEL',
    value: 'label',
    default: 'Movie'
  }
]
// 导演
const director_fields = [
  {
    label: 'id:ID(Person-ID)',
    value: (row, field) => {
      if (row.directors) {
        if (row.directors.id == 'search') {
          return Math.random() * 1000000 + ''
        }
        else {
          return row.directors.id
        }
      }
      else {
        return Math.random() * 1000000 + ''
      }
    },
    stringify: true
    // value: 'directors.id'
  },
  {
    label: 'name',
    value: 'directors.name'
  },
  // {
  //   label: ':LABEL',
  //   value: 'director',
  //   default: 'Director'
  // },
  {
    label: ':LABEL',
    value: 'person',
    default: 'Person'
  }
]
// 演员
const cast_fields = [
  {
    label: 'id:ID(Person-ID)',
    // value: 'casts.id',
    value: (row, field) => {
      if (row.casts) {
        if (row.casts.id == 'search') {
          return Math.random() * 1000000 + ''
        }
        else {
          return row.casts.id
        }
      }
      else {
        return Math.random() * 1000000 + ''
      }
    }
  },
  {
    label: 'name',
    value: 'casts.name'
  },
  // {
  //   label: ':LABEL',
  //   value: 'actor',
  //   default: 'Actor'
  // },
  {
    label: ':LABEL',
    value: 'person',
    default: 'Person'
  }
]
// 编剧
const writer_fields = [
  {
    label: 'id:ID(Person-ID)',
    // value: 'writers.id'
    value: (row, field) => {
      if (row.writers) {
        if (row.writers.id == 'search') {
          return Math.random() * 1000000 + ''
        }
        else {
          return row.writers.id
        }
      }
      else {
        return Math.random() * 1000000 + ''
      }
    }
  },
  {
    label: 'name',
    value: 'writers.name'
  },
  // {
  //   label: ':LABEL',
  //   value: 'writer',
  //   default: 'Writer'
  // },
  {
    label: ':LABEL',
    value: 'person',
    default: 'Person'
  }
]
// directed 关系
const rel_directed_fields = [
  {
    label: ':START_ID(Person-ID)',
    value: 'directors.id'
  },
  {
    label: ':TYPE',
    value: 'relType',
    default: 'Directed'
  },
  {
    label: ':END_ID(Movie-ID)',
    value: '_id'
  },
]
// acted_in 关系
const rel_acted_fields = [
  {
    label: ':START_ID(Person-ID)',
    value: 'casts.id'
  },
  {
    label: ':TYPE',
    value: 'relType',
    default: 'Acted_in'
  },
  {
    label: ':END_ID(Movie-ID)',
    value: '_id'
  },
]
// written 关系
const rel_written_fields = [
  {
    label: ':START_ID(Person-ID)',
    value: 'writers.id'
  },
  {
    label: ':TYPE',
    value: 'relType',
    default: 'Written'
  },
  {
    label: ':END_ID(Movie-ID)',
    value: '_id'
  },
]

const movie_json2csvParser = new Parser({ fields: movie_fields });
const director_json2csvParser = new Parser({ fields: director_fields, unwind: 'directors' });
const cast_json2csvParser = new Parser({ fields: cast_fields, unwind: 'casts' });
const writer_json2csvParser = new Parser({ fields: writer_fields, unwind: 'writers' });
const directed_json2csvParser = new Parser({ fields: rel_directed_fields, unwind: 'directors' });
const acted_json2csvParser = new Parser({ fields: rel_acted_fields, unwind: 'casts' });
const written_json2csvParser = new Parser({ fields: rel_written_fields, unwind: 'writers' });


const movie_csv = movie_json2csvParser.parse(filmsData);
const director_csv = director_json2csvParser.parse(filmsData);
const cast_csv = cast_json2csvParser.parse(filmsData);
const writer_csv = writer_json2csvParser.parse(filmsData);
const directed_csv = directed_json2csvParser.parse(filmsData);
const acted_csv = acted_json2csvParser.parse(filmsData);
const written_csv = written_json2csvParser.parse(filmsData);

fs.writeFile('src/assets/movie.csv', movie_csv, () => {
  console.log("movie.csv 生成成功")
})
fs.writeFile('src/assets/director.csv', director_csv, () => {
  console.log("director.csv 生成成功")
})
fs.writeFile('src/assets/cast.csv', cast_csv, () => {
  console.log("cast.csv 生成成功")
})
fs.writeFile('src/assets/writer.csv', writer_csv, () => {
  console.log("writer.csv 生成成功")
})
fs.writeFile('src/assets/rel-directed.csv', directed_csv, () => {
  console.log("directed.csv 生成成功")
})
fs.writeFile('src/assets/rel-acted.csv', acted_csv, () => {
  console.log("acted.csv 生成成功")
})
fs.writeFile('src/assets/rel-written.csv', written_csv, () => {
  console.log("written.csv 生成成功")
})


// 打开 neo4j 桌面版 -> 选择数据库 -> manger -> terminal
// 删除数据库 rm -r data/databases/graph.db
// 导入新的数据:
/*
bin/neo4j-admin import --nodes /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/movie.csv \
--nodes /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/director.csv \
--nodes /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/cast.csv \
--nodes /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/writer.csv \
--relationships /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/rel-directed.csv \
--relationships /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/rel-acted.csv \
--relationships /Users/chenyulei/Documents/GitHub/movie-kg-backend/src/assets/rel-written.csv \
--ignore-duplicate-nodes true \
--ignore-missing-nodes true
*/