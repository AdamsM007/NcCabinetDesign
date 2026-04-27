// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.lg\\:hidden button');
  const mobileMenu = document.querySelector('.hidden.lg\\:flex');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const nav = mobileMenuBtn.closest('nav');
      let menu = nav.querySelector('.mobile-menu');
      
      if (!menu) {
        menu = document.createElement('div');
        menu.className = 'mobile-menu lg:hidden';
        menu.innerHTML = `
          <div class="px-6 py-4 space-y-3 bg-white border-t">
            <a class="block text-sm font-medium text-[#1a1a1a] hover:text-[#8b7355]" href="index.html">Home</a>
            <a class="block text-sm font-medium text-[#1a1a1a] hover:text-[#8b7355]" href="gallery.html">Gallery</a>
            <a class="block text-sm font-medium text-[#1a1a1a] hover:text-[#8b7355]" href="quote.html">Get a Quote</a>
            <a class="block text-sm font-medium text-[#1a1a1a] hover:text-[#8b7355]" href="contact.html">Contact</a>
            <a href="quote.html" class="block">
              <button class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-[#8b7355] hover:bg-[#6d5a44] text-white h-9 px-4 py-2">Free Estimate</button>
            </a>
          </div>
        `;
        nav.appendChild(menu);
      }
      
      menu.style.display = menu.style.display === 'none' || !menu.style.display ? 'block' : 'none';
    });
  }
  // Make all hidden elements visible with animation
  const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
  
  hiddenElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
      el.style.transition = 'all 0.6s ease-out';
    }, index * 100);
  });

  // Testimonial carousel
  const testimonials = document.querySelectorAll('.bg-white.rounded-2xl.p-8');
  const dots = document.querySelectorAll('.flex.items-center.gap-2 > button');
  const prevBtn = document.querySelector('.lucide-chevron-left')?.parentElement;
  const nextBtn = document.querySelector('.lucide-chevron-right')?.parentElement;
  let current = 0;

  if (testimonials.length > 0 && prevBtn && nextBtn) {
    function showTestimonial(index, direction = 'next') {
      const outgoing = testimonials[current];
      const incoming = testimonials[index];
      
      outgoing.style.transition = 'opacity 0.5s, transform 0.5s';
      outgoing.style.opacity = '0';
      outgoing.style.transform = direction === 'next' ? 'translateX(-50px)' : 'translateX(50px)';
      
      setTimeout(() => {
        outgoing.style.display = 'none';
        incoming.style.display = 'block';
        incoming.style.opacity = '0';
        incoming.style.transform = direction === 'next' ? 'translateX(50px)' : 'translateX(-50px)';
        
        setTimeout(() => {
          incoming.style.transition = 'opacity 0.5s, transform 0.5s';
          incoming.style.opacity = '1';
          incoming.style.transform = 'translateX(0)';
        }, 50);
      }, 500);
      
      dots.forEach((d, i) => {
        d.className = i === index ? 'w-2 h-2 rounded-full transition-all bg-[#8b7355] w-6' : 'w-2 h-2 rounded-full transition-all bg-[#1a1a1a]/20';
      });
      
      current = index;
    }

    nextBtn.addEventListener('click', () => {
      const next = (current + 1) % testimonials.length;
      showTestimonial(next, 'next');
    });

    prevBtn.addEventListener('click', () => {
      const prev = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(prev, 'prev');
    });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (i !== current) showTestimonial(i, i > current ? 'next' : 'prev');
      });
    });

    testimonials.forEach((t, i) => {
      t.style.display = i === 0 ? 'block' : 'none';
      t.style.opacity = i === 0 ? '1' : '0';
    });
  }

  // Lightbox
  let lightboxImages = [];
  let lightboxIndex = 0;

  window.openLightbox = function(img) {
    lightboxImages = Array.from(document.querySelectorAll('.gallery-item:not([style*="none"]) img'));
    lightboxIndex = lightboxImages.indexOf(img);
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
  };

  window.changeLightboxImage = function(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    document.getElementById('lightbox-img').src = lightboxImages[lightboxIndex].src;
    event.stopPropagation();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') changeLightboxImage(1);
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
  });
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function filterGallery(category) {
    galleryTabs.forEach(t => t.classList.remove('active', 'shadow', 'bg-[#1a1a1a]', 'text-white'));
    const activeTab = document.querySelector(`.gallery-tab[data-category="${category}"]`);
    if (activeTab) activeTab.classList.add('active', 'shadow', 'bg-[#1a1a1a]', 'text-white');
    galleryItems.forEach(item => {
      item.style.display = (category === 'all' || item.dataset.category === category) ? '' : 'none';
    });
  }

  const params = new URLSearchParams(window.location.search);
  const initCategory = params.get('category') || 'all';
  filterGallery(initCategory);

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => filterGallery(tab.dataset.category));
  });
});

