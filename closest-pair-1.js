// Calculate a pair of closest points in linearithmic time
function closestPair(points) {
  function solution(points) {
    // divide and conquer algorithm
    if(points.length <= 2) return [points[0], points[1], distance(points[0], points[1])];

    let minClosest1, minClosest2;
    let minDis;
    // sort according to x
    // remove out of solution
//     points.sort((a, b) => a[0] - b[0]);
// 
    const middle = points.length >> 1;

    // [0, middle) [middle, points.lenght)
    // notice: the length of left <= the length of right
    // need some extral place, can optimize?

    // find closest pair of point in left interval and right interval.
    let leftInterval = points.slice(0, middle); 
    let rightInterval = points.slice(middle);
    const [leftClosest1, leftClosest2, minLeftDis] = solution(leftInterval);
    const [rightClosest1, rightClosest2, minRightDis] = solution(rightInterval);

//     console.log("left: ",leftClosest1, leftClosest2, minLeftDis)
//     console.log("right: ", rightClosest1, rightClosest2, minRightDis)


    if(minLeftDis < minRightDis) {
      minClosest1 = leftClosest1;
      minClosest2 = leftClosest2;
      minDis = minLeftDis; 
    } else {
      minClosest1 = rightClosest1;
      minClosest2 = rightClosest2;
      minDis = minRightDis; 
    }

    // find closest pair of point, which one is in left and another is in right

    // filter points by the x distance to middle point, which x is min in the rigt interval.
    // if disance >= minDis, ignore that point
    // else continue to filter
    const middleX = points[middle][0];
    leftInterval = leftInterval.filter(p => middleX - p[0] < minDis);
    leftInterval = leftInterval.filter(p => p[0] - middleX < minDis);


    // filter by y axis
    rightInterval.sort((a, b) => a[1] - b[1]);

    for(const [x, y] of leftInterval) {
      const idx = findMinGreater(y - minDis, rightInterval);

      if(idx === rightInterval.length) continue;

      for(let i = 0; i < 6; ++i) {
        const dis = distance(rightInterval[idx + i], [x, y]);
        if(dis < minDis) {
          minDis = dis;
          minClosest1 = [x, y];
          minClosest2 = rightInterval[idx+i];
        }  
      }
    }
//     console.log("min: ", minClosest1, minClosest2, minDis); 
    return [minClosest1, minClosest2, minDis];   
  }
  
  points.sort((a, b) => a[0] - b[0]);
  return solution(points).slice(0, 2);
  
}

function distance(point1, point2) {
  if(!point1 || !point2) return Infinity;
  return Math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[0])**2)
//   return const dis = Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}
function findMinGreater(target, interval)  {
  let left = 0, right = interval.length - 1;
  // [0, left) <= target
  // (right, length - 1] > target
  
  while(left <= right) {
//     console.log(left, ">>>", right);
    let middle = (left + right)>>1;
    if(interval[middle] <= target)
      left = middle + 1;
    else 
      right = middle - 1;
  }
//   console.log(left, ">>>", right)
  return left;
}