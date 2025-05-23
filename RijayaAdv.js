const autoButtons = document.querySelectorAll('.navigation-auto div');
let index = 0;

function autoSlide() {
    index++;
    if (index > autoButtons.length - 1) {
        index = 0;
    }
    document.getElementById(`img${index + 1}`).checked = true;
    setTimeout(autoSlide, 5000); // Ganti setiap 5 detik
}

setTimeout(autoSlide, 5000);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar background change on scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Add glitch effect to gaming logo
    const gamingLogo = document.querySelector('.gaming-logo');
    if (gamingLogo) {
        gamingLogo.addEventListener('mouseover', function() {
            this.style.animation = 'glitch 0.5s ease';
        });
        
        gamingLogo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
});

// Glitch animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
`;
document.head.appendChild(style);

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add custom cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--rog-red);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        mix-blend-mode: difference;
    }

    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        width: 40px;
        height: 40px;
        background-color: rgba(255, 0, 41, 0.1);
    }
`;
document.head.appendChild(cursorStyle);

// keranjang angka
let cart = [];
let total = 0;

// keranjang nama harga
function addToCart(name, price,) {
    cart.push({ name, price });
    updateCart();
    updateCartCount();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>${item.name}</span>
                    <span>Rp. ${item.price}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById('cartTotal').textContent = total;
}


function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// hapus item di keranjang
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    updateCartCount();
}

// tombol checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    $('#cartModal').modal('hide');
    $('#checkoutModal').modal('show');
}

function placeOrder() {
    if (!document.getElementById('checkoutForm').checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }
    
    alert('Order placed successfully! We will contact you soon.');
    cart = [];
    updateCart();
    updateCartCount();
    $('#checkoutModal').modal('hide');
}

// daftar ke login
function switchToRegister() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    registerModal.show();
}

function switchToLogin() {
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

//login
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Dummy validation
    if (email && password) {
        alert("Login successful!");
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
    } else {
        alert("Please fill in all fields.");
    }
}

// daftar
function registerUser() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Dummy validation
    if (name && email && password) {
        alert("Registration successful!");
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
    } else {
        alert("Please fill in all fields.");
    }
}


function showProductDetail(name, image, price, description) {
    document.getElementById('productDetailTitle').textContent = name;
    document.getElementById('productDetailImage').src = image;
    document.getElementById('productDetailPrice').textContent = price;
    document.getElementById('productDetailDescription').textContent = description;

    // Update button action
    const addBtn = document.getElementById('productDetailAddCartBtn');
    addBtn.onclick = function () {
        // Ambil angka dari harga (contoh: Rp 20.000/m -> 20000)
        const cleanPrice = parseInt(price.replace(/[^\d]/g, ''));
        addToCart(name, cleanPrice);
        const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
        modal.hide(); // Tutup modal setelah menambah ke cart
    };

    // Tampilkan modal
    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
}


