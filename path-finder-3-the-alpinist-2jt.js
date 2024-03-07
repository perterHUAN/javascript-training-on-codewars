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
  // shortest path algorithem
  
  /* 
    dist array
    dist[i] the mindis from 0 to i.
    
    transfrom 2 dimension coordination to 1 dimension 
  */
  const dist = new Array(rows * cols).fill(Infinity);
  
  /*
    flag array
    
    flag[i] whether the mindis from 0 to i is already calcuated
    1: calculated
    0: not calculated
  */
  const flag = new Array(dist.length).fill(0);
  dist[0] = 0;
  
  // used to find the neigborhoods
  const directions = [[-1,0], [1,0], [0,1], [0,-1]];
  // console.log("Initial complete, go while")
  while(true) {
    // console.log("find min")
    // get min dist from not calcluated set
    let nextMinDistIdx = -1;
    let minDist = Infinity;
    for(let i = 0; i < dist.length; ++i) {
      if(!flag[i] && dist[i] < minDist) {
        minDist = dist[i];
        nextMinDistIdx = i;
      }
    }
    if(nextMinDistIdx === -1) break;
    // flag it, next circle not include it to search min, or in infinity circle
    // important !!!!
    flag[nextMinDistIdx] = 1;
   
    // console.log("min: ", nextMinDistIdx, minDist);
    
    // console.log("update")
    
    // update
    const row = (nextMinDistIdx / cols)>>0, col = nextMinDistIdx % cols;
    if(row === rows - 1 && col === cols - 1) return minDist;
    
    for(const [dr, dc] of directions) {
      const adjacentRow = row + dr;
      const adjacentCol = col + dc;
      if(adjacentRow >= rows || adjacentRow < 0 || adjacentCol >= cols || adjacentCol < 0) continue;
      
      const newDist = dist[nextMinDistIdx] + Math.abs(area[adjacentRow][adjacentCol] - area[row][col]);
      const adjacentIdx = adjacentRow * cols + adjacentCol;
      
      if(!flag[adjacentIdx] && newDist < dist[adjacentIdx]) {
        dist[adjacentIdx] = newDist;
      }
    }
  }
  return -1;
}
