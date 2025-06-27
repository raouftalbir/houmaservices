document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart');
    const closeCart = document.querySelector('.close-cart');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.querySelector('.contact-form');

    // Panier
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Produits (normalement ces données viendraient d'une API ou d'une base de données)
    const products = [
        {
            id: "netflix1",
            name: "Netflix",
            price: 14.99,
            image: "img/netflix.svg",
            category: "streaming",
            description: "Accès illimité à des films, séries et documentaires",
            duration: "1 mois"
        },
        {
            id: "disney1",
            name: "Disney+",
            price: 8.99,
            image: "img/disney.svg",
            category: "streaming",
            description: "Contenu Disney, Marvel, Star Wars et National Geographic",
            duration: "1 mois"
        },
        {
            id: "valorant1",
            name: "Valorant Points",
            price: 10.99,
            image: "img/valorant.svg",
            category: "gaming",
            description: "1000 points pour acheter des skins et des objets in-game",
            duration: "Permanent"
        },
        {
            id: "fortnite1",
            name: "Fortnite V-Bucks",
            price: 9.99,
            image: "img/fortnite.svg",
            category: "gaming",
            description: "1000 V-Bucks pour acheter des skins et des objets in-game",
            duration: "Permanent"
        },
        {
            id: "spotify1",
            name: "Spotify Premium",
            price: 9.99,
            image: "img/spotify.svg",
            category: "music",
            description: "Musique sans publicité avec téléchargement hors ligne",
            duration: "1 mois"
        },
        {
            id: "applemusic1",
            name: "Apple Music",
            price: 29.99,
            image: "img/apple-music.svg",
            category: "music",
            description: "Accès à plus de 75 millions de titres en streaming",
            duration: "3 mois"
        },
        {
            id: "vpn1",
            name: "VPN Premium",
            price: 39.99,
            image: "img/vpn.svg",
            category: "vpn",
            description: "Accès sécurisé à Internet avec serveurs dans 90+ pays",
            duration: "12 mois"
        },
        {
            id: "minecraft1",
            name: "Minecraft Premium",
            price: 24.99,
            image: "img/minecraft.svg",
            category: "gaming",
            description: "Compte Minecraft Java Edition avec accès complet",
            duration: "Permanent"
        },
        {
            id: "cs2",
            name: "Counter-Strike 2",
            price: 29.99,
            image: "img/counter-strike.svg",
            category: "gaming",
            description: "Compte CS2 avec skins exclusifs et niveau élevé",
            duration: "Permanent"
        },
        {
        id: "itunes1",
        name: "iTunes Gift Card",
        price: 25.00,
        image: "img/itunes.svg",
        category: "giftcards",
        description: "Carte cadeau pour acheter musique, films, apps et plus",
        duration: "Permanent"
    },
    {
        id: "googleplay1",
        name: "Google Play Gift Card",
        price: 20.00,
        image: "img/google-play.svg",
        category: "giftcards",
        description: "Carte cadeau pour jeux, apps, films et livres sur Google Play",
        duration: "Permanent"
    },
        {
            id: "amazonprime1",
            name: "Amazon Prime Gaming",
            price: 19.99,
            image: "img/amazon-prime.svg",
            category: "streaming",
            description: "Jeux gratuits, contenu in-game et abonnement Twitch",
            duration: "3 mois"
        },
        {
        id: "chatgpt1",
        name: "ChatGPT Plus",
        price: 19.99,
        image: "img/chatgpt.svg",
        category: "streaming",
        description: "Accès prioritaire, fonctionnalités avancées et GPT-4",
        duration: "1 mois"
    },
    {
        id: "discord1",
        name: "Discord Nitro",
        price: 9.99,
        image: "img/discord-nitro.svg",
        category: "gaming",
        description: "Emojis personnalisés, badges, streaming HD et plus",
        duration: "1 mois"
    }
    ];

    // Initialisation
    updateCartUI();

    // Navigation mobile
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Filtrage des produits
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filtrer les produits
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // FAQ accordéon
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fermer tous les autres items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle l'item actuel
            item.classList.toggle('active');
        });
    });

    // Gestion du panier
    function updateCartUI() {
        // Mettre à jour le nombre d'articles dans le panier
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Mettre à jour le contenu du panier
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide</p>';
            cartTotalPrice.textContent = '0,00 €';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const itemTotal = product.price * item.quantity;
                total += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${product.name}</h3>
                        <p class="cart-item-price">${product.price.toFixed(2)} €</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${product.id}">
                            <button class="quantity-btn increase" data-id="${product.id}">+</button>
                        </div>
                    </div>
                    <i class="fas fa-trash remove-item" data-id="${product.id}"></i>
                `;

                cartItemsContainer.appendChild(cartItemElement);

                // Ajouter les événements pour les boutons de quantité
                const decreaseBtn = cartItemElement.querySelector('.decrease');
                const increaseBtn = cartItemElement.querySelector('.increase');
                const quantityInput = cartItemElement.querySelector('.quantity-input');
                const removeBtn = cartItemElement.querySelector('.remove-item');

                decreaseBtn.addEventListener('click', () => {
                    updateItemQuantity(product.id, item.quantity - 1);
                });

                increaseBtn.addEventListener('click', () => {
                    updateItemQuantity(product.id, item.quantity + 1);
                });

                quantityInput.addEventListener('change', (e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity > 0) {
                        updateItemQuantity(product.id, newQuantity);
                    } else {
                        e.target.value = item.quantity;
                    }
                });

                removeBtn.addEventListener('click', () => {
                    removeItemFromCart(product.id);
                });
            }
        });

        // Mettre à jour le total
        cartTotalPrice.textContent = `${total.toFixed(2)} €`;
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }

        // Sauvegarder dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mettre à jour l'interface
        updateCartUI();

        // Afficher un message de confirmation
        showNotification('Produit ajouté au panier');
    }

    function updateItemQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeItemFromCart(productId);
            return;
        }

        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    function clearCart() {
        cart = [];
        localStorage.removeItem('cart');
        updateCartUI();
        showNotification('Panier vidé');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        // Afficher la notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Cacher et supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Événements pour le panier
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Fermer le panier en cliquant en dehors
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    clearCartBtn.addEventListener('click', clearCart);

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Votre panier est vide');
            return;
        }
        
        // Ici, vous redirigeriez normalement vers une page de paiement
        // Pour cet exemple, nous allons simplement afficher un message
        showNotification('Redirection vers la page de paiement...');
        setTimeout(() => {
            alert('Cette fonctionnalité serait connectée à un système de paiement réel.');
        }, 1500);
    });

    // Gestion du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs');
                return;
            }
            
            // Ici, vous enverriez normalement les données à un serveur
            // Pour cet exemple, nous allons simplement afficher un message
            showNotification('Message envoyé avec succès');
            contactForm.reset();
        });
    }

    // Animation au défilement
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < windowHeight - revealPoint) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Appeler la fonction au chargement et au défilement
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Ajouter des styles CSS pour l'animation de notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s, transform 0.8s;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
});