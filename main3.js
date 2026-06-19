let allProducts = [];

(function() {
        const GITHUB_URL = 'https://raw.githubusercontent.com/inkognitoexe-code/MyprojectProduct/main/products.json';
        
        const LOCAL_PRODUCTS = [
            { 
                id: 1,
                title: 'Апельсины',
                price: 499,
                rating: 4.8,
                reviews: 142,
                date: '2026-06-10',
                img: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 2, 
                title: 'Лимоны', 
                price: 299, 
                rating: 4.7, 
                reviews: 98, 
                date: '2026-06-09', 
                img: 'https://images.unsplash.com/photo-1589903966004-6a7c8b6b2f69?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 3, 
                title: 'Грейпфрут', 
                price: 359, 
                rating: 4.5, 
                reviews: 76, 
                date: '2026-06-08', 
                img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 4, 
                title: 'Мандарины', 
                price: 429, 
                rating: 4.9, 
                reviews: 211, 
                date: '2026-06-07', 
                img: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 5, 
                title: 'Лайм', 
                price: 219, 
                rating: 4.3, 
                reviews: 53, 
                date: '2026-06-06', 
                img: 'https://images.unsplash.com/photo-1589903966004-6a7c8b6b2f69?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 6, 
                title: 'Помело', 
                price: 559, 
                rating: 4.6, 
                reviews: 67, 
                date: '2026-06-05', 
                img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 7, 
                title: 'Цитрон', 
                price: 699, 
                rating: 4.2, 
                reviews: 34, 
                date: '2026-06-04', 
                img: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 8, 
                title: 'Бергамот', 
                price: 789, 
                rating: 4.4, 
                reviews: 42, 
                date: '2026-06-03', 
                img: 'https://images.unsplash.com/photo-1589903966004-6a7c8b6b2f69?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 9, 
                title: 'Кумкват', 
                price: 899, 
                rating: 4.9, 
                reviews: 88, 
                date: '2026-06-02', 
                img: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 10, 
                title: 'Свити', 
                price: 469, 
                rating: 4.1, 
                reviews: 29, 
                date: '2026-06-01', 
                img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 11, 
                title: 'Павловский лимон', 
                price: 629, 
                rating: 4.7, 
                reviews: 112, 
                date: '2026-05-30', 
                img: 'https://images.unsplash.com/photo-1589903966004-6a7c8b6b2f69?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 12, 
                title: 'Каламондин', 
                price: 519, 
                rating: 4.3, 
                reviews: 47, 
                date: '2026-05-28', 
                img: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 13, 
                title: 'Юзу', 
                price: 999, 
                rating: 4.8, 
                reviews: 63, 
                date: '2026-05-25', 
                img: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop&crop=center'
            },
            { 
                id: 14, 
                title: 'Икра цитрусовая', 
                price: 1299, 
                rating: 4.0, 
                reviews: 18, 
                date: '2026-05-20', 
                img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&crop=center'
            },
        ];

        
        let currentPage = 0;
        const PAGE_SIZE = 10;

        const catalogGrid = document.getElementById('catalogGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const recommendedWrapper = document.getElementById('recommendedWrapper');

        function loadProducts() {
            fetch(GITHUB_URL)
                .then(res => {
                    if (!res.ok) throw new Error('GitHub ответил ошибкой');
                    return res.json();
                })
                .then(data => {
                    console.log(data)
                    if (Array.isArray(data) && data.length) {
                        allProducts = data;
                        console.log("YES! I DID IT!!")
                    } else {
                        allProducts = LOCAL_PRODUCTS;
                        console.log("nevermind you suck")
                    }
                    initCatalog();
                })
                .catch(error => {
                    console.error("Error:", error)
                    allProducts = LOCAL_PRODUCTS;
                    initCatalog();
                });
            
        }

        function initCatalog() {
            const now = new Date();
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);

            const recommended = allProducts
                .filter(p => {
                    const date = new Date(p.date);
                    return date >= thirtyDaysAgo && p.rating >= 4.5 && p.reviews >= 40;
                })
                .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
                .slice(0, 12);
            const sorted = [...allProducts].sort((a, b) => new Date(b.date) - new Date(a.date));

            renderRecommended(recommended);
            currentPage = 0;
            renderCatalogPage(sorted);
            window.__catalogData = sorted;
        }
        function renderRecommended(items) {
            if (!recommendedWrapper) return;
            recommendedWrapper.innerHTML = '';
            if (!items.length) {
                recommendedWrapper.innerHTML = '<div class="swiper-slide">Нет рекомендаций</div>';
                return;
            }
            items.forEach(p => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="r-card">
                        <img src="${p.img}" alt="${p.title}" />
                        <div class="rcard-title">${p.title}</div>
                        <div class="rcard-price">${p.price} ₽</div>
                        <div style="font-size:0.85rem; color:#555; margin-top:4px;">⭐ ${p.rating} (${p.reviews} отзывов)</div>
                    </div>
                `;
                recommendedWrapper.appendChild(slide);
            });

            if (window.recommendedSwiperInstance) {
                window.recommendedSwiperInstance.destroy(true, true);
            }
            const swiper = new Swiper('.r-swiper', {
                slidesPerView: 3,
                spaceBetween: 24,
                navigation: { nextEl: '#next', prevEl: '#prev' },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 }
                }
            });
            window.recommendedSwiperInstance = swiper;
        }

        function renderCatalogPage(sortedData) {
            const start = currentPage * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            const pageItems = sortedData.slice(start, end);

            if (currentPage === 0) {
                catalogGrid.innerHTML = '';
            }

            pageItems.forEach(p => {
                const card = document.createElement('div');
                card.className = 'catalog-card';
                
                card.innerHTML = `
                    <img src="${p.img}" alt="${p.title}" onerror="this.src='images/notfound.png'" />
                    <div class="card-title">${p.title}</div>
                    <div class="card-price">${p.price} ₽</div>
                    <div class="card-meta">★ ${p.rating} • ${p.reviews} отзывов • ${new Date(p.date).toLocaleDateString()}</div>
                `;
                card.setAttribute("onclick",`openProductModal(${p.id})`)
                catalogGrid.appendChild(card);
            });

            const total = sortedData.length;
            const loaded = (currentPage + 1) * PAGE_SIZE;
            if (loaded >= total) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'Все товары загружены';
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Загрузить ещё';
            }
        }

        loadMoreBtn.addEventListener('click', function() {
            const sorted = window.__catalogData || [];
            if (!sorted.length) return;
            currentPage++;
            renderCatalogPage(sorted);
        });

        loadProducts();
        
    }
)();

function openProductModal(productId) {
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    console.log("yes product")
    const modal = document.createElement('div');
    modal.id = 'productModal';
    
    if (!product.date) return;

    modal.innerHTML = `
        <div style="background:white; padding:30px; border-radius:15px; max-width:500px; width:90%; max-height:90vh; overflow-y:auto; position:relative">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:24px; cursor:pointer">×</button>
            <img src="${product.img}" alt="${product.title}" 
                 style="width:100%; height:300px; object-fit:contain; border-radius:10px; margin-bottom:20px"
                 onerror="this.src='images/notfound.png'">
            <h2>${product.title}</h2>
            <p style="font-size:24px; font-weight:bold; margin-bottom:15px">
                ${ new Intl.NumberFormat('ru-RU', {style:'currency',currency:'RUB'}).format(product.price)}
            </p>
            <div class="rating" style="margin-bottom:20px">★ ${product.rating.toFixed(1)} / 5.0</div>
            <div style="margin-bottom:20px">
                <h4>Описание:</h4>
                <p>${product.description || "no description (yet)"}</p>
            </div>
            ${product.date ? `
                <div style="margin-bottom:20px">
                    <h4>Дата производства:</h4>
                    <ul>${product.date}</ul>
                </div>
            ` : ''}
            <button onclick="addToCart(${product.id})">
                В корзину
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(addClass, 100, "RemovableModal"); // задержка перед тем как добавить класс 
}

  function addClass(Class) {
      const modal = document.getElementById('productModal')
      if (modal) {
        modal.className = Class // выдает ему класс
      }
    }

    
document.addEventListener( 'click', (e) => {
    
    const modal = document.getElementById('productModal')

    if (modal?.classList.contains('RemovableModal')){
    if (!modal) return
    const withinBoundaries = e.composedPath().includes(modal.firstElementChild); // само окно занимает весь экран, поэтому нужно брать первого потомка (div)
	if ( ! withinBoundaries ) {
		modal.remove() // удаление Модального окна, если нажать вне его границ и если оно имеет сей класс.. 
	}
}
})

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    console.log("found item")
    const modal = document.createElement('div');
    modal.id = 'productModal';
    
    sessionStorage.setItem("toCartItems",{})
}