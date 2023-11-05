import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const ifrimeEl = document.querySelector('iframe');
const player = new Player(ifrimeEl);

savedTime();

function onTimeUpdate(event) {
  localStorage.setItem(LOCALSTORAGE_KEY, `${event.seconds}`);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function savedTime() {
  let currentTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}

