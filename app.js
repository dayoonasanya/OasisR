var images = [
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4-1240x578.jpg',
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-1240x578.jpg',
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-6-1240x578.jpg',
];
var currentImageIndex = 0;
var heroImage = document.querySelector('.hero img');

document.querySelector('.hero-nav-left').addEventListener('click', function() {
    heroImage.style.opacity = '0';
    setTimeout(function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = '1';
    }, 500);
});

document.querySelector('.hero-nav-right').addEventListener('click', function() {
    heroImage.style.opacity = '0';
    setTimeout(function() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = '1';
    }, 500);
});

$('a').on('click', function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
    }
});