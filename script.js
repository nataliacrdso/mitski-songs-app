const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const coverImage = document.getElementById("coverImage");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const playlist = [
    {
        name: "The Deal",
        artist: "Mitski",
        url: "music/The Deal.mp3",
        cover: "covers/mitski2.png",
    },    


    {
        name: "If I Leave",
        artist: "Mitski",
        url: "music/If I Leave.mp3",
        cover: "covers/mitski8.png",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski10.png",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski9.png",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski7.jpg",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski6.jpeg",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski5.png",
    },

    {
        name: "Add song here",
        artist: "Mitski",
        url: "music/song.mp3",
        cover: "covers/mitski3.png",
    }

];

let currentIndex = 0;

function loadSong(index) {
    const song = playlist[index];
    if (!song) return;

    audio.src = song.url;
    document.querySelector(".song-title").textContent = song.name;

    coverImage.src = song.cover;
    coverImage.style.display = "block";

    isPlaying = false;
    playPauseIcon.src = "icons/heartt.png";
}

nextBtn.addEventListener("click", () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
});

let isPlaying = false;

const playPauseIcon = document.getElementById("playPauseIcon");

playPauseBtn.addEventListener("click", () => {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        playPauseIcon.src = "icons/heartt.png";
    } else {
        audio.play();
        playPauseIcon.src = "icons/pause.png";
    }
    isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`; 
});

function attachWindowControlListeners() {
    const minBtn = document.querySelector('.min-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (minBtn && window.electronAPI) {
        minBtn.addEventListener('click', () => {
            window.electronAPI.minimizeWindow();
        });
    }

    if (closeBtn && window.electronAPI) {
     closeBtn.addEventListener('click', () => {
        window.electronAPI.closeWindow();
     });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    attachWindowControlListeners ();

    if (playlist.length > 0) {
        loadSong(0);
    }
});
