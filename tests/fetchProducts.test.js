require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma finção', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });
  
  it('Testa se ao executar a função fetchProducts com agumento "computador", fetch é chamado, o endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });

  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch);
  });

  it('Testa se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const expected = await fetchProducts();
    expect(expected).toEqual(new Error('You must provide an url'))
  });
});
