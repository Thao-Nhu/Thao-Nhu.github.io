class MemoryGame {
  constructor(){
    this.randomSquares=[];
    this.randomIndexTable=[];
    this.index=0;
  }

  chooseRandomIndex (nbPositionstoGuess,allSquares) {
    while (this.randomIndexTable.length<nbPositionstoGuess){      
      this.index=Math.floor(Math.random()*allSquares.length);
      if (this.randomIndexTable.indexOf(this.index) < 0) {     
        this.randomIndexTable.push(this.index);
      }
    }
      return this.randomIndexTable;
    }
  
  chooseSquares(allSquares) {
    this.randomIndexTable.forEach(randomIndex => {this.randomSquares.push(allSquares[randomIndex]);})
    return this.randomSquares;
  }

}