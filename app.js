document.addEventListener('DOMContentLoaded', function() {
    const productsTableBody = document.querySelector('#products-table tbody');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const categories = [...new Set(products.map(product => product.category))];
            displayCategories(categories);
            displayProducts(products);
        });

    function displayCategories(categories) {
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', () => filterProductsByCategory(category));
            sidebarMenu.appendChild(categoryItem);
        });
    }

    function filterProductsByCategory(category) {
        fetch('https://fakestoreapi.com/products/category/' + category)
            .then(response => response.json())
            .then(products => {
                displayProducts(products);
            });
    }

    function displayProducts(products) {
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.title}</td>
                <td><img src="${product.image}" alt="${product.title}" class="product-image"></td>
                <td>${product.price} $</td>
            `;
            productsTableBody.appendChild(productRow);
        });
    }
});
