// Animate progress bars when they come into view
document.addEventListener('DOMContentLoaded', function() {
  // Font Awesome CDN - add to head if not already present
  if (!document.getElementById('font-awesome')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.id = 'font-awesome';
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
  
  // Trigger animation when element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Make skill badges clickable for mobile users
  const skillBadges = document.querySelectorAll('.skill-badge');
  skillBadges.forEach(badge => {
    badge.addEventListener('click', function() {
      // For mobile devices, toggle a class instead of using hover
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // First, remove active class from all badges
        skillBadges.forEach(b => b.classList.remove('badge-active'));
        // Then add it to the clicked badge
        this.classList.toggle('badge-active');
      }
    });
  });
});

// Function to animate progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.skill-progress');
  progressBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress') + '%';
    bar.style.width = '0%';
    
    // Slight delay before animation starts
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease-in-out';
      bar.style.width = progress;
    }, 200);
  });
}

// Add subtle cyber animations to skill groups
document.addEventListener('mousemove', function(e) {
  const skillGroups = document.querySelectorAll('.skill-group');
  skillGroups.forEach(group => {
    const rect = group.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX * 5;
      const deltaY = (y - centerY) / centerY * 5;
      
      group.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateY(-10px)`;
    } else {
      group.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    }
  });
});

// Check if globe map is loading correctly and switch to fallback if needed
document.addEventListener('DOMContentLoaded', function() {
  const globe = document.querySelector('.globe');
  
  // Test if the SVG world map loads correctly
  setTimeout(() => {
    // Get computed style to check if background image is applied
    const globeStyle = getComputedStyle(globe);
    const bgImage = globeStyle.backgroundImage;
    
    // If background is empty or there's an error, switch to alternative map
    const img = new Image();
    img.onerror = function() {
      document.querySelector('.globe-container').classList.add('use-alternative-map');
    };
    
    // Extract URL from the CSS background-image value
    const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (urlMatch && urlMatch[1]) {
      img.src = urlMatch[1];
    } else {
      // Fallback if cannot extract URL
      document.querySelector('.globe-container').classList.add('use-alternative-map');
    }
  }, 1000);

  // Make sure globe is not rotating
  const globeSpinner = document.querySelector('.globe-spinner');
  if (globeSpinner) {
    globeSpinner.style.animation = 'none';
    globeSpinner.style.transform = 'none';
  }

  // Make globe interactive with mouse
  const globeContainer = document.querySelector('.globe-container');
  let isSpinning = true;
  
  globeContainer.addEventListener('mouseenter', function() {
    if (isSpinning) {
      globeSpinner.style.animationPlayState = 'paused';
    }
  });
  
  globeContainer.addEventListener('mouseleave', function() {
    if (isSpinning) {
      globeSpinner.style.animationPlayState = 'running';
    }
  });
  
  // Optional: Make globe interactive with touch/drag
  let isDragging = false;
  let previousX = 0;
  
  globeContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    previousX = e.clientX;
    isSpinning = false;
    globeSpinner.style.animation = 'none';
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
    isSpinning = true;
    globeSpinner.style.animation = 'spin 20s linear infinite';
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const deltaX = e.clientX - previousX;
      const currentRotation = getComputedStyle(globeSpinner).transform;
      
      // Apply manual rotation based on mouse movement
      globeSpinner.style.transform = `rotateY(${deltaX * 0.5}deg)`;
      previousX = e.clientX;
    }
  });
});

// Europe Globe Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
  const europeGlobe = document.querySelector('.europe-globe');
  if (europeGlobe) {
    // Add 3D tilt effect based on mouse position
    document.addEventListener('mousemove', function(e) {
      if (!europeGlobe) return;
      
      const rect = europeGlobe.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distX = (e.clientX - centerX) / (window.innerWidth / 2);
      const distY = (e.clientY - centerY) / (window.innerHeight / 2);
      
      // Only apply effect when mouse is somewhat near the globe
      if (Math.abs(distX) < 0.5 && Math.abs(distY) < 0.5) {
        europeGlobe.style.transform = `rotateY(${distX * 10}deg) rotateX(${-distY * 10}deg)`;
      } else {
        europeGlobe.style.transform = 'rotateY(0) rotateX(0)';
      }
    });
  }
});
