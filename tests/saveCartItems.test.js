const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem).toBeCalledWith('cartItems', '<ol><li>Item</li></ol>')
  });

  it('Testa se o um erro é lançado ao não se passar paramentros', () => {
    const expected = saveCartItems();
    const result = new Error('Empty Cart');
    expect(expected).toEqual(result);
  });
});
