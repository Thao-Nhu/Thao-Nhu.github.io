# Project 1 | Find the squares - by Thao Nhu NGUYEN


## Overview
It's a memory game, composed of 3 rounds
- **1<sup>st</sup> round**: The player needs to remember 4 squares over a matrix of 4*4 squares
- **2<sup>nd</sup> round**: The player needs to remember 5 squares over a matrix of 5*5 squares
- **3<sup>rd</sup> round**: The player needs to remember 6 squares over a matrix of 6*6 squares

The squares to be remembered, originally grey, will turn pink during 2 seconds, then turn back to grey. At that moment, the player will start to play and click on the positions that they have remembered

## Logics
It was made with DOM.

Each square was a div with square-id
```js
function buildMatrix(n) {
  let $html = '';
  var counter =0;
  for (var i = 0; i < n; i++) {
    $html += `<div class="row">`
    for (var j = 0; j < n; j++) {
      $html += `<div class="square grey" square-id=${counter}></div>`;
      counter+=1;
    }
    $html += `</div>`;
  };
  document.querySelector(".bigsquare").innerHTML = $html;
}
```

![drawing alt text](https://docs.google.com/drawings/d/1bODbncHYqBu5btLbG7lM4r8OG5X6Q1Y9wjaGvxZJTxc/export/png)

4 squares are randomly selected and their square-ids are stored in randomSquares table

During 2 seconds, with setTimeout and classlist changes, the squares randomly selected will turn pink

When they turn back to grey, the player will need to try to click on the squares they have so far remembered

On click event, the id of the clicked square is added to the squareIdTable that is later compared to the randomSquares table
