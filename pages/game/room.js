var MoveUtil = require('./MoveUtil')

var Board = require('./Board')

var board = new Board();
for(var i = 0; i< 200; i++){

  var move1 = MoveUtil.bestMove(board,5,true)
  board.move(move1)
  board.printChessBoard()

  if(board.checkOver(i)){
    break
  }

  var move2 = MoveUtil.bestMove(board,4,false)
  board.move(move2)
  board.printChessBoard()

  if(board.checkOver(i)){
    break
  }

}