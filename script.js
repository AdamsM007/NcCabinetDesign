// Simple animation on scroll
document.addEventListener('DOMContentLoaded', function() {
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

  // Gallery filter tabs
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => {
        t.classList.remove('active', 'shadow', 'bg-[#1a1a1a]', 'text-white');
      });
      tab.classList.add('active', 'shadow', 'bg-[#1a1a1a]', 'text-white');
    });
  });
});

