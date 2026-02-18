const categoryContainer = document.getElementById("categoryContainer");
const productContainer = document.getElementById("productContainer");

let allProducts = [];

// Load everything when page loads
window.addEventListener("DOMContentLoaded", async () => {
  await loadCategories();
  await loadAllProducts();
});


// =============================
// Load All Products
// =============================
const loadAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  allProducts = await res.json();
  displayProducts(allProducts);
};


// =============================
// Load Categories
// =============================
const loadCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  categoryContainer.innerHTML = "";

  // Add "All"
  createCategoryButton("All");

  categories.forEach(cat => {
    createCategoryButton(cat);
  });
};


// Create Category Button 
const createCategoryButton = (category) => {
  const btn = document.createElement("button");

  btn.innerText =
    category.charAt(0).toUpperCase() + category.slice(1);

  btn.className =
    "px-5 py-2 border rounded-full text-sm hover:bg-indigo-600 hover:text-white transition";

  btn.addEventListener("click", () => {

    document.querySelectorAll("#categoryContainer button")
      .forEach(b => b.classList.remove("bg-indigo-600", "text-white"));

    btn.classList.add("bg-indigo-600", "text-white");

    if (category === "All") {
      displayProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        p => p.category === category
      );
      displayProducts(filtered);
    }
  });

  categoryContainer.appendChild(btn);
};


// 
// Display Products in detais (With image)
// 
const displayProducts = (products) => {

  productContainer.innerHTML = "";

  products.forEach(product => {

    const card = document.createElement("div");

    card.className =
      "bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition";

    card.innerHTML = `
      <img src="${product.image}"
           class="h-48 w-full object-contain mb-4" />

      <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
        ${product.category}
      </span>

      <h3 class="font-semibold mt-2 text-sm">
        ${product.title.slice(0, 40)}...
      </h3>

      <div class="text-yellow-500 text-sm mt-1">
        ⭐ ${product.rating.rate}
        <span class="text-gray-400">
          (${product.rating.count})
        </span>
      </div>

      <p class="font-bold mt-2">$${product.price}</p>

      <div class="flex justify-between mt-4">
        <button class="text-sm px-4 py-1 border rounded">
          Details
        </button>

        <button class="text-sm px-4 py-1 bg-indigo-600 text-white rounded">
          Add
        </button>
      </div>
    `;

    productContainer.appendChild(card);
  });
};