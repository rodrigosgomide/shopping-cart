const saveCartItems = (iten) => {
  if (!iten) {
    return new Error('Empty Cart');
  }
  localStorage.setItem('cartItems', iten);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
