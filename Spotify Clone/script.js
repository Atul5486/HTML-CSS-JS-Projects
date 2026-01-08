let currentSong = new Audio();
let songs;
let currFolder;
let lastClickedElement;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault(); // Prevent the page from scrolling when space is pressed
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg"; // Update the play button to the pause icon
        } else {
            currentSong.pause();
            play.src = "img/play.svg"; // Update the play button to the play icon
        }
    }
});


function secondsToMinutes(seconds) {
    // Ensure seconds are a valid number
    if (isNaN(seconds) || seconds < 0) return "00:00";

    const totalSeconds = Math.floor(Math.max(0, seconds)); // Ensure non-negative

    const minutes = Math.floor(totalSeconds / 60); // Calculate minutes
    const remainingSeconds = totalSeconds % 60; // Calculate remaining seconds

    // Format minutes and seconds to always show two digits
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}



let songListItems = [];

function updateSongStyles(element) {
    // Reset styles for the last clicked element
    if (lastClickedElement) {
        lastClickedElement.style.boxShadow = "none";
        const lastImg = lastClickedElement.querySelector("img");
        if (lastImg) {
            lastImg.style.animation = "none";
        }
    }

    // Apply styles to the current element
    element.style.boxShadow = "0px 0px 8px white";
    const currentImg = element.querySelector("img");
    if (currentImg) {
        currentImg.style.animation = "rotate 1s infinite linear";
    }

    // Update lastClickedElement
    lastClickedElement = element;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5501/${folder}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += ` 
            <li class="flex">
                <img src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Honny</div>
                </div>
                <div class="playnow flex j-center a-center">
                    <span>Play Now</span>
                    <img src="img/play.svg" alt="">
                </div>
            </li>`;
    }

    // Select all <li> elements
    songListItems = Array.from(document.querySelector(".songList").getElementsByTagName("li"));

    // Set styles for the first song initially
    if (songListItems.length > 0) {
        updateSongStyles(songListItems[0]);
    }

    songListItems.forEach(e => {
        e.addEventListener("click", function () {
            playaudio(e.querySelector(".info").firstElementChild.innerHTML);
            updateSongStyles(e);
        });
    });

    return songs;
}



let currentIndex = 0; // Current song index

const playaudio = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track;

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00";
    
    // When the current song ends, play the next one
    currentSong.onended = () => {
        currentIndex++; // Move to next song
        if (currentIndex >= songs.length) {
            currentIndex = 0; // Loop back to first song
        }
        playaudio(songs[currentIndex]); 
        updateSongStyles(songListItems[currentIndex]); 
    };
};



async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5501/songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let anchor = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchor)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0]
            let a = await fetch(`http://127.0.0.1:5501/songs/${folder}/info.json`);
            let response = await a.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                            <div class="play flex j-center a-center">
                                <i class="ri-play-fill"></i>
                            </div>
                            <img src="/songs/${folder}/cover.jpg">
                            <h2>${response.title}</h2>
                            <p>${response.description}</p>
                        </div>`
        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            let songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playaudio(songs[0])
        })
    })
    return songs
}
async function main() {
    await getsongs("songs/Bhojpuri_mood");
    playaudio(songs[0], true)

    displayAlbums()

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        } else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutes(currentSong.currentTime)} / ${secondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (percent / 100) * currentSong.duration;
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    previous.addEventListener("click", () => {
        if (!songs.length) return;
        
        currentIndex--; // Move to previous song
        if (currentIndex < 0) {
            currentIndex = songs.length - 1; // Go to last song if at first
        }
    
        playaudio(songs[currentIndex]); 
        updateSongStyles(songListItems[currentIndex]);
    });
    
    // Next button functionality
    next.addEventListener("click", () => {
        if (!songs.length) return;
        
        currentIndex++; // Move to next song
        if (currentIndex >= songs.length) {
            currentIndex = 0; // Loop to first song
        }
    
        playaudio(songs[currentIndex]); 
        updateSongStyles(songListItems[currentIndex]);
    });
   

    document.querySelector('.range').getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume == 0) {
            document.querySelector('.volume >img').src = "img/mute.svg"
        } else {
            document.querySelector('.volume >img').src = "img/volume.svg"
        }
    })

    document.querySelector('.volume > img').addEventListener("click", e => {
        if (e.target.src.includes("img/volume.svg")) {
            e.target.src = "img/mute.svg";
            currentSong.volume = 0;
            document.querySelector('.range').getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = "img/volume.svg";
            currentSong.volume = 0.10;
            document.querySelector('.range').getElementsByTagName("input")[0].value = 10;
        }
    });


}

main()