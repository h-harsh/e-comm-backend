 const delCh = 250;

// export let totalMRP = state.reduce(
//   (a, b) => {
//     return { price: a.price + b.price * b.qty };
//   },
//   { price: 0 }
// );
// // setMrp(totalMRP.price);

// // setDizcount(
// export const dizcount = state
//   .map((product) => {
//     if (product.qty > 1) {
//       return Math.round(product.price * (product.discount / 100)) * product.qty;
//     } else {
//       return Math.round(product.price * (product.discount / 100));
//     }
//   })
//   .reduce((a, b) => a + b, 0);

 const calculatePrice = (state) => {
  return state.reduce(
    (a, b) => {
      return { price: a.price + b.price * b.qty };
    },
    { price: 0 }
  );
};

 const calcDiscount = (state) => {
  return state
    .map((product) => {
      if (product.qty > 1) {
        return (
          Math.round(product.price * (product.discount / 100)) * product.qty
        );
      } else {
        return Math.round(product.price * (product.discount / 100));
      }
    })
    .reduce((a, b) => a + b, 0);
};

 const calculateAmount = (state) => {
  let totalMRP = state.reduce(
    (a, b) => {
      return { price: a.price + b.price * b.qty };
    },
    { price: 0 }
  );

  let totalDiscount = state
    .map((product) => {
      if (product.qty > 1) {
        return (
          Math.round(product.price * (product.discount / 100)) * product.qty
        );
      } else {
        return Math.round(product.price * (product.discount / 100));
      }
    })
    .reduce((a, b) => a + b, 0);

    return totalMRP.price - totalDiscount + delCh
};

module.exports = {calculateAmount}
