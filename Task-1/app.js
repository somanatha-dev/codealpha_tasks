const songs = [
    { name: "music-1.mp3", title: "Shape of You", artist: "Ed Sheeran" },
    { name: "music-2.mp3", title: "Despacito", artist: "Luis Fonsi" },
    { name: "music-3.mp3", title: "Baby", artist: "DJ Snake, Justin Bieber" }
];

let songIndex = 0;
let isRepeating = false;
let isShuffling = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.name;
}

function playSong() {
    audio.play();
    playBtn.textContent = '⏸️';
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
}

function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function setProgress() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

// Updated the setVolume function like this
function setVolume() {
    const volumeValue = volumeBar.value / 100000;  // Convert to a range of 0.0 - 1.0
    audio.volume = volumeValue;
}



function playNext() {
    if (isShuffling) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    loadSong(songs[songIndex]);
    playSong();
}

playBtn.addEventListener('click', () => audio.paused ? playSong() : pauseSong());
nextBtn.addEventListener('click', playNext);

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

shuffleBtn.addEventListener('click', () => {
    if (!isShuffling) {
        isShuffling = true;
        isRepeating = false;
        shuffleBtn.classList.add('active-btn');
        repeatBtn.classList.remove('active-btn');
    } else {
        isShuffling = false;
        shuffleBtn.classList.remove('active-btn');
    }
});

repeatBtn.addEventListener('click', () => {
    if (!isRepeating) {
        isRepeating = true;
        isShuffling = false;
        repeatBtn.classList.add('active-btn');
        shuffleBtn.classList.remove('active-btn');
    } else {
        isRepeating = false;
        repeatBtn.classList.remove('active-btn');
    }
});

audio.addEventListener('ended', () => isRepeating ? playSong() : playNext());
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);

loadSong(songs[songIndex]);