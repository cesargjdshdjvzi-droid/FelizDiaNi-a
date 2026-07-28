document.addEventListener('DOMContentLoaded', () => {
  const btnIniciar = document.getElementById('btnIniciar');
  const musica = document.getElementById('musica');
  const subtitulo = document.getElementById('subtitulo');
  const cards = document.querySelectorAll('.card');

  let musicaEstabaSonando = false;

  // Modales
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTexto = document.getElementById('modalTexto');
  const btnCerrar = document.getElementById('btnCerrar');

  const btnAbrirVideo = document.getElementById('btnAbrirVideo');
  const modalVideo = document.getElementById('modalVideo');
  const btnCerrarVideo = document.getElementById('btnCerrarVideo');
  const reproductorVideo = document.getElementById('reproductorVideo');

  const btnVerCarta = document.getElementById('btnVerCarta');
  const modalCarta = document.getElementById('modalCarta');
  const btnCerrarCarta = document.getElementById('btnCerrarCarta');

  // Al presionar el botón principal
  btnIniciar.addEventListener('click', () => {
    // Reproducir música de fondo
    musica.play().catch(e => console.log('Autoplay bloqueado:', e));
    
    // Ocultar botón y actualizar subtítulo
    btnIniciar.style.display = 'none';
    subtitulo.textContent = 'Haz clic en las imágenes para descubrir los mensajes ❤️';

    // Disparar efecto de confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Revelar fotos en cascada
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('revelada');
      }, index * 120);
    });
  });

  // Abrir fotos con mensaje
  cards.forEach(card => {
    if (!card.classList.contains('card-video')) {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const mensaje = card.getAttribute('data-mensaje');
        modalImg.src = img.src;
        modalTexto.textContent = mensaje;
        modal.classList.add('activo');
      });
    }
  });

  // Cerrar modal de foto
  btnCerrar.addEventListener('click', () => modal.classList.remove('activo'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('activo');
  });

  // Modal de Video: Pausar música al reproducir video
  btnAbrirVideo.addEventListener('click', () => {
    if (!musica.paused) {
      musicaEstabaSonando = true;
      musica.pause();
    }
    modalVideo.classList.add('activo');
    reproductorVideo.play();
  });

  const reanudarMusica = () => {
    modalVideo.classList.remove('activo');
    reproductorVideo.pause();
    if (musicaEstabaSonando) {
      musica.play().catch(e => console.log(e));
    }
  };

  btnCerrarVideo.addEventListener('click', reanudarMusica);

  modalVideo.addEventListener('click', (e) => {
    if (e.target === modalVideo) {
      reanudarMusica();
    }
  });

  // Modal de la Carta Final
  btnVerCarta.addEventListener('click', () => {
    modalVideo.classList.remove('activo');
    reproductorVideo.pause();
    
    // Reanudar música para la carta final
    if (musicaEstabaSonando) {
      musica.play().catch(e => console.log(e));
    }

    modalCarta.classList.add('activo');
    
    // Confeti para la carta
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  });

  btnCerrarCarta.addEventListener('click', () => modalCarta.classList.remove('activo'));
  modalCarta.addEventListener('click', (e) => {
    if (e.target === modalCarta) modalCarta.classList.remove('activo');
  });
});