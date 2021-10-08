var n = window.prompt("Enter the size of board: ");
const x=n

document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let squares = []
  const width = parseInt(n)
  let score = 0
let s=width
  //create the playing board
  function createBoard() {
    for (let i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2
      checkForGameOver()
    } else generate()
  }

  function moveRight() {
    for (let i=0; i < s*s; i++) {
      if (i % s === 0) {
        let row=[]
        let total=[]
        for(let j=0;j<s;j++){
          total[j] = squares[i+j].innerHTML
          row.push(parseInt(total[j]))
        }
        let filteredRow = row.filter(num => num)
        
        let missing = s - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)
        for(let k=0;k<s;k++){
          squares[i+k].innerHTML = newRow[k]
        }
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < s*s; i++) {
      if (i % s === 0) {
        let total=[]
        let row=[]
        for(let j=0;j<s;j++){
          total[j] = squares[i+j].innerHTML
          row.push(parseInt(total[j]))
         
        }
        

        let filteredRow = row.filter(num => num)
        let missing = s - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        for(let k=0;k<s;k++){
          squares[i+k].innerHTML = newRow[k]
        }
      }
    }
  }


  function moveUp() {
    for (let i=0; i < s; i++) {
      let total=[]
      let column=[]
      total[0] = squares[i].innerHTML
      column.push(parseInt(total[0]))
      for (let j=1;j<s;j++){
        total[j]=squares[i+(width*j)].innerHTML
        column.push(parseInt(total[j]))
      }
      

      let filteredColumn = column.filter(num => num)
      let missing = s - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)
        squares[i].innerHTML=newColumn[0]
      for(let k=1;k<s;k++){
        squares[i+(width*k)].innerHTML=newColumn[k]
      }
    }
  }

  function moveDown() {
    for (let i=0; i < s; i++) {
      let total=[]
      let column=[]
      total[0] = squares[i].innerHTML
      column.push(parseInt(total[0]))
      for (let j=1;j<s;j++){
        total[j]=squares[i+(width*j)].innerHTML
        column.push(parseInt(total[j]))
      }
      

      let filteredColumn = column.filter(num => num)
      let missing = s - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML=newColumn[0]
      for(let k=1;k<s;k++){
        squares[i+(width*k)].innerHTML=newColumn[k]
      }
    }
  }

  function combineRow() {
    for (let i =0; i < s*s-1; i++) {
      if (squares[i].innerHTML === squares[i +1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < s*(s-1); i++) {
      if (squares[i].innerHTML === squares[i +width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'CONGRATULATION YOU WIN'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'GAME OVER'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }


  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#add8e6'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#6495ed'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#00ffef' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#0abab5' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#00b7eb' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#0072bb' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#007fff' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#4666ff' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#4166fs' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#4169e1' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#0072bb' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#0067a5' 
    }
}
addColours()

var myTimer = setInterval(addColours, 50)

})
