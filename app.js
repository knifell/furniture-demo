"use strict";

const strings = {
  ky: {
    skip: "Мазмунга өтүү", language: "Интерфейстин тили", catalog: "Каталог", cart: "Себет", demo: "Демо-каталог",
    heroText: "Үйүңүзгө жылуулук кошкон эмеректер. Ноокат үчүн эмерек каталогу.",
    heroAlt: "Терезесинен тоолор көрүнгөн, диван жана жыгач үстөл коюлган конок бөлмө",
    browse: "Каталогду көрүү", catalogTitle: "Эмеректер", catalogText: "Конок бөлмөсүнөн уктоочу бөлмөгө чейин.",
    category: "Эмеректин түрү", all: "Баары", sofas: "Дивандар", beds: "Керебеттер", wardrobes: "Шкафтар", tables: "Үстөлдөр",
    sofasOne: "Диван", bedsOne: "Керебет", wardrobesOne: "Шкаф", tablesOne: "Үстөл",
    search: "Аталышы боюнча издөө", searchPlaceholder: "Аталышы боюнча…", sort: "Иреттөө", defaultSort: "Иреттөө",
    asc: "Арзандан кымбатка", desc: "Кымбаттан арзанга", count: n => `${n} товар`,
    noResults: "Эч нерсе табылган жок", tryAgain: "Башка аталыш менен издеп көрүңүз же чыпкаларды тазалаңыз.",
    reset: "Чыпкаларды тазалоо", footer: "Ноокат · Эмерек демо-каталогу",
    close: "Жабуу", view: name => `${name}: товарды көрүү`, add: "Себетке кошуу",
    addName: name => `${name}: себетке кошуу`, added: name => `${name} себетке кошулду`,
    photo: "Жалпы көрүнүш", detailPhoto: "Жакындан", size: "Өлчөмү (туурасы × тереңдиги × бийиктиги)", cm: "см",
    material: "Материалы", minus: name => `${name}: санын азайтуу`, plus: name => `${name}: санын көбөйтүү`,
    remove: "Өчүрүү", removeName: name => `${name}: себеттен өчүрүү`, removed: name => `${name} себеттен өчүрүлдү`, undo: "Кайтаруу",
    cartEmpty: "Себет азырынча бош.", total: "Жалпы сумма", prepare: "Буйрутма даярдоо",
    demoNotice: "Бул демо. Буйрутма жөнөтүлбөйт", orderTitle: "Буйрутманын тексти", copy: "Текстти көчүрүү",
    whatsapp: "WhatsApp ачуу", copied: "Текст көчүрүлдү.", copyFallback: "Текст тандалды. Түзмөгүңүздүн көчүрүү буйругун колдонуңуз.",
    orderIntro: name => `Саламатсызбы! «${name}» каталогунан төмөнкү эмеректер боюнча сурайын дедим:`, unit: "даана"
  },
  ru: {
    skip: "К содержимому", language: "Язык интерфейса", catalog: "Каталог", cart: "Корзина", demo: "Демо-каталог",
    heroText: "Мебель, с которой дома теплее. Каталог для Нооката.",
    heroAlt: "Гостиная с диваном и деревянным столом, за окном видны горы",
    browse: "Смотреть каталог", catalogTitle: "Мебель", catalogText: "От гостиной до спальни.",
    category: "Категория мебели", all: "Всё", sofas: "Диваны", beds: "Кровати", wardrobes: "Шкафы", tables: "Столы",
    sofasOne: "Диван", bedsOne: "Кровать", wardrobesOne: "Шкаф", tablesOne: "Стол",
    search: "Поиск по названию", searchPlaceholder: "Поиск по названию…", sort: "Сортировка", defaultSort: "Сортировка",
    asc: "Сначала дешевле", desc: "Сначала дороже",
    count: n => `${n} ${{one: "товар", few: "товара", many: "товаров"}[new Intl.PluralRules("ru").select(n)]}`,
    noResults: "Ничего не найдено", tryAgain: "Попробуйте другое название или сбросьте фильтры.",
    reset: "Сбросить фильтры", footer: "Ноокат · Демо-каталог мебели",
    close: "Закрыть", view: name => `Посмотреть товар «${name}»`, add: "В корзину",
    addName: name => `Добавить «${name}» в корзину`, added: name => `«${name}» в корзине`,
    photo: "Общий вид", detailPhoto: "Крупный план", size: "Размеры (ширина × глубина × высота)", cm: "см",
    material: "Материал", minus: name => `Уменьшить количество «${name}»`, plus: name => `Увеличить количество «${name}»`,
    remove: "Удалить", removeName: name => `Удалить «${name}» из корзины`, removed: name => `«${name}» удалён из корзины`, undo: "Вернуть",
    cartEmpty: "Корзина пока пуста.", total: "Итого", prepare: "Подготовить заявку",
    demoNotice: "Это демо. Заявка не отправляется", orderTitle: "Текст заявки", copy: "Скопировать текст",
    whatsapp: "Открыть WhatsApp", copied: "Текст скопирован.", copyFallback: "Текст выделен. Скопируйте его средствами устройства.",
    orderIntro: name => `Здравствуйте! Меня интересует мебель из каталога «${name}»:`, unit: "шт."
  }
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const asset = filename => `./assets/${filename}`;
const storage = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(`zhailuu:${key}`)); }
    catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(`zhailuu:${key}`, JSON.stringify(value)); }
    catch { /* The current session still works when storage is unavailable. */ }
  }
};
const catalog = new Map(shop.products.map(product => [product.id, product]));
const productDialog = $("#product-dialog");
const cartDialog = $("#cart-dialog");
const number = new Intl.NumberFormat("ru-KG");
const price = value => `${number.format(value)}\u00a0сом`;
const maxQuantity = 99;
let language = storage.get("language") === "ru" ? "ru" : "ky";
let t = strings[language];
let category = "all";
let orderOpen = false;
let undo = null;
let toastTimer;
let activeProduct;
let photoIndex = 0;
const savedCart = storage.get("cart");
const cart = new Map(Object.entries(savedCart ?? {}).filter(([id, quantity]) =>
  catalog.has(id) && Number.isInteger(quantity) && quantity >= 1 && quantity <= maxQuantity
));

