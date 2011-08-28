// Axes:
//        y
//      +----+
//     /    /|
//    +----+ | x
//    |    | +
//    |    |/
//    +----+
//      z

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

Cube.prototype.net = function() {
  function row(r) {
    var s=''
    for (var i in r)
      s += r[i][0]
    return s
  }
  //    zr
  //    yo
  // xr zo xo
  //    yr
  var s = ''

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
  var cube = new Cube;
  console.log(cube.net())
}
