// js/main.js
// Script principal de interação da loja GameParts.

// Contador global de itens adicionados ao carrinho.
let cartItemsCount = 0;

/**
 * Exibe uma mensagem toast no canto da tela.
 * @param {string} message Mensagem exibida ao usuário.
 */
function showToast(message) {
    const toast = document.getElementById('cart-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.visibility = 'hidden';
    }, 2500);
}

/**
 * Adiciona um produto ao carrinho e atualiza o contador.
 * @param {string} productName Nome do produto que foi adicionado.
 */
function addToCart(productName) {
    cartItemsCount += 1;
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartItemsCount;
    }
    showToast(`"${productName}" adicionado ao carrinho! 🚀`);
}

/**
 * Processa a busca de produtos pelo usuário.
 * @param {Event} event Evento de submit do formulário de busca.
 */
function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('buscar').value.trim();
    if (query) {
        showToast(`Buscando por: ${query}...`);
    }
}

/**
 * Processa o envio do formulário de inscrição na newsletter.
 * @param {Event} event Evento de submit do formulário.
 */
function handleNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('news-email').value.trim();
    if (!email) {
        showToast('Por favor, informe um e-mail válido.');
        return;
    }
    showToast(`Sucesso! ${email} cadastrado na lista VIP.`);
    event.target.reset();
}

/**
 * Processa o envio do formulário de contato.
 * @param {Event} event Evento de submit do formulário.
 */
function handleContact(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    if (!nome) {
        showToast('Por favor, informe seu nome.');
        return;
    }
    showToast(`Obrigado, ${nome}! Seu ticket foi enviado com sucesso.`);
    event.target.reset();
}

/**
 * Aciona a filtragem de produtos sem recarregar a página.
 * @param {Event} event Evento de clique ou submit.
 */
function applyFilters(event) {
    event.preventDefault();
    filterAndSortProducts();
}

/**
 * Filtra e ordena produtos na página com base nas seleções do usuário.
 */
function filterAndSortProducts() {
    const categorySelect = document.querySelector('select[name="categoria"]');
    const priceSelect = document.querySelector('select[name="preco"]');
    const sortSelect = document.querySelector('select[name="ordenar"]');
    const productSection = document.getElementById('produtos');
    if (!categorySelect || !priceSelect || !sortSelect || !productSection) return;

    const selectedCategory = categorySelect.value;
    const selectedPrice = priceSelect.value;
    const selectedSort = sortSelect.value;
    const products = Array.from(document.querySelectorAll('.produto'));

    products.forEach(product => {
        const category = product.dataset.category;
        const price = parseFloat(product.dataset.price);
        let visible = true;

        if (selectedCategory && category !== selectedCategory) visible = false;
        if (selectedPrice === '0-500' && price > 500) visible = false;
        if (selectedPrice === '500-2000' && (price < 500 || price > 2000)) visible = false;
        if (selectedPrice === '2000+' && price < 2000) visible = false;

        product.style.display = visible ? 'block' : 'none';
    });

    const visibleProducts = products.filter(product => product.style.display !== 'none');

    if (selectedSort === 'preco-asc') {
        visibleProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (selectedSort === 'preco-desc') {
        visibleProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    }

    visibleProducts.forEach(product => productSection.appendChild(product));
}

// Inicializa eventos quando o conteúdo do DOM estiver pronto.
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.querySelector('select[name="categoria"]');
    const priceSelect = document.querySelector('select[name="preco"]');
    const sortSelect = document.querySelector('select[name="ordenar"]');

    if (categorySelect) categorySelect.addEventListener('change', filterAndSortProducts);
    if (priceSelect) priceSelect.addEventListener('change', filterAndSortProducts);
    if (sortSelect) sortSelect.addEventListener('change', filterAndSortProducts);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});