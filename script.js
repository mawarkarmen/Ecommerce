
        // Product data
        const products = [
            {
                id: 1,
                title: "Wireless Bluetooth Headphones",
                price: 89.99,
                category: "electronics",
                description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and commuters.",
                rating: 4.5,
                reviews: 124,
                images: [
                    "img/Headphone.jpeg",
                    "img/Headphone side.jpeg",
                    "img/Headphone Case.jpeg"
                ],
                inStock: true
            },
            {
                id: 2,
                title: "Smart Watch Fitness Tracker",
                price: 129.99,
                category: "electronics",
                description: "Track your fitness, receive notifications and monitor your health with this sleek smartwatch. Water-resistant and long battery life.",
                rating: 4.2,
                reviews: 89,
                images: [
                    "img/Smartwatch.jpeg",
                    "img/Smarwatch display.jpeg",
                    "img/Smartwatch straps.jpeg"
                ],
                inStock: true
            },
            {
                id: 3,
                title: "Men's Casual Sneakers",
                price: 59.99,
                category: "clothing",
                description: "Comfortable and stylish sneakers for everyday wear. Breathable material with cushioned sole for all-day comfort.",
                rating: 4.7,
                reviews: 215,
                images: [
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5086cd44-a94b-4495-989d-1e853ed9262b/NIKE+GATO.png",
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b22ee1f4-7380-4e3d-ab9b-06eac046a88d/NIKE+GATO.png",
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b22ee1f4-7380-4e3d-ab9b-06eac046a88d/NIKE+GATO.png"
                ],
                inStock: true
            },
            {
                id: 4,
                title: "Women's Summer Dress",
                price: 39.99,
                category: "clothing",
                description: "Lightweight summer dress with floral pattern. Perfect for warm weather with its breathable fabric.",
                rating: 4.3,
                reviews: 178,
                images: [
                    "img/Summer dress.jpg",
                    "img/Summer dress back.jpg",
                    "img/Summer dress detail.jpg"
                ],
                inStock: true
            },
            {
                id: 5,
                title: "Coffee Table Book Bundle",
                price: 49.99,
                category: "books",
                description: "Set of 3 beautifully illustrated coffee table books covering design, travel and photography.",
                rating: 4.8,
                reviews: 42,
                images: [
                    "img/book.jpg",
                    "img/book open.jpg",
                    "img/book detail.jpg"
                ],
                inStock: true
            },
            {
                id: 6,
                title: "Air Fryer with Digital Display",
                price: 99.99,
                category: "home",
                description: "Healthy cooking made easy with this 5.8L capacity air fryer. Digital display with multiple cooking presets.",
                rating: 4.6,
                reviews: 156,
                images: [
                    "img/airfryer.jpg",
                    "img/airfryer control.jpg",
                    "img/airfryer basket.jpg"
                ],
                inStock: true
            },
            {
                id: 7,
                title: "Wireless Charging Pad",
                price: 29.99,
                category: "electronics",
                description: "Fast-charging Qi-compatible wireless charger for smartphones and earbuds. Sleek design with LED indicator.",
                rating: 4.1,
                reviews: 72,
                images: [
                    "img/charging.webp",
                    "img/charging angle.jpg",
                    "img/charing phone.jpg"
                ],
                inStock: true
            },
            {
                id: 8,
                title: "Organic Cotton Throw Blanket",
                price: 34.99,
                category: "home",
                description: "Soft and cozy throw blanket made from 100% organic cotton. Perfect for sofa or bed decoration.",
                rating: 4.4,
                reviews: 93,
                images: [
                    "img/blanket.jpg",
                    "img/blanket folded.jpg",
                    "img/blanket text.jpg"
                ],
                inStock: true
            }
        ];

        // Cart state
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // DOM elements
        const productsContainer = document.getElementById('products-container');
        const productModal = document.getElementById('product-modal');
        const modalContent = document.getElementById('modal-content');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const authModal = document.getElementById('auth-modal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        const closeButtons = document.querySelectorAll('.close-modal, .close-cart');
        const categoryFilter = document.getElementById('category-filter');
        const priceSort = document.getElementById('price-sort');
        
        // Render products
        function renderProducts(productsToRender) {
            productsContainer.innerHTML = '';
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.id = product.id;
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">$${product.price}</div>
                        <div class="product-rating">
                            ${renderRatingStars(product.rating)}
                            <span>(${product.reviews})</span>
                        </div>
                        <div class="product-actions">
                            <button class="view-details">Details</button>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });
            
            // Add event listeners to dynamically created buttons
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.product-card').dataset.id);
                    openProductModal(productId);
                });
            });
            
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.product-card').dataset.id);
                    addToCart(productId);
                });
            });
        }
        
        // Render rating stars
        function renderRatingStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;
            
            let stars = '';
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            for (let i = 0; i < halfStar; i++) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }
        
        // Open product modal
        function openProductModal(productId) {
            const product = products.find(p => p.id === productId);
            
            modalContent.innerHTML = `
                <div class="modal-images">
                    <div class="main-image">
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                    <div class="thumbnail-container">
                        ${product.images.map((img, index) => `
                            <div class="thumbnail">
                                <img src="${img}" alt="${product.title} - view ${index + 1}" data-index="${index}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-details">
                    <h2>${product.title}</h2>
                    <div class="modal-price">$${product.price}</div>
                    <div class="modal-rating">
                        ${renderRatingStars(product.rating)}
                        <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <p class="modal-description">${product.description}</p>
                    <div class="quantity-selector">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" value="1" min="1">
                    </div>
                    <div class="modal-buttons">
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="buy-now-btn">Buy Now</button>
                    </div>
                </div>
            `;
            
            // Add event listeners for thumbnails
            document.querySelectorAll('.thumbnail img').forEach(thumbnail => {
                thumbnail.addEventListener('click', (e) => {
                    const mainImage = document.querySelector('.main-image img');
                    const index = e.target.dataset.index;
                    mainImage.src = product.images[index];
                    mainImage.alt = `${product.title} - view ${parseInt(index) + 1}`;
                });
            });
            
            // Add event listeners for modal buttons
            document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                const quantity = parseInt(document.getElementById('quantity').value);
                addToCart(productId, quantity);
                productModal.classList.remove('active');
            });
            
            document.querySelector('.buy-now-btn').addEventListener('click', () => {
                const quantity = parseInt(document.getElementById('quantity').value);
                addToCart(productId, quantity);
                productModal.classList.remove('active');
                cartOverlay.classList.add('active');
            });
            
            productModal.classList.add('active');
        }
        
        // Add to cart
        function addToCart(productId, quantity = 1) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    quantity: quantity
                });
            }
            
            updateCart();
            
            // Show mini notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${quantity} ${product.title} added to cart`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
        
        // Update cart
        function updateCart() {
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart total
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Update cart items
            renderCartItems();
        }
        
        // Render cart items
        function renderCartItems() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
                return;
            }
            
            cartItems.innerHTML = '';
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.dataset.id = item.id;
                
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity">+</button>
                        </div>
                        <button class="remove-item">Remove</button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
                
                // Add event listeners for quantity buttons
                const decreaseBtn = cartItem.querySelector('.decrease-quantity');
                const increaseBtn = cartItem.querySelector('.increase-quantity');
                const removeBtn = cartItem.querySelector('.remove-item');
                
                decreaseBtn.addEventListener('click', () => updateCartItem(item.id, -1));
                increaseBtn.addEventListener('click', () => updateCartItem(item.id, 1));
                removeBtn.addEventListener('click', () => removeCartItem(item.id));
            });
        }
        
        // Update cart item quantity
        function updateCartItem(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeCartItem(productId);
                } else {
                    updateCart();
                }
            }
        }
        
        // Remove cart item
        function removeCartItem(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
        
        // Filter and sort products
        function filterAndSortProducts() {
            let filteredProducts = [...products];
            
            // Filter by category
            const category = categoryFilter.value;
            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
            
            // Sort products
            const sortMethod = priceSort.value;
            switch (sortMethod) {
                case 'low-to-high':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'high-to-low':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    // Default sorting (no change)
                    break;
            }
            
            renderProducts(filteredProducts);
        }
        
        // Initialize app
        function init() {
            renderProducts(products);
            updateCart();
            
            // Event listeners
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    productModal.classList.remove('active');
                    cartOverlay.classList.remove('active');
                    authModal.classList.remove('active');
                });
            });
            
            document.querySelector('.cart-icon').addEventListener('click', () => {
                cartOverlay.classList.add('active');
            });
            
            loginBtn.addEventListener('click', () => {
                authModal.classList.add('active');
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('register-form').classList.add('hidden');
            });
            
            registerBtn.addEventListener('click', () => {
                authModal.classList.add('active');
                document.getElementById('register-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
            });
            
            authTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    authTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const tabName = tab.dataset.tab;
                    authForms.forEach(form => form.classList.add('hidden'));
                    document.getElementById(`${tabName}-form`).classList.remove('hidden');
                });
            });
            
            categoryFilter.addEventListener('change', filterAndSortProducts);
            priceSort.addEventListener('change', filterAndSortProducts);
            
            // Prevent form submissions for demo purposes
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', e => e.preventDefault());
            });
        }
        
        // Run the app
        document.addEventListener('DOMContentLoaded', init);