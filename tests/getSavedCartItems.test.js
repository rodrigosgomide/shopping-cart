const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toBeCalled()
    expect(localStorage.getItem).toBeCalledWith('cartItems')
  });
});
