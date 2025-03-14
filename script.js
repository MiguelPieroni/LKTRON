// Menú móvil
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const spans = document.querySelectorAll('.nav-toggle span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar el menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Resetear el botón hamburguesa
        const spans = document.querySelectorAll('.nav-toggle span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Función para animar elementos al hacer scroll
function revealElements() {
    const elements = document.querySelectorAll('.reveal-element');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementPosition < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            // Descomentar esta línea si desea que los elementos vuelvan a ocultarse al salir de la vista
            // element.classList.remove('active');
        }
    });
}

// Evento de scroll para activar la función de revelación
window.addEventListener('scroll', revealElements);

// Activar la función al cargar la página para mostrar los elementos visibles inicialmente
window.addEventListener('load', () => {
    revealElements();
    
    // Para asegurarnos de que los elementos se carguen correctamente
    setTimeout(revealElements, 100);
});

// Submenu para navegación móvil si lo necesitas
const hasSubmenu = document.querySelectorAll('.has-submenu');

hasSubmenu.forEach(item => {
    item.addEventListener('click', function(e) {
        // Evitar que se cierre el menú completo al hacer clic en un elemento con submenú
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('submenu-active');
        }
    });
});

// Animación suave para los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Ajustar por la altura de la barra de navegación
                behavior: 'smooth'
            });
        }
    });
});

// Validación simple del formulario de contacto
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function() {
        // Customize the subject with the user's name
        const nombreUsuario = document.querySelector('input[name="nombre"]').value;
        if (nombreUsuario) {
            document.querySelector('input[name="_subject"]').value = "Nuevo contacto de " + nombreUsuario + " desde ElectroService";
        }
        
        // No preventDefault() here - allowing the form to submit normally
        // The alert is removed because it would interrupt the form submission
    });
}

// Cambiar estilo de la barra de navegación al hacer scroll (solo en escritorio)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // Solo aplicar cambios en dispositivos de escritorio (ancho > 768px)
    if (window.innerWidth > 768) {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    } else {
        // En móvil, mantener un tamaño fijo
        navbar.style.padding = '15px 0';
    }
});

// Contador de estadísticas (opcional, puedes añadirlo si lo necesitas)
function startCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (count < target) {
                counter.innerText = Math.ceil(count);
                count += increment;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Activar contador cuando esté visible en la pantalla (opcional)
const statsSection = document.querySelector('.stats-section');

if (statsSection) {
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            startCounter();
            observer.disconnect();
        }
    }, options);
    
    observer.observe(statsSection);
}

// Carrusel para proyectos en móvil con autoplay
document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectItems = document.querySelectorAll('.project-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    // Solo inicializar si estamos en móvil y existen los elementos
    if (window.innerWidth <= 576 && projectsGrid && projectItems.length > 0) {
        initProjectCarousel();
    }
    
    // Reinicializar al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 576 && projectsGrid && projectItems.length > 0) {
            initProjectCarousel();
        }
    });
    
    function initProjectCarousel() {
        // Variables para el carrusel
        let currentIndex = 0;
        let autoplayInterval;
        const autoplayDelay = 4000; // 4 segundos entre slides
        
        // Crear indicadores
        indicatorsContainer.innerHTML = '';
        projectItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay(); // Reinicia el temporizador cuando hay interacción
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        
        // Configurar botones de navegación
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoplay(); // Reinicia el temporizador cuando hay interacción
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoplay(); // Reinicia el temporizador cuando hay interacción
            });
        }
        
        // Función para ir a una diapositiva específica
        function goToSlide(index) {
            // Manejar límites
            if (index < 0) {
                index = projectItems.length - 1;
            } else if (index >= projectItems.length) {
                index = 0;
            }
            
            currentIndex = index;
            
            // Desplazar al elemento
            const offset = projectItems[index].offsetLeft;
            projectsGrid.scrollTo({
                left: offset,
                behavior: 'smooth'
            });
            
            // Actualizar indicadores
            document.querySelectorAll('.indicator').forEach((ind, i) => {
                if (i === index) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        }
        
        // Iniciar autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, autoplayDelay);
        }
        
        // Detener autoplay
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Reiniciar autoplay (usado cuando hay interacción)
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }
        
        // Detectar cambios de deslizamiento
        projectsGrid.addEventListener('scroll', function() {
            const scrollPosition = projectsGrid.scrollLeft;
            
            projectItems.forEach((item, index) => {
                const itemOffset = item.offsetLeft;
                const itemWidth = item.offsetWidth;
                
                // Si el elemento está mayormente visible
                if (scrollPosition >= itemOffset - itemWidth / 2 && 
                    scrollPosition < itemOffset + itemWidth / 2) {
                    // Actualizar índice actual e indicadores
                    currentIndex = index;
                    document.querySelectorAll('.indicator').forEach((ind, i) => {
                        ind.classList.toggle('active', i === index);
                    });
                }
            });
        });
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        projectsGrid.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay(); // Pausar autoplay en interacción táctil
        }, {passive: true});
        
        projectsGrid.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay(); // Reanudar autoplay después de interacción
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Deslizar a la izquierda
                goToSlide(currentIndex + 1);
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Deslizar a la derecha
                goToSlide(currentIndex - 1);
            }
        }
        
        // Pausar autoplay cuando el usuario está interactuando con el carrusel
        projectsGrid.addEventListener('mouseenter', stopAutoplay);
        projectsGrid.addEventListener('mouseleave', startAutoplay);
        
        // Iniciar autoplay al cargar
        startAutoplay();
    }
});



