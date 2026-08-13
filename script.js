/* =========================================
   SPY AURA
   Main Website JavaScript
========================================= */


/* -----------------------------------------
   SHOP OWNER SETTINGS
----------------------------------------- */

const OWNER_PHONE = "7330985591";
const OWNER_EMAIL = "swamysode7@gmail.com";

const INSTAGRAM_URL = "https://instagram.com/shyy.spidyy";


/*
  IMPORTANT:
  Replace this with your real UPI ID.

  Example:
  yourname@ybl
  yourname@paytm
  yourname@oksbi

  A phone number alone is NOT always a UPI ID.
*/
const UPI_ID = "YOUR-UPI-ID-HERE";


/* -----------------------------------------
   PRODUCTS
----------------------------------------- */

const products = [

  {
    id: 1,
    name: "SHADOW BAGGY TEE",
    category: "tshirt",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description:
      "Oversized streetwear fit with a clean dark aesthetic. Made for everyday youth style."
  },

  {
    id: 2,
    name: "AURA OVERSIZED TEE",
    category: "tshirt",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    description:
      "Relaxed oversized silhouette designed for effortless streetwear looks."
  },

  {
    id: 3,
    name: "SPIDER HOODIE",
    category: "hoodie",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description:
      "Heavy street-style hoodie with an oversized fit and bold SPY AURA energy."
  },

  {
    id: 4,
    name: "NIGHT WALK HOODIE",
    category: "hoodie",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    description:
      "Premium relaxed hoodie made for night streetwear and everyday comfort."
  },

  {
    id: 5,
    name: "AURA BAGGY PANTS",
    category: "pants",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    description:
      "Loose baggy fit with a modern street silhouette."
  },

  {
    id: 6,
    name: "SPIDER CARGO",
    category: "pants",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description:
      "Relaxed cargo-inspired pants designed for oversized youth outfits."
  }

];


/* -----------------------------------------
   VARIABLES
----------------------------------------- */

let cart = JSON.parse(localStorage.getItem("spyAuraCart")) || [];

let likedProducts =
  JSON.parse(localStorage.getItem("spyAuraLikes")) || [];

let selectedProduct = null;
let selectedSize = "M";


/* -----------------------------------------
   LOGIN
----------------------------------------- */

function loginUser() {

  const phone =
    document.getElementById("loginPhone").value.trim();

  if (!/^[6-9][0-9]{9}$/.test(phone)) {

    alert("INCORRECT MOBILE NUMBER");

    return;
  }

  localStorage.setItem("spyAuraUser", phone);

  document
    .getElementById("loginScreen")
    .classList.add("hidden");

  document
    .getElementById("website")
    .classList.remove("hidden");

  renderProducts();

}


/* -----------------------------------------
   AUTO LOGIN
----------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {

  const savedUser =
    localStorage.getItem("spyAuraUser");

  if (savedUser) {

    document
      .getElementById("loginScreen")
      .classList.add("hidden");

    document
      .getElementById("website")
      .classList.remove("hidden");

  }

  renderProducts();
  updateCartCount();

});


/* -----------------------------------------
   RENDER PRODUCTS
----------------------------------------- */

function renderProducts(list = products) {

  const grid =
    document.getElementById("productGrid");

  grid.innerHTML = "";

  list.forEach(product => {

    const liked =
      likedProducts.includes(product.id);

    grid.innerHTML += `

      <article class="product-card">

        <div
          class="product-image"
          onclick="openProduct(${product.id})"
        >

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

          <button
            class="like-btn ${liked ? "liked" : ""}"
            onclick="event.stopPropagation(); toggleLike(${product.id})"
          >
            ${liked ? "♥" : "♡"}
          </button>

        </div>


        <div class="product-info">

          <p class="product-category">
            ${product.category.toUpperCase()}
          </p>

          <h3 class="product-name">
            ${product.name}
          </h3>

          <div class="product-price">
            ₹${product.price}
          </div>

          <button
            class="view-btn"
            onclick="openProduct(${product.id})"
          >
            VIEW PRODUCT
          </button>

        </div>

      </article>

    `;

  });

}


/* -----------------------------------------
   FILTER
----------------------------------------- */

function filterProducts() {

  const category =
    document.getElementById("categoryFilter").value;

  if (category === "all") {

    renderProducts(products);

  } else {

    renderProducts(
      products.filter(
        product => product.category === category
      )
    );

  }

}


/* -----------------------------------------
   LIKE
----------------------------------------- */

