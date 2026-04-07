// This array will be empty until you start adding books
const books = [];

const grid = document.getElementById('booksGrid');

function renderBooks() {
    if (books.length === 0) {
        grid.innerHTML = `<p style="opacity:0.3; grid-column: 1/-1; text-align:center; padding: 50px;">এখনো কোনো বই যুক্ত করা হয়নি।</p>`;
        return;
    }

    grid.innerHTML = '';
    books.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-img-container">
                <img src="${book.image}" alt="${book.title}">
                <div class="book-desc-overlay">
                    <p class="desc-text">${book.description}</p>
                    <p class="click-again">আরও জানতে আবার ক্লিক করুন ↗</p>
                </div>
            </div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
            </div>
        `;

        // Logic: Tap once for desc, tap twice for link
        card.addEventListener('click', function(e) {
            if (!this.classList.contains('is-active')) {
                // First click: Show description
                this.classList.add('is-active');
            } else {
                // Second click: Open link
                window.open(book.url, '_blank');
            }
        });

        grid.appendChild(card);
    });
}

// Simple Tab Switcher
function go(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('[data-tab]').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll(`[data-tab="${id}"]`).forEach(el => el.classList.add('active'));
    window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('[data-tab]').forEach(el => 
    el.addEventListener('click', (e) => go(el.dataset.tab))
);

// Initial Load
renderBooks();
