class Zuobiao{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  equal(move){
    return this.x === move.x && this.y === move.y
  }
}

module.exports = Zuobiao;