function toggleLike(id) {

  if (likedProducts.includes(id)) {

    likedProducts =
      likedProducts.filter(item => item !== id);

  } else {

    likedProducts.push(id);

  }

  localStorage.setItem(
    "spyAuraLikes",
    JSON.stringify(likedProducts)
  );

  filterProducts();

}


/* -----------------------------------------
   PRODUCT VIEW
----------------------------------------- */

function openProduct(id) {

  selectedProduct =
    products.find(product => product.id === id);

  if (!selectedProduct) return;

  document.getElementById("modalImage").src =
    selectedProduct.image;

  document.getElementById("modalName").textContent =
    selectedProduct.name;

  document.getElementById("modalPrice").textContent =
    selectedProduct.price;

  document.getElementById("modalCategory").textContent =
    selectedProduct.category.toUpperCase();

  document.getElementById("modalDescription").textContent =
    selectedProduct.description;

  selectedSize = "M";

  document
    .querySelectorAll(".size-row button")
    .forEach(button => {

      button.classList.remove("selected");

      if (button.textContent === "M") {
        button.classList.add("selected");
      }

    });

  document
    .getElementById("productModal")
    .classList.remove("hidden");

}


/* -----------------------------------------
   CLOSE PRODUCT
----------------------------------------- */

function closeProduct() {

  document
    .getElementById("productModal")
    .classList.add("hidden");

}


/* -----------------------------------------
   SIZE
----------------------------------------- */

function selectSize(button) {

  selectedSize =
    button.textContent;

  document
    .querySelectorAll(".size-row button")
    .forEach(item =>
      item.classList.remove("selected")
    );

  button.classList.add("selected");

}


/* -----------------------------------------
   ADD MODAL PRODUCT
----------------------------------------- */

function addModalProduct() {

  if (!selectedProduct) return;

  addToCart(
    selectedProduct.id,
    selectedSize
  );

  closeProduct();

  openCart();

}


/* -----------------------------------------
   ADD TO CART
----------------------------------------- */

function addToCart(id, size = "M") {

  const existing =
    cart.find(
      item =>
        item.id === id &&
        item.size === size
    );

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: id,
      size: size,
      quantity: 1
    });

  }

  saveCart();

}


/* -----------------------------------------
   CART
----------------------------------------- */

function saveCart() {

  localStorage.setItem(
    "spyAuraCart",
    JSON.stringify(cart)
  );

  updateCartCount();

}


function updateCartCount() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  document.getElementById("cartCount")
    .textContent = count;

}


function openCart() {

  renderCart();

  document
    .getElementById("cartModal")
    .classList.remove("hidden");

}


function closeCart() {

  document
    .getElementById("cartModal")
    .classList.add("hidden");

}


/* -----------------------------------------
   RENDER CART
----------------------------------------- */

function renderCart() {

  const container =
    document.getElementById("cartItems");

  container.innerHTML = "";

  if (cart.length === 0) {

    container.innerHTML = `
      <p style="color:#777;padding:30px 0;text-align:center">
        YOUR CART IS EMPTY.
      </p>
    `;

    document.getElementById("cartTotal")
      .textContent = "0";

    return;
  }


  let total = 0;


  cart.forEach((item, index) => {

    const product =
      products.find(
        product => product.id === item.id
      );

    if (!product) return;

    total +=
      product.price * item.quantity;


    container.innerHTML += `

      <div class="cart-product">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="cart-product-info">

          <h3>${product.name}</h3>

          <p>
            SIZE: ${item.size}
          </p>

          <p>
            ₹${product.price}
          </p>

          <div class="cart-controls">

            <button onclick="changeQuantity(${index}, -1)">
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button onclick="changeQuantity(${index}, 1)">
              +
            </button>

            <button
              class="remove-btn"
              onclick="removeCartItem(${index})"
            >
              ×
            </button>

          </div>

        </div>

      </div>

    `;

  });


  document.getElementById("cartTotal")
    .textContent = total;

}


/* -----------------------------------------
   CART QUANTITY
----------------------------------------- */

function changeQuantity(index, change) {

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }

  saveCart();
  renderCart();

}


function removeCartItem(index) {

  cart.splice(index, 1);

  saveCart();
  renderCart();

}


/* -----------------------------------------
   CHECKOUT
----------------------------------------- */

function openCheckout() {

  if (cart.length === 0) {

    alert("YOUR CART IS EMPTY");

    return;

  }

  closeCart();

  createOrderDetails();

  document
    .getElementById("checkoutModal")
    .classList.remove("hidden");

}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.add("hidden");

}


