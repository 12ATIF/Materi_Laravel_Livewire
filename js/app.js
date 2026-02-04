// ==========================================
// Laravel Livewire SMK - Educational Website
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initCodeBlocks();
    initDemoCounter();
    initDemoForm();
    initDemoSearch();
    initSmoothScroll();
    initActiveNav();
});

// ==========================================
// Navbar Mobile Toggle
// ==========================================
function initNavbar() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const icon = toggle.querySelector('span');
            if (icon) {
                icon.textContent = menu.classList.contains('active') ? '✕' : '☰';
            }
        });
    }
}

// ==========================================
// Code Block Copy Functionality
// ==========================================
function initCodeBlocks() {
    const copyButtons = document.querySelectorAll('.code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('pre').textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = '✓ Disalin!';
                this.style.background = 'var(--primary)';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin:', err);
                this.textContent = '✕ Gagal';
                setTimeout(() => {
                    this.textContent = 'Salin';
                }, 2000);
            });
        });
    });
}

// ==========================================
// Demo Counter (Simulating Livewire)
// ==========================================
function initDemoCounter() {
    const counter = document.querySelector('.demo-counter');
    if (!counter) return;
    
    const valueEl = counter.querySelector('.demo-counter-value');
    const minusBtn = counter.querySelector('.demo-counter-btn.minus');
    const plusBtn = counter.querySelector('.demo-counter-btn.plus');
    
    if (!valueEl || !minusBtn || !plusBtn) return;
    
    let count = 0;
    
    function updateCounter() {
        // Simulate loading
        valueEl.classList.add('loading');
        
        setTimeout(() => {
            valueEl.textContent = count;
            valueEl.classList.remove('loading');
        }, 150);
    }
    
    minusBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => this.style.transform = '', 150);
    });
    
    plusBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => this.style.transform = '', 150);
    });
}

// ==========================================
// Demo Form Validation (Simulating wire:model)
// ==========================================
function initDemoForm() {
    const form = document.querySelector('.demo-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-input');
    
    const validators = {
        name: {
            validate: (value) => value.length >= 3,
            error: 'Nama minimal 3 karakter',
            success: 'Nama valid ✓'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            error: 'Format email tidak valid',
            success: 'Email valid ✓'
        },
        password: {
            validate: (value) => value.length >= 6,
            error: 'Password minimal 6 karakter',
            success: 'Password kuat ✓'
        }
    };
    
    inputs.forEach(input => {
        const fieldName = input.dataset.field || input.name;
        const validator = validators[fieldName];
        if (!validator) return;
        
        // Create feedback element
        let feedback = input.parentElement.querySelector('.form-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback';
            input.parentElement.appendChild(feedback);
        }
        
        input.addEventListener('input', function() {
            // Simulate network delay (like Livewire debounce)
            clearTimeout(this.validationTimeout);
            
            this.validationTimeout = setTimeout(() => {
                const isValid = validator.validate(this.value);
                
                this.classList.remove('error', 'success');
                feedback.classList.remove('form-error', 'form-success');
                
                if (this.value === '') {
                    feedback.textContent = '';
                    return;
                }
                
                if (isValid) {
                    this.classList.add('success');
                    feedback.classList.add('form-success');
                    feedback.textContent = validator.success;
                } else {
                    this.classList.add('error');
                    feedback.classList.add('form-error');
                    feedback.textContent = validator.error;
                }
            }, 300);
        });
    });
}

// ==========================================
// Demo Live Search (Simulating Livewire Search)
// ==========================================
function initDemoSearch() {
    const searchContainer = document.querySelector('.demo-search');
    if (!searchContainer) return;
    
    const input = searchContainer.querySelector('.search-input');
    const results = searchContainer.querySelector('.search-results');
    
    if (!input || !results) return;
    
    // Sample data
    const books = [
        { title: 'Laravel: Up & Running', author: 'Matt Stauffer' },
        { title: 'Livewire: The Definitive Guide', author: 'Caleb Porzio' },
        { title: 'PHP 8 Objects, Patterns', author: 'Matt Zandstra' },
        { title: 'Clean Code', author: 'Robert C. Martin' },
        { title: 'Design Patterns', author: 'Gang of Four' },
        { title: 'The Pragmatic Programmer', author: 'David Thomas' },
        { title: 'Refactoring', author: 'Martin Fowler' },
        { title: 'Domain-Driven Design', author: 'Eric Evans' }
    ];
    
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        // Simulate loading
        results.innerHTML = '<div class="search-loading">🔍 Mencari...</div>';
        
        setTimeout(() => {
            if (query === '') {
                results.innerHTML = '<div class="search-hint">Ketik untuk mencari buku...</div>';
                return;
            }
            
            const filtered = books.filter(book => 
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
            
            if (filtered.length === 0) {
                results.innerHTML = '<div class="search-empty">Tidak ada hasil untuk "' + query + '"</div>';
                return;
            }
            
            results.innerHTML = filtered.map(book => `
                <div class="search-item">
                    <span class="search-icon">📚</span>
                    <div>
                        <div class="search-title">${highlightMatch(book.title, query)}</div>
                        <div class="search-author">${highlightMatch(book.author, query)}</div>
                    </div>
                </div>
            `).join('');
        }, 200);
    });
    
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
function initSmoothScroll() {
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
}

// ==========================================
// Active Navigation State
// ==========================================
function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-menu a, .sidebar-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== 'index.html' && href !== '/') {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && 
                   (href === 'index.html' || href === '/')) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// Progress Tracking (Local Storage)
// ==========================================
const ProgressTracker = {
    STORAGE_KEY: 'livewire_smk_progress',
    
    getProgress: function() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : { completed: [], lastVisited: null };
    },
    
    markCompleted: function(materiId) {
        const progress = this.getProgress();
        if (!progress.completed.includes(materiId)) {
            progress.completed.push(materiId);
        }
        progress.lastVisited = materiId;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
        this.updateUI();
    },
    
    isCompleted: function(materiId) {
        return this.getProgress().completed.includes(materiId);
    },
    
    getPercentage: function() {
        const total = 16; // Total materi
        const completed = this.getProgress().completed.length;
        return Math.round((completed / total) * 100);
    },
    
    updateUI: function() {
        // Update sidebar checkmarks
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            const materiId = link.dataset.materiId;
            if (materiId && this.isCompleted(materiId)) {
                link.classList.add('completed');
            }
        });
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = this.getPercentage() + '%';
        }
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = this.getPercentage() + '% selesai';
        }
    },
    
    reset: function() {
        localStorage.removeItem(this.STORAGE_KEY);
        location.reload();
    }
};

// Initialize progress tracking on page load
document.addEventListener('DOMContentLoaded', function() {
    ProgressTracker.updateUI();
});

// ==========================================
// Utility Functions
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
}
