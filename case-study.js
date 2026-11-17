document.querySelectorAll('.case-gallery').forEach((gallery) => {
  const images = [...gallery.querySelectorAll('img')];
  images.forEach((image, imageIndex) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open image ${imageIndex + 1} of ${images.length}: ${image.alt}`);
    const open = () => {
      let activeIndex = imageIndex;
      let touchStartX = 0;
      const dialog = document.createElement('dialog');
      dialog.className = 'case-image-dialog';
      dialog.innerHTML = `<button type="button" class="case-image-close" aria-label="Close image">×</button><button type="button" class="case-image-previous" aria-label="Previous screenshot">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="case-image-next" aria-label="Next screenshot">›</button><p class="case-image-count" aria-live="polite"></p>`;
      document.body.append(dialog);
      const dialogImage = dialog.querySelector('img');
      const caption = dialog.querySelector('figcaption');
      const count = dialog.querySelector('.case-image-count');
      const show = (nextIndex) => {
        activeIndex = (nextIndex + images.length) % images.length;
        const activeImage = images[activeIndex];
        dialogImage.src = activeImage.currentSrc || activeImage.src;
        dialogImage.alt = activeImage.alt;
        caption.textContent = activeImage.alt;
        count.textContent = `${activeIndex + 1} / ${images.length}`;
      };
      const move = (direction) => show(activeIndex + direction);
      dialog.querySelector('.case-image-close').addEventListener('click', () => dialog.close());
      dialog.querySelector('.case-image-previous').addEventListener('click', () => move(-1));
      dialog.querySelector('.case-image-next').addEventListener('click', () => move(1));
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      });
      dialog.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
      dialog.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
      }, { passive: true });
      dialog.addEventListener('close', () => dialog.remove());
      show(activeIndex);
      dialog.showModal();
    };
    image.addEventListener('click', open);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
});
