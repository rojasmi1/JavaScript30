const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreenButton = player.querySelector('.fullscreen__button');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}

function updateButton() {
  if(video.paused){
    toggle.textContent = '►';
  }else{
    toggle.textContent = '❚ ❚';
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange () {
  video[this.name] = this.value;
}

function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const percent = (e.offsetX/progress.offsetWidth)*100;

  video.currentTime = (percent/100)* video.duration;
  progressBar.style.flexBasis = `${percent}%`;
}

function toggleScreen() {
  
  //Check for fullscreen support
  if(!player.requesFullscreen && !player.webkitRequestFullscreen && !player.mozRequestFullscreen)
  return;
  
  //Call fullscreen functions dynamically
  let requesFullScreenProp = 'requesFullscreen';
  let exitFullscreenProp = 'exitFullscreen';
  let isFullScreenProp = 'fullscreen';
  
  //Populate prop name inside the variables to call funtion using correct name
  if(player.webkitRequestFullscreen) {
    requesFullScreenProp = 'webkitRequestFullscreen';
    exitFullscreenProp = 'webkitExitFullscreen';
    isFullScreenProp = 'webkitIsFullScreen';
  } else if(player.mozRequestFullscreen) {
    requesFullScreenProp = 'mozRequestFullscreen';
    exitFullscreenProp = 'mozExitFullscreen';
    isFullScreenProp = 'mozFullScreen';
  }   
   
  //Check if document is fullscreen
  let isFullScreen = false;
  if(document[isFullScreenProp]){
    isFullScreen = true;
  }
  
  //Toggle between full and nomal screen
  if(isFullScreen){
    //Call exitfullscreen function according to current browser
    document[exitFullscreenProp]();
    fullscreenButton.textContent = '🖵';
  }else{
    //Call fullscreen function according to current browser
    player[requesFullScreenProp]();  
    fullscreenButton.textContent = '⎚';
  }
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change', updateRange));
fullscreenButton.addEventListener('click',toggleScreen);

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);
