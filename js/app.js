// Array of image URLs for the hero image slider
var images = [
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4-1240x578.jpg',
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-1240x578.jpg',
    'https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-6-1240x578.jpg',
];

// Variable to keep track of the current image index
var currentImageIndex = 0;

// Get the hero image element
var heroImage = document.querySelector('.hero img');

// Event listener for left navigation button click
document.querySelector('.hero-nav-left').addEventListener('click', function() {
    // Fade out the current image
    heroImage.style.opacity = '0';
    setTimeout(function() {
        // Decrement the current image index
        currentImageIndex--;
        // If the index goes below 0, wrap around to the last image
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        // Update the hero image source and fade it in
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = '1';
    }, 500); // Delay to allow fade-out effect
});

// Event listener for right navigation button click
document.querySelector('.hero-nav-right').addEventListener('click', function() {
    // Fade out the current image
    heroImage.style.opacity = '0';
    setTimeout(function() {
        // Increment the current image index
        currentImageIndex++;
        // If the index exceeds the length, wrap around to the first image
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        // Update the hero image source and fade it in
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = '1';
    }, 500); // Delay to allow fade-out effect
});

// jQuery code to enable smooth scrolling for anchor links
$('a').on('click', function(event) {
    // Check if the anchor link has a hash value (i.e., a fragment identifier)
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store the hash
        var hash = this.hash;
        // Use jQuery animate to add smooth page scroll
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    }
});
