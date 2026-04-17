// Songdo SDA Church - Premium Scripts

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Navbar Scroll Effect
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // 2. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 4. Tab Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const videoCards = document.querySelectorAll('.video-card');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                videoCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. Video Modal Logic
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeModal = document.querySelector(".close-modal");

    // Global function for HTML onclick
    window.openVideoModal = (videoUrl) => {
        if (videoFrame && modal) {
            videoFrame.src = videoUrl + "?autoplay=1";
            modal.style.display = "flex";
        }
    };

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
            videoFrame.src = "";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            videoFrame.src = "";
        }
    });

    // 6. Online Offering Actions

    window.copyAccount = () => {
        const accountNum = "100-030-416442";
        navigator.clipboard.writeText(accountNum).then(() => {
            const copyBtn = document.getElementById('copyBtn');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '복사 완료! <i data-lucide="check" style="margin-left: 8px; width: 18px;"></i>';
            lucide.createIcons();
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        });
    };

    window.openToss = () => {
        const bank = "신한";
        const account = "100030416442";
        const tossUrl = `supertoss://send?bank=${bank}&account=${account}`;
        
        // Try to open Toss
        window.location.href = tossUrl;
        
        // Fallback for browsers that don't support deep links well
        setTimeout(() => {
            if (document.hasFocus()) {
                alert("토스 앱이 설치되어 있지 않거나 연결할 수 없습니다. 계좌번호를 복사하여 사용해 주세요.");
            }
        }, 500);
    };
});
