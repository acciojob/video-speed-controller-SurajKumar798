const video = document.querySelector('.flex');
const toggle = document.querySelector('.player__button');
const skipButtons = document.querySelectorAll('[data-skip]');
const slider = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

function togglePlay(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}
function updateButton(){
	toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleSliderUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressFilled.style.width = `{percent}%`;
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeUpdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
slider.forEach(slider => slider.addEventListener('input', handleSliderUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);