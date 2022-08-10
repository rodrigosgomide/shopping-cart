require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma finção', () => {
    expect(typeof(fetchItem)).toBe('function');
  });

  it('Testa se ao executar a função fetchItem com agumento "MLB1615760527", fetch é chamado, o endpoint corresponde', async () => {
    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(endpoint)
  });

  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const expected = await fetchItem('MLB1615760527')
    expect(expected).toEqual(item)
  });

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const expected = await fetchItem()
    const result = new Error('You must provide an url')
    expect(expected).toEqual(result);
  });
});
