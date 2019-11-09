
document.getElementById("new-game-button").addEventListener("click", function (event) {
  document.querySelector(".bigsquare").innerHTML = `
  <div class="row">
  <div class="square grey" square-id="0"></div>
  <div class="square grey" square-id="1"></div>
  <div class="square grey" square-id="2"></div>
  <div class="square grey" square-id="3"></div>
  </div>

  <div class="row">
  <div class="square grey" square-id="4"></div>
  <div class="square grey" square-id="5"></div>
  <div class="square grey" square-id="6"></div>
  <div class="square grey" square-id="7"></div>
  </div>

  <div class="row">
  <div class="square grey" square-id="8"></div>
  <div class="square grey" square-id="9"></div>
  <div class="square grey" square-id="10"></div>
  <div class="square grey" square-id="11"></div>
  </div>

  <div class="row">
  <div class="square grey" square-id="12"></div>
  <div class="square grey" square-id="13"></div>
  <div class="square grey" square-id="14"></div>
  <div class="square grey" square-id="15"></div>
  </div>
  `;

  //reset message at each game start
  document.querySelector(".message").innerHTML = `
  <ul>
  <li>The squares will appear during 2 seconds</li>
  <li>Memorize their positions</li>
  <li>With your excellent memory, click on their positions once they disappear</li>
  </ul>`

  //add start button
  var startBtn = document.createElement("BUTTON");
  startBtn.innerHTML = "Start Game";
  startBtn.setAttribute("id", "start-button");
  document.querySelector(".buttons").appendChild(startBtn);

  //when the button start appears, the button new game temporarily not visible
  document.getElementById("new-game-button").style.display = "none";

  var allSquares = document.querySelectorAll(".square");
  var nbPositionstoGuess = Math.sqrt(allSquares.length);
  var memoryGame = new MemoryGame();
  var nbofRounds = 1;

  function startGame() {
    // reset table of random Index
    memoryGame.randomIndexTable = [];
    // before choosing new random Index
    memoryGame.chooseRandomIndex(nbPositionstoGuess, allSquares);
    console.log("memoryGame.randomIndexTable at start game",memoryGame.randomIndexTable)

    // reset format of squares randomly selected
    memoryGame.randomSquares.forEach(square => {
      square.classList.remove("pink");
      square.classList.add("grey");
    })
    memoryGame.randomSquares = [];
    // before choosing new random Squares
    memoryGame.chooseSquares(allSquares);

    //For each of 3 squares randomly selected, add a class to chnage its color from grey to pink during 1.5 secs
    setTimeout(function () {
      memoryGame.randomSquares.forEach(function (square) {
        square.classList.remove("grey");
        square.classList.add("pink");
        document.querySelector(".message").innerHTML = "GET READY";
      });

      setTimeout(function () {
        memoryGame.randomSquares.forEach(function (square) {
          square.classList.add("grey");
          square.classList.remove("pink");
          document.querySelector(".message").innerHTML = "IT'S YOUR TURN";
        });

      }, 2000)

    }, 1000);
  }

  function buildMatrix(n) {
    let $html = '';
    var counter =0;
    for (var i = 0; i < n; i++) {
      $html += `<div class="row">`
      for (var j = 0; j < n; j++) {
        $html += `<div class="square grey" square-id=${counter}></div>`;
        //$html += `<div class="square grey" square-id=${i*5 + j}></div>`;
        counter+=1;
      }
      $html += `</div>`;
    };
    document.querySelector(".bigsquare").innerHTML = $html;
  }

  var squareIdTable = [];
  function squareClicked(event) {
    let square = event.target;
    var squareId = Number(square.getAttribute("square-id"));
    

    if (memoryGame.randomIndexTable.indexOf(squareId) != -1) {
      // swap
      square.classList.remove("grey");
      square.classList.add("pink");
      console.log("memoryGame.randomIndexTable", memoryGame.randomIndexTable)
      
      if ((squareIdTable.indexOf(squareId) < 0) && (squareIdTable.length < nbPositionstoGuess)) {
        squareIdTable.push(squareId);
        console.log("squareIdTable",squareIdTable);
      }

      if ((squareIdTable.length === nbPositionstoGuess) && (nbofRounds < 3)) {
        //
        // Gagné (petit)
        //

        nbofRounds += 1;

        // Message de petit win
        setTimeout(function () {
          document.querySelector(".message").innerHTML = "That was a terrific start. But it's not finished yet, keep going !";
        }, 1500);


        // reconstruction d'une matrice 
        buildMatrix(nbofRounds + 3);
        allSquares = document.querySelectorAll(".square");
        nbPositionstoGuess = Math.sqrt(allSquares.length);
        console.log("nbPositionstoGuess",nbPositionstoGuess);
        squareIdTable=[];
        startGame();     
        document.querySelectorAll(".square").forEach(square => {
          square.onclick = squareClicked;
        })
        console.log(nbofRounds);


      }

      if ((squareIdTable.length === nbPositionstoGuess) && (nbofRounds >= 3)) {
        //
        // Gagné (grand)
        //
        document.querySelector(".message").innerHTML = "YOU WIN !";
        document.querySelector(".bigsquare").innerHTML = `<div class="congrats"> <img src="congrats.gif"> </div>`;
        //The button new game appears again as an option
        document.getElementById("new-game-button").style.display = "";
      }
    } else {
      document.querySelector(".message").innerHTML = "You got it wrong ! Do a new game";
      document.querySelector(".bigsquare").innerHTML = `
      <img src="https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif">
      `

      //The button new game appears again as an option
      document.getElementById("new-game-button").style.display = "";
    };
  }

  document.getElementById("start-button").onclick = function () {
    startGame();

    // Ater the game starts, the start button will be removed
    document.getElementById("start-button").parentNode.removeChild(document.getElementById("start-button"));


    document.querySelectorAll(".square").forEach(square => {
      square.onclick = squareClicked;
    })
  };
});





