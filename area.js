var fs = require('fs');
var Vector3 = require('vector-3');

const file = process.argv.slice(2).toString()

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return
  }

  data = data.split('# 1440 vertices');
  const rawDataVertices = data[0].split('\n')
  const rawDataTriangles = data[1].split('\n')
  let triangles = []
  let vertices = []

  rawDataVertices.forEach(vertice => {
    if (vertice.includes('v')) {
      vertice = vertice.replace('v  ', '')
      vertice = vertice.replace('\r', '')
      const index = vertice.split(' ')
      vertices.push({ x: index[0], y: index[1], z: index[2]})
    }
  });

  rawDataTriangles.forEach(triangle => {
    if (triangle.includes('f')) {
      triangle = triangle.replace('f ', '')
      triangle = triangle.replace('\r', '')
    triangles.push(triangle)
    }
  });

})
