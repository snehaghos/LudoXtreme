import redPiece from "/images/redpiece.png";
import greenPiece from "/images/greenpiece.png";
import yellowPiece from "/images/yellowpiece.png";
import bluePiece from "/images/bluepiece.png";

export const pieceImages = {
  red: redPiece,
  green: greenPiece,
  yellow: yellowPiece,
  blue: bluePiece,
};


export const pieces = {
    red: [
      { position: [1, 1], isHome: true, pathIndex: -1 },
      { position: [1, 2], isHome: true, pathIndex: -1 },
      { position: [2, 1], isHome: true, pathIndex: -1 },
      { position: [2, 2], isHome: true, pathIndex: -1 },
    ],
    green: [
      { position: [1, 13], isHome: true, pathIndex: -1 },
      { position: [1, 14], isHome: true, pathIndex: -1 },
      { position: [2, 13], isHome: true, pathIndex: -1 },
      { position: [2, 14], isHome: true, pathIndex: -1 },
    ],
    yellow: [
      { position: [13, 13], isHome: true, pathIndex: -1 },
      { position: [13, 14], isHome: true, pathIndex: -1 },
      { position: [14, 13], isHome: true, pathIndex: -1 },
      { position: [14, 14], isHome: true, pathIndex: -1 },
    ],
    blue: [
      { position: [13, 1], isHome: true, pathIndex: -1 },
      { position: [13, 2], isHome: true, pathIndex: -1 },
      { position: [14, 1], isHome: true, pathIndex: -1 },
      { position: [14, 2], isHome: true, pathIndex: -1 },
    ],
  };
export const homePositions = {
    red: [[1, 1], [1, 2], [2, 1], [2, 2]],
    green: [[1, 13], [1, 14], [2, 13], [2, 14]],
    yellow: [[13, 13], [13, 14], [14, 13], [14, 14]],
    blue: [[13, 1], [13, 2], [14, 1], [14, 2]],
  };
  
  export const escapePaths = {
    red: [[7,1],[7,2],[7,3],[7,4],[7,5]],
    green:[ [1,7],[2,7],[3,7],[4,7],[5,7]],
    yellow: [[7,13],[7,12],[7,11],[7,10],[7,9]],
    blue: [[13,7],[12,7],[11,7],[10,7],[9,7]],
    
  };
  
  export const winningPositions = {
    red: [7, 6],
    green: [6,7],
    yellow: [7,8],
    blue: [8,7],
  };
  
  export const playerPaths = {
    red: [
      [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
      [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8],[5,8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],[6,14],
      [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10],[8,9], [9, 8], [10, 8], [11, 8],
      [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6],[9,6], [8, 5],
      [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0]
    ],
    green: [
      [1, 8], [2, 8], [3, 8], [4, 8],[5,8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
      [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10],[8,9], [9, 8], [10, 8], [11, 8], [12, 8],
      [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9,6],[8, 5], [8, 4],
      [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],[6,5], [5, 6],
      [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7]
    ],
    yellow: [
       [8, 13], [8, 12], [8, 11], [8, 10],[8,9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
      [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6],[9,6], [8, 5], [8, 4], [8, 3],
      [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],[6,5], [5, 6], [4, 6],
      [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8],[5,8], [6, 9],
      [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14]
    ],
    blue: [
      [13, 6], [12, 6], [11, 6], [10, 6],[9,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
      [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],[6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
      [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8],[5,8], [6, 9], [6, 10], [6, 11], [6, 12],
      [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10],[8,9], [9, 8], [10, 8],
      [11, 8], [12, 8], [13, 8], [14, 8], [14, 7]
    ],
  };
  
  export const startingPoints = {
    red: [[6, 1]],
    green: [[1, 8]],
    yellow: [[8, 13]],
    blue: [[13, 6]],
  };
  
  export const safePoints = [
    [2, 6],
    [6, 12],
    [12, 8],
    [8, 2],
  ];
  
export const skipPoints = [
    [6,6],[6, 7],[6, 8],
    [7, 6],[7, 7],[7, 8],
    [8, 6],[8, 7],[8, 8],
  ];
