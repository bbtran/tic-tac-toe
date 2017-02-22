$(document).ready(function() {
  function Player(xOrO) {
    this.symbol = xOrO;
    this.playerPicks = [];
  }
  Player.prototype.constructor = Player;
  
  var pickCount = 0;
  var winner = null;
  var current;
  var player1 = new Player("X");
  var player2 = new Player("O");

  //WINNING OUTCOMES
  var winning = [
    ['r1c1', 'r1c2', 'r1c3'],
    ['r2c1', 'r2c2', 'r2c3'],
    ['r3c1', 'r3c2', 'r3c3'],
    ['r1c1', 'r2c1', 'r3c1'],
    ['r1c2', 'r2c2', 'r3c2'],
    ['r1c3', 'r2c3', 'r3c3'],
    ['r1c1', 'r2c2', 'r3c3'],
    ['r1c3', 'r2c2', 'r3c1'],
  ];

  // RANDOMIZE STARTING PLAYER
  function randomPlayerStart(first, second){
    var startingPlayer;
    var start = Math.ceil(Math.random() * 2);
    if (start === 1) {
      startingPlayer = first;
    } else if (start === 2){
      startingPlayer = second;
    }
    return startingPlayer;
  }

  //START GAME BUTTON
  function startGame() {
    // $('.colbox').each(function(item) {
    //   $(item).text('');
    // });
    current = randomPlayerStart(player1, player2);
    $('.currentPlayer').text(current.symbol + ' Begins First');
  }
  $('.startGame').on('click', function(){
    startGame();
    $('.startGame').hide();
  });

  //BOX CLICK HANDLER
  $('.colbox').on('click', function(e){
    var selectedId = this.id || e.target.id;
    if(!current) {
      alert('Please Press Start')
    } else {
      if($(this).text() === 'X' || $(this).text() === 'O'){
        alert('This box has already been selected');
      } else {
        if(winner !== null) {
          console.log('inhere');
          alert('The game has already ended. Please play again');
        } else {
          current.playerPicks.push(selectedId);
          console.log(this);
          $(this).text(''+current.symbol);
          if(checkWinner(current.playerPicks)){
            winner = current;
            $('.container').append('<p class="selectedBox"> Player '+ winner.symbol+' wins!');
          }
          if(current === player1) {
            current = player2;
          } else {
            current = player1;
          }
        }
      }
    }
  });

  // PLAY AGAIN HANDLER
  $('.playAgain').on('click', function(e){
    e.preventDefault();
    $('.container .colbox').html('');
    $('.selectedBox').remove();
    $('.currentPlayer').text('');
    $('.startGame').show();
    pickCount = 0;
    winner = null;
    current = null;
    player1 = new Player("X");
    player2 = new Player("O");
  });

  // HELPERS
  function checkWinner(playerArr){
    var winFlag = false;
    if(playerArr.length < 3) {return false;}
    var checkWinning = function(currArr){
      for(var i=0; i<currArr.length; i++) {
        if(playerArr.includes(currArr[i]) === false){
          return false;
        }
      }
      return true;
    };
    for(var j=0; j<winning.length; j++) {
      if (winFlag === false){
        winFlag = checkWinning(winning[j]);
      }
    }
    console.log(winFlag);
    return winFlag;
  }

});






