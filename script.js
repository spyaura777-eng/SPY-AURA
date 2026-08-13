const products = [
  {
    id: 1,
    name: "Aura Black Tee",
    type: "tshirt",
    price: 799,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    badge: "NEW"
  },

  {
    id: 2,
    name: "Oversized White Tee",
    type: "tshirt",
    price: 899,
    img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    badge: "BESTSELLER"
  },

  {
    id: 3,
    name: "Essential Black Hoodie",
    type: "hoodie",
    price: 1499,
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    badge: "NEW"
  },

  {
    id: 4,
    name: "Aura Grey Hoodie",
    type: "hoodie",
    price: 1599,
    img: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    badge: "SALE"
  },

  {
    id: 5,
    name: "Minimal Overshirt",
    type: "shirt",
    price: 1299,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    badge: "NEW"
  },

  {
    id: 6,
    name: "Street Black Shirt",
    type: "shirt",
    price: 1199,
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    badge: "SALE"
  },

  {
    id: 7,
    name: "Aura Cargo Pants",
    type: "pants",
    price: 1399,
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    badge: "NEW"
  },

  {
    id: 8,
    name: "Everyday Black Pants",
    type: "pants",
    price: 1299,
    img: "https://images.unsplash.com/photo-1506629905607-d9c297d2b3b5?auto=format&fit=crop&w=900&q=85",
    badge: "SALE"
  }
];


let cart = JSON.parse(
  localStorage.getItem("spyAuraCart") || "[]"
);

let liked = JSON.parse(
  localStorage.getItem("spyAuraLiked") || "[]"
);


/* SHOW PRODUCTS */

function render(list = products) {

  const productBox = document.getElementById("products");

  productBox.innerHTML = list.map(product => {

    const isLiked = liked.includes(product.id);

    return `

      <article class="product">

        <div
          class="pic"
          style="background-image:url('${product.img}')"
        >

          <span class="badge">
            ${product.badge}
          </span>

          <button
            class="like ${isLiked ? "liked" : ""}"
            onclick="toggleLike(${product.id})"
          >
            ${isLiked ? "♥" : "♡"}
          </button>

        </div>


        <div class="info">

          <small>
            SPY AURA • BOYS
          </small>

          <h3>
            ${product.name}
          </h3>

          <div class="row">

            <b>
              ₹${product.price.toLocaleString("en-IN")}
            </b>

            <button
              class="add"
              onclick="addToCart(${product.id})"
            >
              ADD TO CART
            </button>

          </div>

        </div>

      </article>

    `;

  }).join("");
}


/* LIKE */

function toggleLike(id) {

  if (liked.includes(id)) {

    liked = liked.filter(
      productId => productId !== id
    );

  } else {

    liked.push(id);

  }

  localStorage.setItem(
    "spyAuraLiked",
    JSON.stringify(liked)
  );

  render();

}


/* ADD TO CART */

function addToCart(id) {

  const product = products.find(
    item => item.id === id
  );

  if (!product) return;

  cart.push(product);

  saveCart();

  alert(
    product.name + " added to your Aura cart."
  );

}


/* SAVE CART */

function saveCart() {

  localStorage.setItem(
    "spyAuraCart",
    JSON.stringify(cart)
  );

  document.getElementById(
    "cartCount"
  ).textContent = cart.length;

}


/* OPEN CART */

function openCart() {

  renderCart();

  document
    .getElementById("cartModal")
    .classList.add("show");

}


/* SHOW CART ITEMS */

function renderCart() {

  const box =
    document.getElementById("cartItems");

  if (cart.length === 0) {

    box.innerHTML = `
      <p class="empty">
        Your cart is empty.
      </p>
    `;

  } else {

    box.innerHTML = cart.map(
      (product, index) => `

        <div class="cart-line">

          <span>
            <b>${product.name}</b>
            <br>
            ₹${product.price.toLocaleString("en-IN")}
          </span>

          <button
            onclick="removeFromCart(${index})"
          >
            REMOVE
          </button>

        </div>

      `
    ).join("");

  }


  const total =
    cart.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );


  document.getElementById(
    "total"
  ).textContent =
    "₹" + total.toLocaleString("en-IN");

}


