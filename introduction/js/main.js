document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    let lastScroll = 0;
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav-links');
    let isNavVisible = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.style.transform = 'translateY(-100%)';
            header.classList.add('scroll-down');
            // 隐藏移动端导航菜单
            if (isNavVisible) {
                nav.classList.remove('active');
                isNavVisible = false;
            }
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.style.transform = 'translateY(0)';
            header.classList.remove('scroll-down');
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // 移动端导航菜单切换
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = `
        <svg viewBox="0 0 100 100" width="30" height="30">
            <rect y="25" width="100" height="5" rx="2.5"></rect>
            <rect y="45" width="100" height="5" rx="2.5"></rect>
            <rect y="65" width="100" height="5" rx="2.5"></rect>
        </svg>
    `;

    // 只在移动端显示导航切换按钮
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-container').appendChild(navToggle);
    }

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        isNavVisible = !isNavVisible;
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                isNavVisible = false;
            }
        });
    });

    // 添加页面加载动画
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // 获取按钮元素
    const backToTopButton = document.getElementById('backToTop');
    const themeToggleButton = document.getElementById('themeToggle');

    // 返回顶部功能
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 主题切换功能
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // 更新主题
        html.setAttribute('data-theme', newTheme);
        
        // 更新图标
        const icon = themeToggleButton.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // 保存主题设置
        localStorage.setItem('theme', newTheme);
    }

    // 添加主题切换按钮点击事件
    themeToggleButton.addEventListener('click', toggleTheme);

    // 初始化主题
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // 设置初始图标
    const icon = themeToggleButton.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

function showCertificate(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImage');
    modal.style.display = 'flex';
    modalImg.src = imageSrc;

    // 点击关闭按钮关闭弹窗
    document.querySelector('.close-modal').onclick = function() {
        modal.style.display = 'none';
    }

    // 点击弹窗外部关闭弹窗
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// 添加技能等级条动画
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.level-bar').style.width = 
                    entry.target.querySelector('.level-bar').getAttribute('style').split(':')[1];
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // 表单验证
            if (formData.name.length < 2) {
                showError('name', '姓名至少需要2个字符');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showError('email', '请输入有效的邮箱地址');
                return;
            }

            if (formData.subject.length < 5) {
                showError('subject', '主题至少需要5个字符');
                return;
            }

            if (formData.message.length < 10) {
                showError('message', '消息内容至少需要10个字符');
                return;
            }

            // 模拟表单提交
            alert('消息已发送！');
            contactForm.reset();
        });

        // 添加输入事件监听，清除错误提示
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.addEventListener('input', function() {
                clearError(this.id);
            });
        });
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    clearError(inputId);
    input.classList.add('error');
    input.parentNode.appendChild(errorDiv);
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.classList.remove('error');
}

// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');

// 创建轮播点
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

// 自动轮播
let slideInterval = setInterval(() => moveSlide(1), 5000);

// 鼠标悬停时暂停自动轮播
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveSlide(1), 5000);
}); 