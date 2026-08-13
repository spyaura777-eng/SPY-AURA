let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({
    name: name,
    price: price
  });

  total += price;

  document.getElementById("cart-count").textContent = cart.length;

  alert(name + " added to cart!");
}

function showCart() {
  const popup = document.getElementById("cart-popup");
  const items = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    items.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    items.innerHTML = "";

    cart.forEach(function(item, index) {
      const product = document.createElement("p");

      product.textContent =
        (index + 1) + ". " + item.name + " - ₹" + item.price;

      items.appendChild(product);
    });
  }

  cartTotal.textContent = total;

  popup.style.display = "flex";
}

function closeCart() {
  document.getElementById("cart-popup").style.display = "none";
}

window.addEventListener("click", function(event) {
  const popup = document.getElementById("cart-popup");

  if (event.target === popup) {
    closeCart();
  }
});
