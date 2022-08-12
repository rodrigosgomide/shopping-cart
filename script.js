const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  if (getSavedCartItems() != null) {
    const arrayChilds = [...event.target.parentElement.children];
    const toRemove = arrayChilds.indexOf(event.target);
    const removeLocalStorage = JSON.parse(getSavedCartItems());
    removeLocalStorage.splice(toRemove, 1);
    saveCartItems(JSON.stringify(removeLocalStorage));
  }
  cartList.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const r2 = () => fetchProducts('computer').then((result) => result.results).then((computers) => {
  computers.forEach((computer) => {
    const { id, title, thumbnail } = computer;
    const param = (sku, name, image) => ({
        sku,
        name,
        image,
      });
     const child = createProductItemElement(param(id, title, thumbnail));
     document.querySelector('.items').appendChild(child);
  });
});

const convertObjKeys = (sku, name, salePrice) => ({
  sku, name, salePrice,
});

function cartLocalStorage() {
  if (getSavedCartItems() != null) {
    const localStorage = JSON.parse(getSavedCartItems());
    localStorage.forEach((item) => {
      const objLocal = JSON.parse(item);
      const itemConver = convertObjKeys(objLocal.sku, objLocal.name, objLocal.salePrice);
      const storageItem = createCartItemElement(itemConver);
      cartList.appendChild(storageItem);
    }); 
  }
}

function addCartIten(element) {
    const itenId = element.target.parentElement.childNodes[0].innerText;
      fetchItem(itenId).then((info) => {
        const { id, title, price } = info;
        const convertedObj = convertObjKeys(id, title, price);
        const teste = createCartItemElement(convertedObj);
        cartList.appendChild(teste);
        if (getSavedCartItems() === null) {
          const arrayTolocalStorage = JSON.stringify([]);
          saveCartItems(arrayTolocalStorage);
        }
        const toStorage = JSON.stringify(convertedObj);
        const addLocalStorage = JSON.parse(getSavedCartItems());
        addLocalStorage.push(toStorage);
        saveCartItems(JSON.stringify(addLocalStorage));
      });
}

function addButtonEvent() {
  const buttonsToAdd = document.querySelectorAll('.item__add');
  buttonsToAdd.forEach((button) => {
    button.addEventListener('click', addCartIten);
});
}

window.onload = () => { r2().then(addButtonEvent); cartLocalStorage(); };