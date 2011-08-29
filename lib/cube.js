// Axes:
//        y
//      +----+
//     /    /|
//    +----+ | x
//    |    | +
//    |    |/
//    +----+
//      z
//
// The 0,0 corner of each obverse face touches the 0,0 corner of each other obverse face.
// Likewise for the reverse faces.

var Cube = exports.Cube = function() {
  this.__init__.apply(this,arguments)
}

Cube.prototype.__init__ = function() {
  this.size = 3

  this.color = 'red green blue yellow white orange'.split(' ')

  this.face = {
    x: {
         obverse: this.square(this.color[0]),
         reverse: this.square(this.color[1])
       },
    y: {
         obverse: this.square(this.color[2]),
         reverse: this.square(this.color[3])
       },
    z: {
         obverse: this.square(this.color[4]),
         reverse: this.square(this.color[5])
       }
  }

  this.setRelations()
}

Cube.prototype.otherAxes = function(a) {
  switch(a) {
    case 'x': return ['y','z']
    case 'y': return ['z','x']
    case 'z': return ['x','y']
  }
}

Cube.prototype.setRelations = function() {
  var axes = 'xyz'.split(''),
      faces = 'obverse reverse'.split(' '),
      compasses = 'north east south west'.split(' ')

  this.relations = {}
  for (var i in axes) {
    var axis = axes[i]

    this.relations[axis] = {}
    for (var j in faces) {
      var face = faces[j]

      this.relations[axis][face] = {}
      for (var k in compasses) {

        var compass = compasses[k],
            otherAxis,
            otherFace,
            otherCompass

        otherAxis = this.otherAxes(axis)
        if (compass in {east:1,west:1})
          otherAxis.reverse()
        otherAxis = otherAxis[0]

        switch(compass) {
          case 'north': otherFace = face==='obverse' ? 'obverse' : 'reverse'; break;
          case 'east':  otherFace = face==='obverse' ? 'reverse' : 'obverse'; break;
          case 'south': otherFace = face==='obverse' ? 'reverse' : 'obverse'; break;
          case 'west':  otherFace = face==='obverse' ? 'obverse' : 'reverse'; break;
        }

        switch(compass) {
          case 'north': otherCompass = 'west';  break;
          case 'east':  otherCompass = 'east';  break;
          case 'south': otherCompass = 'south'; break;
          case 'west':  otherCompass = 'north'; break;
        }

        this.relations[axis][face][compass] = {
          axis: otherAxis,
          face: otherFace,
          compass: otherCompass
        }
      }
    }
  }

  // xon = yow
  // xoe = zre
  // xos = yrs
  // xow = zon
  //
  // zon = xow
  // zoe = yre
  // zos = xrs
  // zow = yon
  //
  // zrn = yrw
  // zre = xoe
  // zrs = yos
  // zrw = xrn
  //
  // otherFace = face+1

}

Cube.prototype.square = function(c) {
  var a = [], b
  for (var i=0; i<this.size; i++) {
    b = []
    for (var j=0; j<this.size; j++) {
      b.push(c)
    }
    a.push(b)
  }

  return a
}

Cube.prototype.rotate = function(axis, platter, direction) {
  // Axis: x, y, z
  // Platter: 0 = obverse, 1 = middle, 2 = reverse
  // Direction (assuming obverse is north): 0 = east, 1 = west
  var faces = 'xzy'.replace(axis,'').split('')

  if (platter === 0)
    this.face[axis].obverse = this.rotateSquare(this.face[axis].obverse, 1)
  else if (platter === this.size-1)
    this.face[axis].reverse = this.rotateSquare(this.face[axis].reverse, -1)

}

Cube.prototype.net = function() {
  //    zr
  //    yo
  // xr zo xo
  //    yr

  var s = '',
      row = function(r) {
        var s=''
        for (var i in r)
          s += r[i][0]
        return s
      }

  s += '    '+row(this.face.z.reverse[0])+'\n'
  s += '    '+row(this.face.z.reverse[1])+'\n'
  s += '    '+row(this.face.z.reverse[2])+'\n'
  s += '\n'
  s += '    '+row(this.face.y.obverse[0])+'\n'
  s += '    '+row(this.face.y.obverse[1])+'\n'
  s += '    '+row(this.face.y.obverse[2])+'\n'
  s += '\n'
  s += row(this.face.x.reverse[0])+' '+row(this.face.z.obverse[0])+' '+row(this.face.x.obverse[0])+'\n'
  s += row(this.face.x.reverse[1])+' '+row(this.face.z.obverse[1])+' '+row(this.face.x.obverse[1])+'\n'
  s += row(this.face.x.reverse[2])+' '+row(this.face.z.obverse[2])+' '+row(this.face.x.obverse[2])+'\n'
  s += '\n'
  s += '    '+row(this.face.y.reverse[0])+'\n'
  s += '    '+row(this.face.y.reverse[1])+'\n'
  s += '    '+row(this.face.y.reverse[2])+'\n'
  s += '\n'

  return s
}

if (!module.parent) {
  var cube = new Cube,
      util = require('util')
  console.log(util.inspect(cube.relations, true, null))
  //console.log(cube.net())
}