/* REMOVE FROM CART */

function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  renderCart();

}


/* CLOSE MODAL */

function closeModal(id) {

  document
    .getElementById(id)
    .classList.remove("show");

}


/* CHECKOUT */

function openCheckout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Add a product first."
    );

    return;
  }

  closeModal("cartModal");

  document
    .getElementById("checkoutModal")
    .classList.add("show");

}


/* PLACE ORDER */

function placeOrder() {

  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const address =
    document.getElementById("address").value.trim();

  const landmark =
    document.getElementById("landmark").value.trim();

  const city =
    document.getElementById("city").value.trim();

  const pincode =
    document.getElementById("pincode").value.trim();

  const payment =
    document.getElementById("payment").value;


  if (
    !name ||
    !phone ||
    !address ||
    !landmark ||
    !city ||
    !pincode ||
    !payment
  ) {

    alert(
      "Please fill all delivery details."
    );

    return;
  }


  if (
    phone.length !== 10 ||
    !/^[0-9]+$/.test(phone)
  ) {

    alert(
      "Please enter a valid 10-digit phone number."
    );

    return;
  }


  if (
    pincode.length !== 6 ||
    !/^[0-9]+$/.test(pincode)
  ) {

    alert(
      "Please enter a valid 6-digit pincode."
    );

    return;
  }


  const orderId =
    "AURA" +
    Date.now()
      .toString()
      .slice(-6);


  const total =
    cart.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );


  document.getElementById(
    "orderMessage"
  ).innerHTML = `

    Order ID:
    <b>${orderId}</b>

    <br><br>

    Thank you ${name}! ❤️

    <br>

    Your order total is
    <b>₹${total.toLocaleString("en-IN")}</b>

    <br><br>

    Payment:
    <b>${payment}</b>

    <br><br>

    We will contact you on
    <b>${phone}</b>.

  `;


  cart = [];

  saveCart();

  closeModal("checkoutModal");

  document
    .getElementById("successModal")
    .classList.add("show");

}


/* MOBILE MENU */

function toggleMenu() {

  document
    .getElementById("nav")
    .classList.toggle("open");

}


/* PRODUCT FILTER */

function filterProducts(type) {

  if (type === "all") {

    render(products);

    return;
  }


  if (type === "sale") {

    render(
      products.filter(
        product =>
          product.badge === "SALE"
      )
    );

    return;
  }


  render(
    products.filter(
      product =>
        product.type === type
    )
  );

}


/* SEARCH */

function openSearch() {

  document
    .getElementById("searchModal")
    .classList.add("show");

  document
    .getElementById("searchInput")
    .focus();

  searchProducts();

}


function searchProducts() {

  const input =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();


  const results =
    products.filter(
      product =>
        product.name
          .toLowerCase()
          .includes(input)
    );


  const resultBox =
    document.getElementById(
      "searchResults"
    );


  if (results.length === 0) {

    resultBox.innerHTML = `
      <p class="empty">
        No products found.
      </p>
    `;

    return;
  }


  resultBox.innerHTML =
    results.map(
      product => `

        <div
          style="
            padding:12px 0;
            border-bottom:1px solid #ddd;
          "
        >

          <b>
            ${product.name}
          </b>

          <br>

          ₹${product.price.toLocaleString("en-IN")}

        </div>

      `
    ).join("");

}


/* LOGIN */

function login() {

  const phone =
    document
      .getElementById("loginPhone")
      .value
      .replace(/\D/g, "");


  if (phone.length !== 10) {

    alert(
      "Please enter a valid 10-digit mobile number."
    );

    return;
  }


  localStorage.setItem(
    "spyAuraUser",
    phone
  );


  document.getElementById(
    "loginScreen"
  ).style.display = "none";

}


/* START WEBSITE */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const user =
      localStorage.getItem(
        "spyAuraUser"
      );


    if (user) {

      document.getElementById(
        "loginScreen"
      ).style.display = "none";

    }


    render();

    saveCart();

  }
);
