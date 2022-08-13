const cartList = document.querySelector('.cart__items');
const container = document.querySelector('.container');

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
function creatSectionPrice(price) {
  if (document.querySelector('.total-price') === null) {
    container
    .appendChild(createCustomElement('section', 'total-price', price));
  } else {
    document.querySelector('.total-price').innerText = price;
  }
}
function priceCalc() {
  let total = 0;
  if (getSavedCartItems() != null) {
    const localStorage = JSON.parse(getSavedCartItems());
    localStorage.forEach((item) => {
      const objLocal = JSON.parse(item);
      total += objLocal.salePrice;
    });
  } 
  creatSectionPrice(JSON.stringify(total));
}

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  if (getSavedCartItems() != null) {
    const arrayChilds = [...event.target.parentElement.children];
    const toRemove = arrayChilds.indexOf(event.target);
    const removeLocalStorage = JSON.parse(getSavedCartItems());
    removeLocalStorage.splice(toRemove, 1);
    saveCartItems(JSON.stringify(removeLocalStorage));
  }
  cartList.removeChild(event.target);
  priceCalc();
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
        priceCalc();
      });
}

function addButtonEvent() {
  const buttonsToAdd = document.querySelectorAll('.item__add');
  buttonsToAdd.forEach((button) => {
    button.addEventListener('click', addCartIten);
});
}

document.querySelector('.empty-cart').addEventListener('click', () => {
  if (getSavedCartItems() != null) {
    const removeLocalStorage = JSON.parse(getSavedCartItems());
    removeLocalStorage.splice(0);
    saveCartItems(JSON.stringify(removeLocalStorage));
  }
  const cartElementsArray = [...document.querySelector('.cart__items').children];
  cartElementsArray.forEach((element) => {
    cartList.removeChild(element);
  });
  priceCalc();
});

function loadin() {
  container
  .appendChild(createCustomElement('spam', 'loading', 'carregando...'));
}

function removeLoading() {
  container
  .removeChild(document.querySelector('.loading'));
}

window.onload = () => {
 loadin(); r2()
    .then(removeLoading)
    .then(addButtonEvent); cartLocalStorage(); priceCalc(); 
  };