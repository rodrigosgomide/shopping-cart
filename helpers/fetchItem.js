const fetchItem = async (ID) => {
  if (!ID) {
    return new Error('You must provide an url');
  }
  const endpoint = `https://api.mercadolibre.com/items/${ID}`;
  const data = await fetch(endpoint);
  const dataJson = await data.json();
  return dataJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}