/* -----------------------------------------
   ORDER DETAILS
----------------------------------------- */

function createOrderDetails() {

  let details = "";
  let total = 0;

  cart.forEach(item => {

    const product =
      products.find(
        product => product.id === item.id
      );

    if (!product) return;

    const itemTotal =
      product.price * item.quantity;

    total += itemTotal;

    details +=
      `${product.name} | Size: ${item.size} | Qty: ${item.quantity} | ₹${itemTotal}\n`;

  });


  details += `\nTOTAL: ₹${total}`;

  document.getElementById("orderDetails")
    .value = details;

}


/* -----------------------------------------
   VALIDATE ORDER
----------------------------------------- */

function validateOrder() {

  const name =
    document.getElementById("customerName")
      .value.trim();

  const phone =
    document.getElementById("customerPhone")
      .value.trim();

  const address =
    document.getElementById("customerAddress")
      .value.trim();

  const landmark =
    document.getElementById("customerLandmark")
      .value.trim();

  const pincode =
    document.getElementById("customerPincode")
      .value.trim();


  if (name.length < 2) return false;

  if (!/^[6-9][0-9]{9}$/.test(phone))
    return false;

  if (address.length < 10)
    return false;

  if (landmark.length < 2)
    return false;

  if (!/^[0-9]{6}$/.test(pincode))
    return false;


  return true;

}


/* -----------------------------------------
   PLACE ORDER
----------------------------------------- */

function placeOrder(event) {

  event.preventDefault();


  const incorrect =
    document.getElementById("incorrectMessage");


  if (!validateOrder()) {

    incorrect.classList.remove("hidden");

    return false;

  }


  incorrect.classList.add("hidden");


  /*
    Open PhonePe / Paytm UPI app.

    IMPORTANT:
    Replace YOUR-UPI-ID-HERE above with
    your actual UPI ID.
  */

  const total =
    calculateTotal();


  if (UPI_ID !== "YOUR-UPI-ID-HERE") {

    const upiUrl =
      `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
      `&pn=${encodeURIComponent("SPY AURA")}` +
      `&am=${total}` +
      `&cu=INR` +
      `&tn=${encodeURIComponent("SPY AURA ORDER")}`;

    window.location.href = upiUrl;

  }


  /*
    FormSubmit email notification.

    This submits the order information
    to your email after validation.
  */

  const form =
    document.getElementById("orderForm");

  form.submit();


  /*
    Save order locally.
  */

  const order = {

    orderId:
      "AURA-" +
      Date.now(),

    name:
      document.getElementById("customerName").value,

    phone:
      document.getElementById("customerPhone").value,

    address:
      document.getElementById("customerAddress").value,

    landmark:
      document.getElementById("customerLandmark").value,

    pincode:
      document.getElementById("customerPincode").value,

    payment:
      document.querySelector(
        'input[name="Payment"]:checked'
      ).value,

    total:
      total,

    products:
      [...cart],

    date:
      new Date().toLocaleString()

  };


  localStorage.setItem(
    "lastSpyAuraOrder",
    JSON.stringify(order)
  );


  /*
    Show success screen.
  */

  setTimeout(() => {

    closeCheckout();

    document
      .getElementById("successModal")
      .classList.remove("hidden");

  }, 700);


  return false;

}


/* -----------------------------------------
   TOTAL
----------------------------------------- */

function calculateTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          product => product.id === item.id
        );

      if (!product) return total;

      return total +
        product.price * item.quantity;

    },
    0
  );

}


/* -----------------------------------------
   FINISH ORDER
----------------------------------------- */

function finishOrder() {

  cart = [];

  saveCart();

  document
    .getElementById("successModal")
    .classList.add("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* -----------------------------------------
   SHOP NOW
----------------------------------------- */

function scrollToProducts() {

  document
    .getElementById("productsSection")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* -----------------------------------------
   CLOSE MODALS WHEN CLICKING BACKGROUND
----------------------------------------- */

document.addEventListener("click", event => {

  if (event.target.classList.contains("modal")) {

    event.target.classList.add("hidden");

  }

});

const products = [
  {
    id: "AURA-JEANS-001",
    name: "AURA Oversized Baggy Jeans",
    price: 1499,
    images: [
      "1000010452.jpg",
      "1000010451.jpg",
      "1000010450.jpg",
      "1000010455.jpg",
      "1000010454.jpg",
      "1000010453.jpg"
    ]
  }
];
