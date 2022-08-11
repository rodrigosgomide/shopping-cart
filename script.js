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
  const cartItens = document.querySelector('.cart__items');
  cartItens.removeChild(event.target);
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

function addCartIten(element) {
    const itenId = element.target.parentElement.childNodes[0].innerText;
      fetchItem(itenId).then((info) => {
        const carList = document.querySelector('.cart__items');
        const { id, title, price } = info;
        const param = (sku, name, salePrice) => ({
          sku, name, salePrice,
        });
        carList.appendChild(createCartItemElement(param(id, title, price)));
      });
}

function addButtonEvent() {
  const buttonsToAdd = document.querySelectorAll('.item__add');
  buttonsToAdd.forEach((button) => {
    button.addEventListener('click', addCartIten);
});
}

window.onload = () => { r2().then(addButtonEvent); };