document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times'); // Cambiar icono a 'X'
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // Ajustar para el encabezado fijo
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Product filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Eliminar la clase activa de todos los botones de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir la clase activa al botón clickeado
            button.classList.add('active');

            const filter = button.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.brand === filter) {
                    card.style.display = 'block'; // Asegura que se vuelva visible
                    card.classList.add('fade-in'); // Vuelve a añadir animación para efecto
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in'); // Elimina animación si está oculto
                }
            });
        });
    });

    // --- Lightbox Functionality --- (Este es el código nuevo y relevante)
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const lightboxDetailsDiv = document.getElementById('lightbox-details'); // Referencia al div de detalles

    // Seleccionar todos los botones "Ver más"
    const productViewMoreBtns = document.querySelectorAll('.product-actions .btn-outline');

    productViewMoreBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            // Encuentra el 'product-card' más cercano al botón clickeado
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                // Obtener la URL de la imagen del producto
                const imgSrc = productCard.querySelector('.product-img img').src;
                // Obtener el título del producto
                const productTitle = productCard.querySelector('.product-info h3').textContent;
                // Obtener la marca del producto
                const productBrand = productCard.querySelector('.product-brand').textContent;
                // Obtener el precio del producto
                const productPrice = productCard.querySelector('.product-price .price').textContent;
                // Obtener el precio antiguo si existe
                const productOldPriceElement = productCard.querySelector('.product-price .old-price');
                const productOldPrice = productOldPriceElement ? productOldPriceElement.textContent : '';

                // Asignar la imagen al lightbox
                lightboxImage.src = imgSrc;
                lightboxImage.alt = productTitle; // Mejorar accesibilidad

                // Construir el HTML para los detalles del lightbox
                let detailsHtml = `<h2>${productTitle}</h2>`;
                detailsHtml += `<p>Marca: ${productBrand}</p>`;
                detailsHtml += `<p>Precio: ${productPrice}`;
                if (productOldPrice) {
                    detailsHtml += ` <span style="text-decoration: line-through; color: var(--gray); font-size: 0.9em;">${productOldPrice}</span>`;
                }
                detailsHtml += `</p>`;
                // Si tuvieras una descripción más larga en un atributo data-description en el product-card
                // const productDescription = productCard.dataset.description || 'No hay descripción disponible.';
                // detailsHtml += `<p>${productDescription}</p>`;


                // Inyectar los detalles en el div correspondiente
                lightboxDetailsDiv.innerHTML = detailsHtml;

                // Mostrar el lightbox añadiendo la clase 'active'
                lightbox.classList.add('active');
            }
        });
    });

    // Cerrar lightbox haciendo clic en la 'X'
    closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('active'); // Ocultar el lightbox
    });

    // Cerrar lightbox haciendo clic fuera del contenido (en el overlay)
    lightbox.addEventListener('click', (event) => {
        // Si el clic fue directamente en el fondo del lightbox y no en su contenido
        if (event.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});