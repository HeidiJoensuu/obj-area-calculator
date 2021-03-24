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
  let total= 0

  const vertices = rawDataVertices
  .filter( vertice => vertice.includes('v'))
    .map(vertice => {
      vertice = vertice.replace('v  ', '')
      vertice = vertice.replace('\r', '')
      const index = vertice.split(' ')
      return {x: Number(index[0]), y: Number(index[1]), z: Number(index[2])}
  });

  const triangles = rawDataTriangles
    .filter( triangle => triangle.includes('f'))
    .map(triangle => {
      triangle = triangle.replace('f ', '')
      triangle = triangle.replace('\r', '')
      const index = triangle.split(' ')
      return { a: Number(index[0]-1), b: Number(index[1]-1), c: Number(index[2]-1)}
  });

  triangles.forEach(triangle => {
    const a1 = new Vector3(vertices[triangle.a].x, vertices[triangle.a].y, vertices[triangle.a].z)
    const a2 = new Vector3(vertices[triangle.a].x, vertices[triangle.a].y, vertices[triangle.a].z)
    const b = new Vector3(vertices[triangle.b].x, vertices[triangle.b].y, vertices[triangle.b].z)
    const c = new Vector3(vertices[triangle.c].x, vertices[triangle.c].y, vertices[triangle.c].z)
    const x = new Vector3(a1.substract(b))
    const y = new Vector3(a2.substract(c))
    const f = x.cross(y)
    const length = f.length()/2
    total+=length
  })
  console.log(Number.parseFloat(total).toFixed(3));
})