function node(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = value;
  return element;
}

function button(text, className, label, onClick) {
  const element = node("button", className, text);
  element.type = "button";
  if (label) element.setAttribute("aria-label", label);
  element.addEventListener("click", onClick);
  return element;
}

function image(filename, alt, size, lazy = false) {
  const element = node("img");
  element.width = size;
  element.height = size;
  element.alt = alt;
  if (lazy) element.loading = "lazy";
  element.src = asset(filename);
  return element;
}

function productName(product) {
  return `${t[product.category + "One"]} «${product[language][0]}»`;
}

function normalize(value) {
  return value.trim().normalize("NFC").toLowerCase().replaceAll("ё", "е");
}

function setLanguage(next) {
  language = next;
  t = strings[language];
  storage.set("language", next);
  document.documentElement.lang = language;
  document.title = `${shop.name} — ${t.catalog}`;
  $$("[data-brand]").forEach(element => { element.textContent = shop.name; });
  $$("[data-i]").forEach(element => { element.textContent = t[element.dataset.i]; });
  $$("[data-label]").forEach(element => { element.setAttribute("aria-label", t[element.dataset.label]); });
  $$("[data-placeholder]").forEach(element => { element.placeholder = t[element.dataset.placeholder]; });
  $$("[data-alt]").forEach(element => { element.alt = t[element.dataset.alt]; });
  $$("[data-lang]").forEach(element => { element.setAttribute("aria-pressed", element.dataset.lang === next); });
  renderCategories();
  renderCatalog();
  renderCart();
}

function renderCategories() {
  const categoryList = $("#categories");
  const keys = ["all", ...new Set(shop.products.map(product => product.category))];
  categoryList.replaceChildren(...keys.map(key => {
    const control = button(t[key], "", "", () => {
      category = key;
      [...categoryList.children].forEach(item => item.setAttribute("aria-pressed", item === control));
      renderCatalog();
    });
    control.setAttribute("aria-pressed", key === category);
    return control;
  }));
}

