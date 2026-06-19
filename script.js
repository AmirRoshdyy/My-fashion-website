// Product Data - Replace with your own clothing!
const products = [
  {
    id: 1,
    name: "Classic Black T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Gray Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Blue Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 4,
    name: "Brown Leather Jacket",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "White Sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    sizes: ["XS", "S", "M", "L"]
  }
];

// Display products
function displayProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">
$$
{product.price.toFixed(2)}</p>
      <select id="size-${product.id}">
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
      </select>
      <br />
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const sizeSelect = document.getElementById(`size-${productId}`);
  const size = sizeSelect ? sizeSelect.value : "M";
  
  const cart = getCart();
  cart.push({ ...product, selectedSize: size });
  saveCart(cart);
  
  alert(`${product.name} (Size: ${size}) added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.textContent = getCart().length;
  }
}

// Cart page display
function displayCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "";
    return;
  }
  
  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Size: ${item.selectedSize}</p>
        <p class="price">
$$
{item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order! (This is a demo. To accept real payments, integrate Stripe or PayPal.)");
  localStorage.removeItem("cart");
  displayCart();
  updateCartCount();
}

// Initialize
displayProducts();
updateCartCount();
displayCart();
