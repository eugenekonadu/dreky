(function ($) {
    "use strict";

    // ─── SPINNER ─────────────────────────────────────────────────
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 600);
    };
    spinner();


    // ─── WOW ANIMATIONS ──────────────────────────────────────────
    if (typeof WOW !== 'undefined') {
        new WOW({
            offset: 80,
            mobile: true,
            live: true
        }).init();
    }


    // ─── COUNTER UP ───────────────────────────────────────────────
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }


    // ─── TYPED.JS ─────────────────────────────────────────────────
    if ($('.typed-text-output').length && typeof Typed !== 'undefined') {
        var typed_strings = $('.typed-text').text();
        new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 80,
            backSpeed: 30,
            smartBackspace: false,
            loop: true
        });
    }


    // ─── SMOOTH SCROLLING ─────────────────────────────────────────
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 20
            }, 1200, 'easeInOutExpo');
        }
    });


    // ─── SKILLS PROGRESS BARS ─────────────────────────────────────
    if ($.fn.waypoint) {
        $('.skill').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, { offset: '80%' });
    }


    // ─── PORTFOLIO ISOTOPE ────────────────────────────────────────
    if ($('.portfolio-container').length && typeof Isotope !== 'undefined') {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.5s'
        });
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    }


    // ─── TESTIMONIALS CAROUSEL ────────────────────────────────────
    if ($(".testimonial-carousel").length && $.fn.owlCarousel) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            items: 1
        });
    }


    // ─── BACK TO TOP ──────────────────────────────────────────────
    $(window).scroll(function () {
        if ($(this).scrollTop() > 120) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1200, 'easeInOutExpo');
        return false;
    });


    // ─── CONTACT FORM ─────────────────────────────────────────────
    var sendBtn = document.getElementById("send-message-btn");
    if (sendBtn) {
        sendBtn.addEventListener("click", function () {
            var name    = (document.getElementById("name")    || {}).value || '';
            var email   = (document.getElementById("email")   || {}).value || '';
            var subject = (document.getElementById("subject") || {}).value || '';
            var message = (document.getElementById("message") || {}).value || '';

            if (name && email && subject && message) {
                var mailtoLink = 'mailto:eugenekonadu58@gmail.com?subject=' +
                    encodeURIComponent(subject) +
                    '&body=' +
                    encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage: " + message);
                window.location.href = mailtoLink;
                sendBtn.textContent = 'Message Sent ✓';
                sendBtn.style.background = 'linear-gradient(135deg,#3fd6c8,#1a8f86)';
                setTimeout(function () {
                    sendBtn.textContent = 'Send Message';
                    sendBtn.style.background = '';
                }, 3500);
            } else {
                // Shake animation on error
                sendBtn.style.animation = 'shake 0.4s ease';
                setTimeout(function () { sendBtn.style.animation = ''; }, 500);
                alert("Please fill out all fields.");
            }
        });
    }

    // Subscribe
    var subBtn = document.getElementById("subscribe-btn");
    if (subBtn) {
        subBtn.addEventListener("click", function () {
            var emailVal = (document.getElementById("email-input") || {}).value || '';
            if (emailVal) {
                window.location.href = 'mailto:eugenekonadu58@gmail.com?subject=Newsletter%20Subscription&body=Please%20subscribe%20me%20to%20your%20newsletter.%20My%20email%20is%20' + encodeURIComponent(emailVal);
            } else {
                alert("Please enter a valid email address.");
            }
        });
    }


    // ─── SCROLL REVEAL ────────────────────────────────────────────
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                var children = entry.target.querySelectorAll(
                    '.service-item, .research-card, .exp-item, .stat-box, .portfolio-item, .d-flex.bg-secondary'
                );
                children.forEach(function (child, i) {
                    setTimeout(function () {
                        child.classList.add('visible');
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 80);
                });
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });


    // ─── SIDEBAR ACTIVE NAV ───────────────────────────────────────
    var sections  = document.querySelectorAll('section[id]');
    var navLinks  = document.querySelectorAll('.sidebar-nav a');

    if (navLinks.length && sections.length) {
        window.addEventListener('scroll', function () {
            var scrollY = window.scrollY;
            sections.forEach(function (sec) {
                var sTop = sec.offsetTop - 120;
                var sBot = sTop + sec.offsetHeight;
                if (scrollY >= sTop && scrollY < sBot) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    var active = document.querySelector('.sidebar-nav a[href="#' + sec.id + '"]');
                    if (active) active.classList.add('active');
                }
            });
        });
    }


    // ─── SHAKE KEYFRAME ───────────────────────────────────────────
    var shakeStyle = document.createElement('style');
    shakeStyle.textContent =
        '@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}';
    document.head.appendChild(shakeStyle);


    // ─── CARD TILT (SUBTLE) ───────────────────────────────────────
    document.querySelectorAll('.service-item, .research-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width  - 0.5;
            var y = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = 'translateY(-6px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

})(jQuery);
