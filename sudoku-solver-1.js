function sudoku(puzzle) {
  //return the solved puzzle as a 2d array of 9 x 9 
  function solution(p, i, j) {
//     console.log(i, j, !p);
    if(i === -1 && j === -1) return p;
    
    let res = null;
    const f = next(p, i, j);
    while((p[i][j] = f()) !== 0) {
      res = solution(p, ...findNextZeroIndex(p, i, j));
      if(res) break;
      // place after 'if(res) break', else place before it, 
      // we will get the original puzzle
      p[i][j] = 0;
    }
    return res;
  }
  
  return solution(puzzle, ...findNextZeroIndex(puzzle, 0, -1))
}

function findNextZeroIndex(p, currRow, currCol) {

  for(let i = currCol + 1; i < 9; ++i) 
    if(p[currRow][i] === 0) return [currRow, i];
  for(let i = currRow + 1; i < 9; ++i) {
    for(let j = 0; j < 9; ++j) {
      if(p[i][j] === 0) return [i, j];
    }
  }
  return [-1, -1];
}

function next(p, i, j) {
  const rowHave = Array.from({length: 9}, (_, idx) => p[i][idx]);
  const colHave = Array.from({length: 9}, (_, idx) => p[idx][j]);
  
  const rectRow = (i/3)>>0, rectCol = (j/3)>>0;
  const startRow = rectRow * 3, startCol = rectCol * 3;
  const rectHave = [];
  for(let i = 0; i < 3; ++i) {
    for(let j = 0; j < 3; ++j) {
      rectHave.push(p[startRow + i][startCol + j]);
    }
  }
//   console.log("********************************")
//   console.log(rectHave)
//   console.log(rowHave)
//   console.log(colHave)
  const have = colHave.concat(rowHave).concat(rectHave);
  
  
  
  
  const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(e => !have.includes(e));
  let idx = 0;
  return () => {
    if(idx < choices.length) return choices[idx++];
    return 0;
  }
}