// Función para alternar el estado del desplegable
function toggleCollapsible() {
    // Obtener elemento padre
    const parent = this.parentElement;
    
    // Alternar clase active
    parent.classList.toggle('active');
    this.classList.toggle('active');
    
    // Obtener contenido desplegable
    const content = parent.querySelector('.collapsible-content');
    
    // Aplicar altura para la animación
    if (parent.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = "0px";
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initFooterCollapsibles();
});


// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    const collapsibleContents = document.querySelectorAll('.collapsible-content');
    
    if (window.innerWidth > 768) {
        // En escritorio, asegurar que todo esté expandido
        collapsibleContents.forEach(content => {
            content.style.maxHeight = 'none';
        });
    } else {
        // En móvil, colapsar todo
        collapsibleContents.forEach(content => {
            const parent = content.parentElement;
            if (!parent.classList.contains('active')) {
                content.style.maxHeight = 0;
            }
        });
    }
});

// Función de inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de cabecera desplegable en el footer
    const toggleButtons = document.querySelectorAll('.footer-mobile .footer-toggle');
    
    // Añadir listener de eventos a cada botón de alternancia
    toggleButtons.forEach(function(toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Encontrar el elemento padre que contiene todo el bloque desplegable
            const parentContainer = this.parentElement;
            
            // Encontrar el contenido desplegable dentro de este contenedor
            const collapsibleContent = parentContainer.querySelector('.collapsible-content');
            
            // Encontrar el icono de flecha dentro del botón de alternancia
            const chevronIcon = this.querySelector('.fa-chevron-down');
            
            // Alternar la clase 'active' en el contenedor padre
            parentContainer.classList.toggle('active');
            
            // Si está activo, mostrar el contenido y rotar flecha; si no, ocultarlo y restablecer flecha
            if (parentContainer.classList.contains('active')) {
                collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 'px';
                // Rotar flecha hacia arriba
                chevronIcon.style.transform = 'rotate(180deg)';
            } else {
                collapsibleContent.style.maxHeight = '0px';
                // Restablecer flecha hacia abajo
                chevronIcon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Configurar estado inicial para vista móvil
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.footer-mobile .collapsible-content').forEach(function(content) {
            content.style.maxHeight = '0px';
        });
    }
});

// Inicializar los elementos FAQ desplegables
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de pregunta
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Añadir listener de eventos a cada pregunta
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            // Encontrar el elemento padre (faq-item)
            const faqItem = this.parentElement;
            
            // Alternar la clase 'active' en el faq-item
            faqItem.classList.toggle('active');
            
            // Encontrar el elemento de respuesta
            const answer = faqItem.querySelector('.faq-answer');
            
            // Si está activo, expandir la respuesta
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                // Si no está activo, colapsar la respuesta
                answer.style.maxHeight = '0';
            }
        });
    });
});

// Función para manejar el campo de otra localidad
document.addEventListener('DOMContentLoaded', function() {
    const seleccionZona = document.getElementById('seleccionZona');
    const otraLocalidadContainer = document.getElementById('otraLocalidadContainer');
    const otraLocalidadInput = document.getElementById('otraLocalidad');
    
    if (seleccionZona && otraLocalidadContainer && otraLocalidadInput) {
        // Al cambiar la selección
        seleccionZona.addEventListener('change', function() {
            if (seleccionZona.value === 'otra') {
                // Mostrar campo para escribir localidad
                otraLocalidadContainer.style.display = 'block';
                otraLocalidadInput.required = true;
                
                // Efecto suave de aparición
                otraLocalidadContainer.style.opacity = '0';
                setTimeout(function() {
                    otraLocalidadContainer.style.transition = 'opacity 0.3s ease';
                    otraLocalidadContainer.style.opacity = '1';
                }, 10);
            } else {
                // Ocultar campo
                otraLocalidadContainer.style.display = 'none';
                otraLocalidadInput.required = false;
            }
        });
        
        // Manejar envío del formulario
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                if (seleccionZona.value === 'otra' && !otraLocalidadInput.value.trim()) {
                    event.preventDefault();
                    alert('Por favor, ingrese su localidad');
                }
            });
        }
    }
});