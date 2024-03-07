function pathFinder(area){
  /*
    area is string which represent the two dimension data by \n.
    "000
    111
    000"
  */
  // transform area to a array
  area = area.split("\n").map(row => row.split('').map(e => parseInt(e)));
  
  const rows = area.length, cols = area[0].length;
  
  // create a table to record the min climb round from [0,0] to [cur_row,  cur_col]
  // -1 represent not calculate
  
  const table = Array.from({length: rows},  () => Array(cols).fill(-1));
  table[0][0] = 0;
  //console.log("initial:", table);
  
  // wrong: it is valid to tree, not to graph.
  // use breadth-first-search to calcluate the value in the table util the [N-1][N-1] is calcluated.
  const queue = [[0, 0]];
  const directions = [[-1,0], [1,0], [0,1], [0,-1]];
  while(queue.length > 0) {
    const [rowIdx, colIdx] = queue.shift(); // pop method: remove the first element of array and return it.
    //console.log("pop: ", rowIdx, colIdx, table[rowIdx][colIdx]);
//     if(rowIdx === rows -1 && colIdx === cols -1 ) break;
    
    for(const [dr, dc] of directions) {
      const newRowIdx = rowIdx + dr;
      const newColIdx = colIdx + dc;
      
      // not a valid location
      if(newRowIdx >= rows || newRowIdx < 0 || newColIdx >= cols || newColIdx < 0) continue; 
      
      
      const newDis = table[rowIdx][colIdx] + Math.abs(area[rowIdx][colIdx]  - area[newRowIdx][newColIdx]);
      if(table[newRowIdx][newColIdx] === -1 || newDis < table[newRowIdx][newColIdx]) {
        // after current generation(the distance to the [0,0]) loop, will calcluate the the value of the table[newRowIdx][newColIdx]; 
        if(table[newRowIdx][newColIdx] === -1) {
          //console.log("push: ", newRowIdx, newColIdx);
          queue.push([newRowIdx, newColIdx]);
         }
        table[newRowIdx][newColIdx] = newDis;
      }
    }
  }
  //console.log("result:", table);
  return table[rows-1][cols-1];
}
