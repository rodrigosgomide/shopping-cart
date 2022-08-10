const fetchProducts = async (product) => {
  if (!product) {
    return new Error('You must provide an url');
  }
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const response = data.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}