// pages/game/game.js.js
var Board = require('./Board.js')
var MoveUtil = require('./MoveUtil.js')
const ME = 1
const AI = 0
const GUN = -1
const SOILDER = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    start: "开始游戏",
    num: [],
    score: 0,
    bestScore: 0, // 最高分
    endMsg: '',
    over: false,  // 游戏是否结束 
    current: {  //当前谁的回合
      player: ME,
      role: GUN
    },
    first: ME,
    myrole: GUN,
    count: 0,
    lastSelect: -1,
    winner: -1,
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.gameStart()
  },

  gameStart: function () {  // 游戏开始
    var board = new Board();
    this.setData({
      board: board
    });

    this.setData({
      hidden: true,
      over: false,
      score: 0,
      current: {  //当前谁的回合
        player: ME,
        role: this.data.current.role
      },
      first: ME,
      myrole: this.data.current.role,
      count: 0,
      lastSelect: -1,
      lastMove: -1,
      winner: -1,
      result: ''
    });
    this.setData({
      num: this.data.board.showData(this.data.myrole)
    })

  },
  checkOver: function(){
    var win = this.data.board.checkOver()
    if(win === 0) return
    var winner = this.data.myrole === win ? ME : AI
    var result = this.data.myrole === win ? '胜利' : '失败'
    this.setData({
      winner: winner,
      result: result,
      over: true
    })
  },

  ontaped: function (tap){
    var id = tap.target.id
    var num = this.data.num
    var board = this.data.board
    var lastSelect = this.data.lastSelect
    var current = this.data.current
    if (current.player === ME){
      if (board.index(id) === current.role){
        this.setData({
            lastSelect: id
        })
      }else{
        if (lastSelect != -1){
          if (board.checkMove(lastSelect, id)){
            this.meMove(lastSelect, id)
            this.checkOver()
            this.aiMove()
            this.checkOver()
          }
        }
      }
    }
  },
  changeSide: function(){
    var board = new Board();
    this.setData({
      board: board
    });
    this.setData({
      hidden: true,
      over: false,
      score: 0,
      current: {  //当前谁的回合
        player: ME,
        role: -this.data.current.role
      },
      first: ME,
      myrole: -this.data.myrole,
      count: 0,
      lastSelect: -1,
      winner: -1,
      result: ''
    });
    this.setData({
      num: this.data.board.showData(this.data.myrole)
    });
  },

  meMove: function(a, b){
    this.data.board.moveIndex(a,b)
    this.updateView()
  },
  reversePlayer: function(){
    this.setData({
      current: {
        player: (this.data.current.player + 1) % 2,
        role: this.data.current.role * -1
      },
      count: this.data.count + 1
    })
  },
  aiMove: function(){
    this.data.board.aiMove(2, this.data.current.role === GUN)
    this.updateView()
  },
  
  updateView() {
    this.setData({
      hidden: true,
      over: false,
      lastSelect: -1,
      num: this.data.board.showData(this.data.myrole)
    });
    this.reversePlayer()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})