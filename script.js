// 购物车功能
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    showNotification(`"${productName}" 已添加到购物车`);
    console.log(`已添加商品: ${productName}, 价格: ¥${price}`);
}

function showNotification(message) {
    const notification = document.getElementById('cart-notification');
    notification.querySelector('span').textContent = '✓ ' + message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 商品分类筛选功能
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // 更新按钮状态
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === getCategoryName(category)) {
            btn.classList.add('active');
        }
    });
    
    // 显示/隐藏商品
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.classList.remove('hidden');
            product.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            product.classList.add('hidden');
        }
    });
}

function getCategoryName(category) {
    const names = {
        'all': '全部',
        'sofa': '沙发',
        'bed': '床具',
        'table': '餐桌',
        'chair': '椅子',
        'cabinet': '柜子'
    };
    return names[category] || '全部';
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // 移动端关闭菜单
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// 滚动动画 - 元素进入视口时显示
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有卡片元素
document.querySelectorAll('.info-card, .product-card, .about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('珠杭家私商行网站已加载完成');
    console.log('店主: 王卫丽');
    console.log('地址: 北京市朝阳区建国路88号SOHO现代城A座1层');
    console.log('电话: 15381139216');
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 搜索功能（可扩展）
function searchProducts(keyword) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('h3').textContent;
        const desc = product.querySelector('.product-desc').textContent;
        
        if (title.includes(keyword) || desc.includes(keyword)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

// 价格排序功能（可扩展）
function sortProducts(order) {
    const grid = document.querySelector('.product-grid');
    const products = Array.from(grid.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.price-current').textContent.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.querySelector('.price-current').textContent.replace(/[^0-9]/g, ''));
        
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    
    products.forEach(product => grid.appendChild(product));
}

// 联系表单处理（如果添加表单功能）
function handleContactForm(event) {
    event.preventDefault();
    showNotification('消息已发送，我们会尽快回复您！');
}

// 图片懒加载
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}


// 图片放大查看功能
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// 为详情页大图添加点击放大
document.querySelectorAll('.detail-image').forEach(imageContainer => {
    imageContainer.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img && img.src) {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
    });
});

// 关闭灯箱
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// 点击背景关闭
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
