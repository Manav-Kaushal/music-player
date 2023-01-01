const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const prev = document.querySelector(".prev");
const playPause = document.querySelector(".playPause");
const next = document.querySelector(".next");
const audio = document.querySelector("audio");
const progressBar = document.querySelector(".progressBar");
const progressed = document.querySelector(".progressed");

// Songs Data
const songList = [
  {
    path: "songs/Cinematic_Piano.mp3",
    songName: "Cinematic Piano",
    artistName: "NCS",
  },
  {
    path: "songs/downfall.mp3",
    songName: "Downfall",
    artistName: "NCS",
  },
  {
    path: "songs/In The Forest 2.mp3",
    songName: "In The Forest 2",
    artistName: "NCS",
  },
];

let songPlaying = false;

audio.ontimeupdate = function () {
  progressed.style.width =
    Math.floor((100 * audio.currentTime) / audio.duration) + "%";
};

progressBar.onclick = function (e) {
  audio.currentTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
};

function progressedWidthZero() {
  progressed.style.width = 0;
}

function playSong() {
  songPlaying = true;
  audio.play();
  playPause.classList.add("active");
  playPause.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
}

function pauseSong() {
  songPlaying = false;
  audio.pause();
  playPause.classList.remove("active");
  playPause.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
}

// Play/Pause music on button click
playPause.addEventListener("click", () =>
  songPlaying ? pauseSong() : playSong()
);

// Add song list
function loadSong(songList) {
  title.textContent = songList.songName;
  artist.textContent = songList.artistName;
  audio.src = songList.path;
}

// Current Song
let i = 0;
loadSong(songList[i]);

// Prev Song
function prevSong() {
  i--;
  if (i < 0) {
    i = songList.length - 1;
  }
  loadSong(songList[i]);
  if (songPlaying === true) {
    playSong();
  } else {
    pauseSong();
  }
  progressedWidthZero();
}
prev.addEventListener("click", prevSong);

// Next song
function nextSong() {
  i++;
  if (i > songList.length - 1) {
    i = 0;
  }
  loadSong(songList[i]);
  if (songPlaying === true) {
    playSong();
  } else {
    pauseSong();
  }
  progressedWidthZero();
}
next.addEventListener("click", nextSong);

audio.addEventListener("ended", nextSong);
