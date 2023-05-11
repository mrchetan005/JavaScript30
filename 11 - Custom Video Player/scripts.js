// ! Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// ! Build out functions
function togglePlay() {
    video.paused ? video.play() : video.pause();
}
function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}
function skip() {
    video.currentTime += +this.dataset.skip;
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// ! Hook up the Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => {
    skipButton.addEventListener('click', skip);
});
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);