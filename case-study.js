document.querySelectorAll('.case-gallery img').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `Open larger image: ${image.alt}`);
  const open = () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'case-image-dialog';
    dialog.innerHTML = `<button type="button" aria-label="Close image">×</button><img src="${image.currentSrc || image.src}" alt="${image.alt}"><p>${image.alt}</p>`;
    document.body.append(dialog);
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => dialog.remove());
    dialog.showModal();
  };
  image.addEventListener('click', open);
  image.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
});
