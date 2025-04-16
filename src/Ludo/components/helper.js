export const getNextPlayer = (color) => {
    const order = ["red", "green", "yellow", "blue"];
    const currentIndex = order.indexOf(color);
    return order[(currentIndex + 1) % order.length];
  };
  //hrllo