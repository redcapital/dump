const g = document.getElementById('g');
const cells = new Array(10);
for (let y = 14; y >= 0; y--) {
  const row = document.createElement('div');
  g.appendChild(row);
  const rowCells = [];
  for (let x = 0; x < 27; x++) {
    const cell = document.createElement('span');
    if (y == 0 && x > 0) {
      // X coord labels
      cell.textContent = String.fromCharCode(96 + x);
    }
    if (x == 0 && y > 0) {
      // Y coord labels
      cell.textContent = (y - 1).toString();
    }
    row.appendChild(cell);
    if (x > 0 && y > 0) {
      rowCells.push(cell);
    }
  }
  if (y > 0) {
    cells[y - 1] = rowCells;
  }
}


const s = 'a9 g4 c3 i3 b1 f6 f9 e4 y4 h4 h5 f3 a7 b0 e3 d3 j1 a3 f6 c9 m6 g1 a6 h3 r6 h6 g4 bb o0 a7 k2 a5 s3 b5 h3 a6 a7 b9 g1 w6 c8 c6 a6 h1 i3 g5 o4 c4';
const moves = s.split(' ').map((coord) => {
  const x = coord.charCodeAt(0) - 97;
  const y = coord[1] == 'b' ? 11 : parseInt(coord[1]);
  return { x, y };
});

let move = 0;

function forward() {
  if (move === moves.length) {
    return;
  }
  const {x, y} = moves[move++];
  const content = cells[y][x].textContent;
  const classes = cells[y][x].classList;
  if (classes.contains('o2')) {
    classes.add('o3');
  } else if (classes.contains('o1')) {
    classes.add('o2');
  } else {
    classes.add('o1');
  }
  cells[y][x].textContent = content ? `${content}, ${move}` : move;
}

function backward() {
  if (move < 1) {
    return;
  }
  const {x, y} = moves[--move];
  const content = cells[y][x].textContent;
  const classes = cells[y][x].classList;
  if (classes.contains('o3')) {
    classes.remove('o3');
  } else if (classes.contains('o2')) {
    classes.remove('o2');
  } else {
    classes.remove('o1');
  }
  cells[y][x].textContent = content.split(', ').slice(0, -1).join(', ');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    forward();
  } else if (e.key === 'ArrowLeft') {
    backward();
  }
});
//moves.forEach((move, idx) => {
  //const { x, y } = move;;
  //const content = cells[y][x].textContent;
  //const classes = cells[y][x].classList;
  //if (classes.contains('o2')) {
    //classes.add('o3');
  //} else if (classes.contains('o1')) {
    //classes.add('o2');
  //} else {
    //classes.add('o1');
  //}
  //cells[y][x].textContent = content ? `${content}, ${idx}` : idx;
//});

//cells[0][0].textContent = 'asdf';
//cells[0][5].textContent = 'asdf';
//cells[9][5].textContent = 'asdf';
