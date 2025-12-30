  document.querySelectorAll('.toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const links = this.nextElementSibling;
      links.classList.toggle('hidden');
      const arrow = this.querySelector('.arrow');
      arrow.style.transform = links.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
