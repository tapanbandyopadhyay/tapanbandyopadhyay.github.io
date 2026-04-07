// Empty database for now
const books = [];

function renderBooks() {
    const grid = document.getElementById('booksGrid');
    if (books.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; opacity:0.5; padding: 100px 0;">কোনো বই খুঁজে পাওয়া যায়নি।</p>`;
        return;
    }

    grid.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div style="position:relative; overflow:hidden;">
                <img src="${book.image}" class="book-img">
                <div class="book-desc-overlay">
                    <p style="font-size:0.9rem; color:var(--gold2);">${book.description}</p>
                    <p style="font-size:0.7rem; margin-top:15px; border-top:1px solid rgba(200,168,75,0.2); padding-top:10px;">সংগ্রহ করতে আবার ক্লিক করুন ↗</p>
                </div>
            </div>
            <div style="padding:15px; text-align:center;">
                <h3 style="font-family:'Noto Serif Bengali', serif; font-size:1rem;">${book.title}</h3>
            </div>
        `;

        card.addEventListener('click', function() {
            if (!this.classList.contains('is-active')) {
                document.querySelectorAll('.book-card').forEach(c => c.classList.remove('is-active'));
                this.classList.add('is-active');
            } else {
                window.open(book.url, '_blank');
            }
        });
        grid.appendChild(card);
    });
}

function switchTab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active', 'here'));
    
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    
    document.querySelectorAll(`[data-tab="${id}"]`).forEach(t => {
        t.classList.add(t.classList.contains('chapter') ? 'here' : 'active');
    });
    window.scrollTo(0,0);
}

document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// Load the empty grid on start
renderBooks();
