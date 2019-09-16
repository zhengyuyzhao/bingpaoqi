var Matrix = require('./Matrix.js')
var Zuobiao = require('./Zuobiao.js')
var Move = require('./Move.js')
var MoveUtil = require('./MoveUtil.js')
const GUN = -1;
const SOLDIER = 1;
const SPACE = 0;
class ChessBoard {

  init() {

    this.soldierCount = 16;
    this.gunMoveCount = 4;

    this.gun1 = new Zuobiao(5, 2)
    this.gun2 = new Zuobiao(5, 3)
  }
  copy() {
    var board = new ChessBoard(this.dm.copy())
    board.soldierCount = this.soldierCount
    board.gunMoveCount = this.gunMoveCount
    board.gun1 = this.gun1
    board.gun2 = this.gun2
    return board
  }

  constructor(dm) {
    if (!dm) this.dm = new Matrix()
    else this.dm = dm
    this.init()
  }

  move(move) {
    if (move.isGun) {
      if (this.dm.get(move.end.x, move.end.y) == SOLDIER) {
        this.soldierCount = this.soldierCount - 1;
      }
      if (this.gun1.equal(move.begin)) {
        this.gun1 = move.end;
      } else {
        this.gun2 = move.end;
      }
    }

    try {
      this.dm.set(move.begin.x, move.begin.y, SPACE);
      this.dm.set(move.end.x, move.end.y, move.isGun ? GUN : SOLDIER);
    } catch (e) {
      console.log(e)
    }
    this.gunMoveCount = this.getGunCanMoves().length;
    return this;
  }

  moveNewBoard(move) {
    var board = this.copy();
    return board.move(move);
  }

  getCanMoves(isGun) {
    return isGun ? this.getGunCanMoves() : this.getSoldierCanMoves();
  }

  getSoldierCanMoves() {
    var moves = [];
    var x = 0;
    for (var i = 0; i < this.dm.col; i++) {
      for (var j = 0; j < this.dm.num; j++) {
        if (this.dm.get(i, j) == SOLDIER) {
          moves = moves.concat(this.getEverySoldierMoves(this.dm, i, j));
          x++;
          if (x >= 16) {
            return moves;
          }
        }
      }
    }

    return moves;
  }

  getEverySoldierMoves(qipan, x1, y1) {
    var moves = [];
    if (x1 > 0 && qipan.get(x1 - 1, y1) == SPACE) {
      moves.push(new Move(x1, y1, x1 - 1, y1, false));
    }

    if (x1 + 1 < qipan.num && qipan.get(x1 + 1, y1) == SPACE) {
      moves.push(new Move(x1, y1, x1 + 1, y1, false));
    }

    if (y1 > 0 && qipan.get(x1, y1 - 1) == SPACE) {
      moves.push(new Move(x1, y1, x1, y1 - 1, false));
    }

    if (y1 + 1 < qipan.num && qipan.get(x1, y1 + 1) == SPACE) {
      moves.push(new Move(x1, y1, x1, y1 + 1, false));
    }

    return moves;
  }


  getGunCanMoves() {
    var moves = [];

    moves = moves.concat(this.getEveryAvalibleGunMoves(this.dm, this.gun1.x, this.gun1.y));
    moves = moves.concat(this.getEveryAvalibleGunMoves(this.dm, this.gun2.x, this.gun2.y));
    return moves;
  }

  getEveryAvalibleGunMoves(qipan, x1, y1) {
    var moves = [];
    if (qipan.isInBounds(x1 - 1, y1) && qipan.get(x1 - 1, y1) == SPACE) {
      moves.push(new Move(x1, y1, x1 - 1, y1, true));
      if (qipan.isInBounds(x1 - 2, y1) && qipan.get(x1 - 2, y1) == SOLDIER) {
        moves.push(new Move(x1, y1, x1 - 2, y1, true));
      }
    }

    if (qipan.isInBounds(x1 + 1, y1) && qipan.get(x1 + 1, y1) == SPACE) {
      moves.push(new Move(x1, y1, x1 + 1, y1, true));
      if (qipan.isInBounds(x1 + 2, y1) && qipan.get(x1 + 2, y1) == SOLDIER) {
        moves.push(new Move(x1, y1, x1 + 2, y1, true));
      }
    }

    if (qipan.isInBounds(x1, y1 - 1) && qipan.get(x1, y1 - 1) == SPACE) {
      moves.push(new Move(x1, y1, x1, y1 - 1, true));
      if (qipan.isInBounds(x1, y1 - 2) && qipan.get(x1, y1 - 2) == SOLDIER) {
        moves.push(new Move(x1, y1, x1, y1 - 2, true));
      }
    }

    if (qipan.isInBounds(x1, y1 + 1) && qipan.get(x1, y1 + 1) == SPACE) {
      moves.push(new Move(x1, y1, x1, y1 + 1, true));
      if (qipan.isInBounds(x1, y1 + 2) && qipan.get(x1, y1 + 2) == SOLDIER) {
        moves.push(new Move(x1, y1, x1, y1 + 2, true));
      }
    }


    return moves;
  }

  printChessBoard() {
    console.log("-----------------");
    for (var i = 0; i < this.dm.num; i++) {
      var line = ''
      for (var j = 0; j < this.dm.num; j++) {
        var value = this.dm.get(i, j);
        var str = "";
        if (value === SOLDIER) { str = "兵"; }
        if (value === SPACE) { str = "__"; }
        if (value === GUN) { str = "炮"; }
        line += str + " ";
      }
      console.log(line);
    }
    console.log("-----------------");
  }

  checkOver() {
    if (this.gunMoveCount == 0) {
      console.log("----------------小兵胜利---------------${this.gunMoveCount}");
      return SOLDIER;
    }
    if (this.soldierCount <= 3) {
      console.log("----------------大炮胜利---------------${this.soldierCount}");
      return GUN;
    }
    return SPACE;
  }

  checkMove(a,b){
    a = parseInt(a)
    b = parseInt(b)
    if ((Math.abs(a - b) === 1 || (Math.abs(a - b) === 6)) && this.dm.index(b) === SPACE) {
      return true;
    }
    var begin = this.dm.index(a)
    if(begin === GUN){
      if ((Math.abs(a - b) === 2 || (Math.abs(a - b) === 12)) && (this.dm.index(parseInt((a+b)/2))) === SPACE  && this.dm.index(b) === SOLDIER) {
        return true;
      }
    }
    return false;
  }

  moveIndex(a,b){
    var isGun = false
    console.log(`---a---b--${a}-${b}`)
    console.log(`---this.dm.index(a)--${this.dm.index(a)}`)
    console.log(`---isGun--${isGun}`)
    if(this.dm.index(a) === GUN) isGun = true
    var move = new Move(parseInt(a / 6), a % 6, parseInt(b / 6) , b % 6,  isGun)
    this.move(move)
  }
  aiMove(deep, isGUn){
    var move = MoveUtil.bestMove(this, deep, isGUn)
    this.move(move)
  }

  index(a){
    return this.dm.index(a)
  }

  showData(role) {
    var data = []
    var row = []
    for (var i = 0; i < 36; i++) {

      var value = this.dm.index(i)
      var key = ''
      if (value === GUN) key = '炮'
      else if (value === SOLDIER) key = '兵'
      else key = ''
      row.push({
        key: key,
        id: i,
        value: value
      })
      if (i % 6 === 5) {
        data.push(row.concat([]))
        row = []
      }
    }
    if (role === GUN){
      return data
    }else{
      return data.reverse()
    }

  }
}



module.exports = ChessBoard;