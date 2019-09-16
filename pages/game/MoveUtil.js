var Move = require('./Move.js')
const MAX_VALUE = 100000
class MoveUtils {
  static bestMove(chessBoard, times, isGun) {
    var scoreA = MAX_VALUE;
    var scoreB = -MAX_VALUE;
    return this.getMax(chessBoard, times, times, isGun, isGun, scoreA, scoreB);
  }

  static getMax(qipan, deep, initDeep, isGun, init, scoreA, scoreB) {
    var random = Math.random();
    var avalMoves = qipan.getCanMoves(isGun);

    if (avalMoves.length <= 0) {
      var end = new Move(-1, -1, -1, -1, isGun);
      var scoreMe = isGun === init ? -10000 : 10000;
      end.score = scoreMe;
      return end;
    }
    if (deep <= 0) {
      return this.getMoveNode(qipan, init, isGun, random, avalMoves, initDeep);
    }


    var temp = null;
    for (var move of avalMoves) {
      if (isGun == init) {
        var next = this.getMax(qipan.moveNewBoard(move), deep - 1, initDeep, !isGun, init, MAX_VALUE, scoreB);
        if (next != null && next.score > scoreB) {
          scoreB = next.score;
          temp = move;
          temp.score = scoreB;
          if (scoreB > scoreA) {
            return null;
          }
        }


      } else {
        var next = this.getMax(qipan.moveNewBoard(move), deep - 1, initDeep, !isGun, init, scoreA, -MAX_VALUE);
        if (next != null && next.score < scoreA) {
          scoreA = next.score;
          temp = move;
          temp.score = scoreA;
          if (scoreA < scoreB) {
            return null;
          }
        }
      }
    }
    return temp;

  }

  static getMoveNode(qipan, init, isGun, random, avalMoves, deep) {
    var treeMapMe = [];
    for (var moveNode of avalMoves) {
      var temp = qipan.moveNewBoard(moveNode);
      var scoreMe = this.getScore(temp, init);
      scoreMe += random;
      moveNode.score = scoreMe;
      treeMapMe.push([scoreMe, moveNode]);
    }
    treeMapMe.sort((a, b) => {
      return a[0] - b[0]
    })

    var result = (init == isGun ? treeMapMe[treeMapMe.length - 1][1] : treeMapMe[0][1]);
    //        result.score = (init == isGun ? treeMapMe.lastEntry() : treeMapMe.firstEntry()).getKey();
    return result;
  }

  static getScore(qipan, isGun) {
    var gunMoves = qipan.gunMoveCount;
    var soldierCount = qipan.soldierCount;
    if (isGun) {
      return gunMoves * 35 - soldierCount * 100;
    } else {
      return soldierCount * 100 - gunMoves * 35;
    }
  }
}

module.exports = MoveUtils;