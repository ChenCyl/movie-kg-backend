const db = require('../database/repository');
const query = require('./query.js');
module.exports = {

  // getNetByMovieTitle: function (req, res, next) {
  //   // console.log(req)
  //   const { title } = req.params;
  //   const result = db.execute(new query.GetNetByMovieTitle(title), (error, result) => {
  //     if (error) {
  //       res.send({
  //         status: false,
  //         entity: error,
  //         message: 'something went wrong'
  //       })
  //     }
  //     // res.send({ status: true, entity: result, message: 'Successfully!' })
  //     res.send(handleResultByMovieTitle(result))
  //   });
  // },
  getNetByName: function (req, res, next) {
    const { name } = req.params
    db.execute(new query.GetNetByName(name), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({
        status: true,
        entity: handleResultByName(result)
      })
      // res.send({ status: true, entity: result, message: 'Successfully!' })
    })
  },
  getMoviesWithLimit: function (req, res, next) {
    const { limit } = req.params
    db.execute(new query.GetMoviesWithLimit(limit), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      // res.send({ status: true, entity: result, message: 'Successfully!' })
      res.send({
        status: true,
        entity: handleResultWithLimit(result)
      })
    })
  },
  getPeopleWithLimit: function (req, res, next) {
    const { limit } = req.params
    db.execute(new query.GetPeopleWithLimit(limit), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      // res.send({ status: true, entity: result, message: 'Successfully!' })
      res.send({
        status: true,
        entity: handleResultWithLimit(result)
      })
    })
  }

}

function handleResultByName(results) {
  let result = {
    nodes: [],
    links: []
  }
  let targetNode = {
    id: results[0]._fields[0].properties.id,
    name: results[0]._fields[0].properties.name,
    type: results[0]._fields[0].labels[0]
  }
  // result.nodes.push(targetNode)
  let nodeIds = [] // 用于判断重复节点
  let nodeSet = new Set()
  results.forEach(element => {
    let sourceId = element._fields[1].properties.id
    if (nodeIds.indexOf(sourceId) === -1) {
      nodeSet.add({
        id: sourceId,
        name: element._fields[1].properties.name,
        type: element._fields[1].labels[0],
      })
      nodeIds.push(sourceId)
    }
    let linkId = sourceId + targetNode.id
    if (result.links.find((link, index) => {
      if (link.id === linkId) {
        result.links[index].value = result.links[index].value + '/' + element._fields[2]
        return true
      }
    })) { }
    else {
      result.links.push({
        source: sourceId,
        target: targetNode.id,
        id: linkId,
        value: element._fields[2]
      })
    }
  });
  result.nodes = Array.from(nodeSet)
  result.nodes.push(targetNode)
  return result
}

// function handleResultByPersonName(results) {
//   let result = {
//     nodes: [],
//     links: []
//   }
//   let person = {
//     id: results[0]._fields[0].properties.id,
//     name: results[0]._fields[0].properties.name,
//     type: 'Person'

//   }
//   // result.nodes.push(movie)
//   let nodeSet = new Set()
//   results.forEach(element => {
//     nodeSet.add({
//       id: element._fields[1].properties.id,
//       name: element._fields[1].properties.title,
//       type: 'Movie',

//     })
//     let linkId = + person.id + element._fields[1].properties.id
//     if (result.links.find((link, index) => {
//       if (link.id === linkId) {
//         result.links[index].value = result.links[index].value + '/' + element._fields[2]
//         return true
//       }
//     })) { }
//     else {
//       result.links.push({
//         source: person.id,
//         target: element._fields[1].properties.id,
//         id: linkId,
//         value: element._fields[2]
//       })
//     }
//   });
//   result.nodes = Array.from(nodeSet)
//   result.nodes.push(person)
//   return result
// }

function handleResultWithLimit(results) {
  let result = {
    nodes: [],
    links: []
  }
  // result.nodes.push(movie)
  let nodeSet = new Set()
  results.forEach(element => {
    nodeSet.add({
      id: element._fields[0].properties.id,
      name: element._fields[0].properties.name,
      type: element._fields[0].labels[0],
    })
  });
  result.nodes = Array.from(nodeSet)
  return result
}