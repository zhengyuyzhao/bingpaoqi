
var Zuobiao = require('./Zuobiao.js')
class Move{
  constructor(x1, y1, x2, y2, isGun){
    this.begin = new Zuobiao(x1, y1);
    this.end = new Zuobiao(x2, y2);
    this.isGun = isGun;
    this.score = 0;
  }
}

module.exports = Move;