function renderCatalog() {
  const query = normalize($("#query").value);
  const sort = $("#sort").value;
  const results = shop.products.filter(product => {
    const matchesName = [productName(product), product.ky[0], product.ru[0]]
      .some(value => normalize(value).includes(query));
    return matchesName && (category === "all" || product.category === category);
  });
  if (sort === "asc") results.sort((a, b) => a.price - b.price);
  if (sort === "desc") results.sort((a, b) => b.price - a.price);
  $("#result-count").textContent = t.count(results.length);
  $("#no-results").hidden = results.length > 0;
  $("#products").replaceChildren(...results.map(createCard));
}

function createCard(product) {
  const name = productName(product);
  const card = node("article", "card");
  const view = button("", "card-view", t.view(name), () => openProduct(product));
  view.append(image(product.images[0], "", 418, true),
    node("span", "card-category", t[product.category + "One"]), node("span", "card-name", product[language][0]));
  const heading = node("h3");
  heading.append(view);
  const actions = node("div", "card-footer");
  const add = button("+", "icon-button", t.addName(name), () => addProduct(product));
  add.dataset.quickAdd = product.id;
  add.disabled = (cart.get(product.id) ?? 0) >= maxQuantity;
  actions.append(node("span", "money", price(product.price)), add);
  card.append(heading, actions);
  return card;
}

function openProduct(product) {
  activeProduct = product;
  photoIndex = 0;
  renderProduct();
  productDialog.showModal();
}

function renderProduct() {
  const product = activeProduct;
  const [name, material, description] = product[language];
  $("#product-title").textContent = productName(product);
  const gallery = node("div");
  const photo = image(product.images[photoIndex], photoIndex ? `${name} — ${t.detailPhoto}` : name, photoIndex ? 258 : 418);
  photo.className = "detail-image";
  const galleryControls = node("div", "gallery-buttons");
  gallery.append(photo, galleryControls);
  product.images.forEach((filename, index) => {
    const caption = index ? t.detailPhoto : t.photo;
    const control = button(caption, "secondary", "", () => {
      photoIndex = index;
      photo.src = asset(filename);
      photo.alt = index ? `${name} — ${caption}` : name;
      [...galleryControls.children].forEach(item => item.setAttribute("aria-pressed", item === control));
    });
    control.setAttribute("aria-pressed", index === photoIndex);
    galleryControls.append(control);
  });

  const copy = node("div", "detail-copy");
  const specs = node("dl");
  specs.append(node("dt", "", t.size), node("dd", "", `${product.size}\u00a0${t.cm}`),
    node("dt", "", t.material), node("dd", "", material));
  const feedback = node("p", "detail-feedback");
  feedback.setAttribute("role", "status");
  const add = button(t.add, "primary full", "", () => {
    addProduct(product, feedback);
    add.disabled = cart.get(product.id) >= maxQuantity;
  });
  add.disabled = (cart.get(product.id) ?? 0) >= maxQuantity;
  copy.append(node("p", "money", price(product.price)), node("p", "", description), specs, add, feedback);
  $("#product-detail").replaceChildren(gallery, copy);
}

function saveCart() {
  storage.set("cart", Object.fromEntries(cart));
  $$("[data-quick-add]").forEach(control => {
    control.disabled = (cart.get(control.dataset.quickAdd) ?? 0) >= maxQuantity;
  });
  renderCart();
}

function addProduct(product, feedback) {
  const quantity = cart.get(product.id) ?? 0;
  if (quantity >= maxQuantity) return;
  cart.set(product.id, quantity + 1);
  saveCart();
  const message = t.added(productName(product));
  if (feedback) {
    feedback.textContent = message;
    return;
  }
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  toastTimer = setTimeout(() => { $("#toast").textContent = ""; }, 2200);
}

function changeQuantity(id, quantity, action) {
  cart.set(id, quantity);
  saveCart();
  const current = $(`[data-cart-id="${id}"]`);
  const target = current.querySelector(`[data-quantity="${action}"]`);
  (target.disabled ? current.querySelector("button:not(:disabled)") : target).focus();
}

