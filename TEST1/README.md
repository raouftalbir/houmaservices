# Houma Services - Site de Vente de Produits Numériques

Houma Services est une plateforme e-commerce moderne conçue pour la vente de produits numériques tels que des comptes premium pour services de streaming, des crédits pour jeux vidéo et des abonnements musicaux.

## Fonctionnalités

- **Interface Responsive** : Design adaptatif pour tous les appareils (desktop, tablette, mobile)
- **Catalogue de Produits** : Affichage des produits par catégories avec filtrage
- **Panier d'Achat** : Ajout, modification et suppression de produits
- **Témoignages Clients** : Section dédiée aux avis des utilisateurs
- **FAQ** : Questions fréquemment posées avec système d'accordéon
- **Formulaire de Contact** : Pour permettre aux utilisateurs de poser des questions
- **Design Moderne** : Interface utilisateur élégante et intuitive

## Structure du Projet

```
├── index.html          # Page principale du site
├── css/
│   └── style.css       # Styles CSS du site
├── js/
│   └── script.js       # Fonctionnalités JavaScript
├── img/                # Dossier contenant les images
│   ├── hero-bg.jpg     # Image d'arrière-plan pour la section héro
│   ├── netflix.jpg     # Image pour Netflix
│   ├── disney.jpg      # Image pour Disney+
│   ├── valorant.jpg    # Image pour Valorant
│   ├── fortnite.jpg    # Image pour Fortnite
│   ├── spotify.jpg     # Image pour Spotify
│   ├── apple-music.jpg # Image pour Apple Music
│   ├── user1.jpg       # Photo de témoignage 1
│   ├── user2.jpg       # Photo de témoignage 2
│   └── user3.jpg       # Photo de témoignage 3
└── README.md           # Documentation du projet
```

## Installation

1. Clonez ce dépôt sur votre machine locale ou téléchargez-le sous forme de fichier ZIP.
2. Assurez-vous d'avoir toutes les images nécessaires dans le dossier `img/` (voir la liste dans le fichier placeholder.txt).
3. Ouvrez le fichier `index.html` dans votre navigateur pour visualiser le site.

## Personnalisation

### Ajouter de Nouveaux Produits

Pour ajouter de nouveaux produits, modifiez le tableau `products` dans le fichier `js/script.js` :

```javascript
const products = [
    {
        id: 'nouveau-produit',
        name: 'Nom du Produit',
        price: 9.99,
        image: 'img/image-produit.jpg',
        category: 'categorie',
        description: 'Description du produit',
        duration: 'Durée'
    },
    // Autres produits...
];
```

Ensuite, ajoutez la carte du produit correspondante dans le fichier `index.html` :

```html
<div class="product-card" data-category="categorie">
    <img src="img/image-produit.jpg" alt="Nom du Produit" class="product-img">
    <div class="product-info">
        <h3>Nom du Produit</h3>
        <p class="product-description">Description du produit</p>
        <div class="product-meta">
            <span class="product-duration">Durée</span>
            <span class="product-price">9,99 €</span>
        </div>
        <button class="btn btn-add-cart" data-id="nouveau-produit">Ajouter au panier</button>
    </div>
</div>
```

### Modifier les Styles

Les styles sont définis dans le fichier `css/style.css`. Vous pouvez modifier les variables CSS au début du fichier pour changer les couleurs, les polices, etc. :

```css
:root {
    --primary-color: #5e35b1;      /* Couleur principale */
    --primary-light: #7e57c2;       /* Variante claire de la couleur principale */
    --primary-dark: #4527a0;        /* Variante foncée de la couleur principale */
    --secondary-color: #00bcd4;     /* Couleur secondaire */
    /* Autres variables... */
}
```

## Intégration avec un Backend

Ce projet est actuellement une maquette frontend statique. Pour une utilisation en production, vous devriez :

1. Créer une API backend pour gérer les produits, les utilisateurs et les commandes
2. Implémenter un système d'authentification sécurisé
3. Intégrer une passerelle de paiement (comme Stripe, PayPal, etc.)
4. Mettre en place une base de données pour stocker les informations

## Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS et Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome (pour les icônes)

## Améliorations Possibles

- Ajout d'un système d'authentification
- Intégration d'une passerelle de paiement
- Mise en place d'un backend avec base de données
- Ajout d'un système de recherche
- Implémentation d'un système de notation des produits
- Ajout d'une page de détails pour chaque produit

## Licence

Ce projet est disponible sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le distribuer selon vos besoins.

---

© 2023 Houma Services. Tous droits réservés.