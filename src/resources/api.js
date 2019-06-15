const db = require('../database/repository');
const query = require('./query.js');
module.exports = {
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
        // entity: result
        entity: handleResultByName(result)
      })
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
      res.send({
        status: true,
        entity: handleResultWithLimit(result)
      })
    })
  },
  getHighRateMovie: function (req, res, next) {
    db.execute(new query.GetHighRateMovie(), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({
        status: true,
        entity: handleResultWithLimit(result)
      })
    })
  },
  getPeopleFilmMost: function (req, res, next) {
    db.execute(new query.GetPeopleFilmMost(), (error, result) => {
      if (error) {
        res.send({
          status: false,
          entity: error,
          message: 'something went wrong'
        })
      }
      res.send({
        status: true,
        entity: handleResultWithLimit(result)
      })
    })
  }

}

// 处理含有关系的
function handleResultByName(results) {
  let result = {
    nodes: [],
    links: []
  }
  let nodeIds = [] // 用于判断重复节点
  let nodeSet = new Set()
  results.forEach(element => {
    let targetId = element._fields[0].properties.id
    if (nodeIds.indexOf(targetId) === -1) {
      nodeSet.add({
        id: targetId,
        name: element._fields[0].properties.name,
        type: element._fields[0].labels[0],
        rating: element._fields[0].properties.rating
      })
      nodeIds.push(targetId)
    }
    let sourceId = element._fields[1].properties.id
    if (nodeIds.indexOf(sourceId) === -1) {
      nodeSet.add({
        id: sourceId,
        name: element._fields[1].properties.name,
        type: element._fields[1].labels[0],
        rating: element._fields[1].properties.rating
      })
      nodeIds.push(sourceId)
    }
    let linkId = sourceId + targetId
    if (result.links.find((link, index) => {
      if (link.id === linkId) {
        result.links[index].value = result.links[index].value + '/' + element._fields[2]
        return true
      }
    })) { }
    else {
      result.links.push({
        source: sourceId,
        target: targetId,
        id: linkId,
        value: element._fields[2],
      })
    }
  });
  result.nodes = Array.from(nodeSet)
  return result
}

// 处理纯节点的
function handleResultWithLimit(results) {
  let result = {
    nodes: [],
    links: []
  }
  let nodeSet = new Set()
  results.forEach(element => {
    nodeSet.add({
      id: element._fields[0].properties.id,
      name: element._fields[0].properties.name,
      type: element._fields[0].labels[0],
      rating: element._fields[0].properties.rating
    })
  });
  result.nodes = Array.from(nodeSet)
  return result
}