class Matrix{

  constructor(dm){
    this.num = 6
    this.col = 6
    if(dm) this.dm = dm
    else this.init()
  }
  init(){
    this.dm = [
      0, 1, 1, 1, 1, 0,
      1,1,1,1,1,1,
      1,1,1,1,1,1,
      0,0,0,0,0,0,
      0,0,0,0,0,0,
      0,0,-1,-1,0,0
    ]
  }

  get(x, y){
    return this.dm[x*this.col+y]
  }
  set(x, y, value){
    this.dm[x*this.col+y] = value
  }

  isInBounds(x,y){
    return x>=0 && x< this.num && y>=0&& y<this.col
  }

  copy(){
    var matrix = new Matrix(this.dm.concat([]))
    return matrix
  }

  index(x) {
    return this.dm[x]
  }
}

module.exports = Matrix;