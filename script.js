const products = [
  {
    id: 1, name: "Classic Sneakers", category: "Footwear",
    price: 4500,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2, name: "Stylish Backpack", category: "Accessories",
    price: 3200,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3, name: "Classic Watch", category: "Accessories",
    price: 5500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4, name: "Casual T-Shirt", category: "Fashion",
    price: 1800,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5, name: "Modern Headphones", category: "Electronics",
    price: 6500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6, name: "Travel Sunglasses", category: "Accessories",
    price: 2200,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7, name: "Everyday Sneakers", category: "Footwear",
    price: 3900,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8, name: "Smart Backpack", category: "Accessories",
    price: 2800,
    image: "https://images.unsplash.com/photo-1581605405669-fbef5c6a2c1b?auto=format&fit=crop&w=600&q=80"
  }
];

const productContainer = document.getElementById("product-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-button");
const cartMessage = document.getElementById("cart-message");
const noResults = document.getElementById("no-results");

const cart = [];

function renderProducts(items) {
  productContainer.innerHTML = "";

  noResults.hidden = items.length !== 0;

  items.forEach(function (product) {
    const column = document.createElement("div");
    column.className = "col-6 col-lg-3";

    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.onerror = function () {
      image.alt = product.name + " image unavailable";
      image.removeAttribute("src");
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h5");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = "Rs. " + product.price.toLocaleString("en-PK");

    const button = document.createElement("button");
    button.className = "add-cart";
    button.textContent = "Add to Cart";
    button.type = "button";

    button.addEventListener("click", function () {
      cart.push(product);
      cartCount.textContent = cart.length;
      showMessage(product.name + " added to cart!");
    });

    info.append(category, name, price, button);
    card.append(image, info);
    column.appendChild(card);
    productContainer.appendChild(column);
  });
}

function showMessage(message) {
  cartMessage.textContent = message;
  cartMessage.style.display = "block";
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  const filtered = products.filter(function (product) {
    return product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
  });

  renderProducts(filtered);
});

cartButton.addEventListener("click", function () {
  if (cart.length === 0) {
    showMessage("Your cart is empty.");
    return;
  }

  const total = cart.reduce(function (sum, product) {
    return sum + product.price;
  }, 0);

  showMessage(
    cart.length + " item(s) | Total: Rs. " +
    total.toLocaleString("en-PK") +
    " — Demo cart, no real checkout."
  );
});

renderProducts(products);
