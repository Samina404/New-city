$(document).ready(function() {
    "use strict";

    // Smooth Scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Product Card Hover Effect (jQuery alternative/enhancement)
    $('.product-card').hover(
        function() {
            $(this).find('.product-img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.product-img').css('transform', 'scale(1)');
        }
    );

    // Dynamic Navigation Active State
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop();
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.length && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos + 100) {
                $('.nav-link').removeClass("active");
                currLink.addClass("active");
            }
        });
    });

    // Simple Newsletter Validation
    $('.btn-secondary').on('click', function() {
        var email = $(this).siblings('input').val();
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            $(this).siblings('input').val('');
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Professional Search Implementation
    const injectSearch = () => {
        if ($('#nav-search-wrapper').length) return;
        
        const searchHtml = `
            <div id="nav-search-wrapper" style="position: absolute; top: 100%; background: white; padding: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-radius: 4px; display: none; z-index: 1000; border-top: 1px solid var(--secondary-color);">
                <form id="nav-search-form" class="d-flex gap-2">
                    <input type="text" id="nav-search-input" class="form-control" placeholder="Search collection..." style="font-size: 14px; border: 1px solid #f0f0f0; border-radius: 4px; box-shadow: none; outline: none;">
                    <button type="submit" class="btn" style="background: var(--secondary-color); color: var(--primary-color); border: none; padding: 0 15px; font-weight: 600;"><i class="bi bi-search"></i></button>
                </form>
            </div>
            <style>
                #nav-search-input:focus {
                    border-color: var(--secondary-color) !important;
                    box-shadow: none !important;
                }
            </style>
        `;
        $('.nav-icons-group').css('position', 'relative').append(searchHtml);
    };

    injectSearch();

    $('#search-trigger').on('click', function(e) {
        e.preventDefault();
        $('#nav-search-wrapper').fadeToggle(300);
        $('#nav-search-input').focus();
    });

    $(document).on('submit', '#nav-search-form', function(e) {
        e.preventDefault();
        const query = $('#nav-search-input').val().trim();
        if (query) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Close on click outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-icons-group').length) {
            $('#nav-search-wrapper').fadeOut(300);
        }
    });
});
