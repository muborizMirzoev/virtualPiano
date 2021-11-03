const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');
const pianoKey = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');
let fullscreen = document.querySelector('.fullscreen');

console.log(fullscreen);

fullscreen.addEventListener('click', activateFullscreen);
function activateFullscreen(event) {
  if(document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if(document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if(document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if(document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
};

fullscreen.addEventListener('click', deactivateFullscreen);

function deactivateFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};


btnNotes.addEventListener('click', () => {
  if (!(btnNotes.classList.contains('btn-active'))) {
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
    pianoKey.forEach((item) => {
      item.classList.remove('piano-key-letters')
    })
  }
});

btnLetters.addEventListener('click', () => {
  if (!(btnLetters.classList.contains('btn-active'))) {
    btnLetters.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
    pianoKey.forEach((item) => {
      item.classList.add('piano-key-letters')
    })
  }
});


piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    event.target.classList.add('piano-key-active');
    setTimeout((e) => {
      event.target.classList.remove('piano-key-active');
    }, 130)
  }
});

window.addEventListener('keydown', (event) => {
  pianoKey.forEach((item) => {
    const key = item.dataset.letter;
    if (event.code.slice(-1) === key) {
      const src = `assets/audio/${item.dataset.note}.mp3`;
      playAudio(src);
      console.log(item);
      item.classList.add('piano-key-active');
    }
  })
});

window.addEventListener('keyup', (event) => {
  pianoKey.forEach((item) => {
    item.classList.remove('piano-key-active');
  })
});

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}