function cartRow(product, quantity) {
  const name = productName(product);
  const row = node("article", "cart-row");
  row.dataset.cartId = product.id;
  const copy = node("div");
  const controls = node("div", "cart-buttons");
  const minus = button("−", "icon-button", t.minus(name), () => changeQuantity(product.id, quantity - 1, "minus"));
  minus.dataset.quantity = "minus";
  minus.disabled = quantity === 1;
  const plus = button("+", "icon-button", t.plus(name), () => changeQuantity(product.id, quantity + 1, "plus"));
  plus.dataset.quantity = "plus";
  plus.disabled = quantity === maxQuantity;
  const remove = button(t.remove, "remove", t.removeName(name), () => {
    undo = { product, quantity };
    cart.delete(product.id);
    saveCart();
    $(".undo-button").focus();
  });
  controls.append(minus, node("span", "", number.format(quantity)), plus, remove);
  copy.append(node("h3", "", name), node("p", "money", price(product.price * quantity)), controls);
  row.append(image(product.images[0], "", 60), copy);
  return row;
}

function renderCart() {
  const rows = [];
  const lines = [];
  let count = 0;
  let total = 0;
  for (const [id, quantity] of cart) {
    const product = catalog.get(id);
    const lineTotal = product.price * quantity;
    count += quantity;
    total += lineTotal;
    rows.push(cartRow(product, quantity));
    lines.push(`• ${productName(product)} × ${number.format(quantity)} ${t.unit} — ${price(lineTotal)}`);
  }
  $("#basket-count").textContent = number.format(count);
  $("[data-open-cart]").setAttribute("aria-label", `${t.cart}, ${t.count(count)}`);
  if (undo) {
    const message = node("div", "cart-buttons");
    const status = node("span", "", t.removed(productName(undo.product)));
    status.setAttribute("role", "status");
    message.append(status, button(t.undo, "undo-button", "", () => {
      const id = undo.product.id;
      cart.set(id, Math.min(maxQuantity, (cart.get(id) ?? 0) + undo.quantity));
      undo = null;
      saveCart();
      $(`[data-cart-id="${id}"] button:not(:disabled)`).focus();
    }));
    rows.push(message);
  }
  if (!count) rows.push(node("p", "", t.cartEmpty));
  $("#cart-items").replaceChildren(...rows);
  $("#cart-summary").hidden = !count;
  $("#total").textContent = price(total);
  $("#order").hidden = !count || !orderOpen;
  $("#copy-status").textContent = "";
  $("#order-text").value = [t.orderIntro(shop.name), "", ...lines, "", `${t.total}: ${price(total)}`].join("\n");
  const whatsapp = $("#whatsapp");
  const contact = String(shop.whatsapp).replace(/[\s()+-]/g, "");
  whatsapp.hidden = !/^[1-9]\d{7,14}$/.test(contact);
  if (whatsapp.hidden) whatsapp.removeAttribute("href");
  else whatsapp.href = `https://wa.me/${contact}?text=${encodeURIComponent($("#order-text").value)}`;
}

async function copyOrder() {
  const message = $("#order-text");
  let copied = false;
  try {
    await navigator.clipboard.writeText(message.value);
    copied = true;
  } catch {
    message.focus();
    message.select();
    try { copied = document.execCommand("copy"); }
    catch { /* The selection remains available for manual copying. */ }
    if (copied) $("#copy").focus();
  }
  $("#copy-status").textContent = copied ? t.copied : t.copyFallback;
}

$$("[data-lang]").forEach(control => control.addEventListener("click", () => setLanguage(control.dataset.lang)));
$("#query").addEventListener("input", renderCatalog);
$("#sort").addEventListener("change", renderCatalog);
$("#reset").addEventListener("click", () => {
  $("#query").value = "";
  $("#sort").value = "default";
  category = "all";
  renderCategories();
  renderCatalog();
  $("#query").focus();
});
$("[data-open-cart]").addEventListener("click", () => {
  orderOpen = false;
  undo = null;
  renderCart();
  cartDialog.showModal();
});
$$("[data-close]").forEach(control => control.addEventListener("click", () => control.closest("dialog").close()));
$("#prepare").addEventListener("click", () => {
  orderOpen = true;
  $("#order").hidden = false;
  $("#order-title").focus();
});
$("#copy").addEventListener("click", copyOrder);
setLanguage(language);
