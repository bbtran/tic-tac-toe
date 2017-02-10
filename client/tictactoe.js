$(document).ready(function() {
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
  var pickCount = 0;

  var winner;

  function Player(xOrO) {
    this.symbol = xOrO;
    this.playerPicks = [];
  }
  Player.prototype.constructor = Player;

  var current;
  var player1 = new Player("X");
  var player2 = new Player("O");

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

  function startGame() {
    $('.colbox').each(function(item) {
      $(item).text('');
    });
    current = randomPlayerStart(player1, player2);
    $('.currentPlayer').text(current.symbol + ' Begins First');
  }

  $('.startGame').on('click', function(){
    startGame();
    $('.startGame').hide();
  });

  $('.colbox').on('click', function(e){
    var selectedId = this.id || e.target.id;
    if(!current) {
      alert('Please Press Start')
    } else {
      if($(this).text() === 'X' || $(this).text() === 'O'){
        alert('This box has already been selected');
      } else {
        current.playerPicks.push(selectedId);
        $(this).text(''+current.symbol);
        if(checkWinner(current.playerPicks)){
          winner = current;
          $('.container').append('<p> Player '+ winner.symbol+' wins!');
        }
        if(current === player1) {
          current = player2;
        } else {
          current = player1;
        }
      }
    }
  });



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






