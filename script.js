
const songs = [
    { id: 1, name: "Shape of you", artist: "Ed Sheeran", img: "images/Shape_Of_You.png", genre: "pop", source: "songs/shape of you.mp3" },
    { id: 2, name: "Waka Waka", artist: "Shakira", img: "images/waka_waka.jpg", genre: "pop", source: "songs/waka waka.mp3" },
    { id: 3, name: "Back to Black", artist: "Amy Winehouse", img: "images/Back_To_Black.jpg", genre: "rock", source: "songs/Back-In-Black.mp3" },
    { id: 4, name: "Cheap Thrills", artist: "Sia", img: "images/cheap thrills.jpg", genre: "rock", source: "songs/Cheap-Thrills.mp3" },
    { id: 5, name: "Sugar", artist: "Maroon 5", img: "images/suage.jpg", genre: "hip-hop", source: "songs/Sugar - Maroon.mp3" },
    { id: 6, name: "Locked Away", artist: "R. City", img: "images/locked away.jpg", genre: "hip-hop", source: "songs/Locked away.mp3" },
];
let currentSong= { id: 1, name: "Shape of you", artist: "Ed Sheeran", img: "images/Shape_Of_You.png", genre: "pop", source: "songs/shape of you.mp3" }
// Variable to store the index of the currently playing song
let currentSongIndex = null;
let playlistName = '';
let currentPlaylistName='';
let playListsNdSongs={};
let themeDark=false;

// Function to render all songs
function renderAllSongs() {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";
    songs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.name} - ${song.artist}`;
        listItem.addEventListener("click", () => playSong(song));
        songList.appendChild(listItem);
    });
}
// Function to play a song
function playSong(song) {
    // Update song card with the currently playing song
    currentSong=song;
    document.getElementById("song-img").src = song.img;
    document.getElementById("song-img").height = 250; // Set height to 200 pixels
    document.getElementById("song-img").width = 300; // Set width to 300 pixels
    document.getElementById("song-img").src = song.img;
    document.getElementById("song-name").textContent = song.name;
    document.getElementById("artist-name").textContent = song.artist;
    document.getElementById("audio-control").src=song.source;
}

// Function to filter songs by genre
function filterSongsByGenre(genre) {
    if (genre === "all") {
        renderAllSongs();
    } else {
        const filteredSongs = songs.filter(song => song.genre === genre);
        renderFilteredSongs(filteredSongs);
    }
}

// Function to render filtered songs
function renderFilteredSongs(filteredSongs) {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";
    filteredSongs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.name} - ${song.artist}`;
        listItem.addEventListener("click", () => playSong(song));
        songList.appendChild(listItem);
    });
}

document.getElementById("genre-filter").addEventListener("change", (event) => {
    const genre = event.target.value;
    filterSongsByGenre(genre);
});

document.getElementById("toggle-theme-btn").addEventListener("click", (event) => {
    // Implement theme toggle functionality
    const toggle_theme_btn = document.getElementById("toggle-theme-btn");
    const body = document.body;
    const lis = document.querySelectorAll('li')
    if (toggle_theme_btn.checked) {
        themeDark=true;
        body.style.backgroundColor = "rgb(86,86,87)";
        body.style.color = "white"; // Change font color to white
        const panels = document.getElementsByClassName('panel');
        document.getElementById('panel_song').style.backgroundColor="rgb(90,95,97)"


        for (let panel of panels) {
            panel.style.backgroundColor = "rgb(38,50,56)";
        }
        for (let li of lis) {
            li.style.backgroundColor = "rgb(100,106,109)"; // Change li background color

        }

    } else {
        themeDark=false;
        body.style.backgroundColor = "white";
        body.style.color = "black"; // Change font color to black
        const panels = document.getElementsByClassName('panel');
        document.getElementById('panel_song').style.backgroundColor="rgb(5,115,171)"
        for (let panel of panels) {
            panel.style.backgroundColor = "#6BB8DE";
        }
        for (let li of lis) {
            li.style.backgroundColor = "#0B80BB"; // Change li background color
        }
    }
});

// Function to play the next song
function playNextSong() {
 
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(songs[currentSongIndex]);
    
}

// Function to play the previous song
function playPreviousSong() {

        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(songs[currentSongIndex]);
    
}

document.getElementById('create-playlist').addEventListener('change', function(event) {
    playlistName = event.target.value; // Update the playlistName variable
    
});

document.getElementById("create-playlist-btn").addEventListener("click",function createPlaylist() {
     if (playlistName) {
         console.log('hello')
        // Create a new playlist object and add it to the playlist list
       const playlistList = document.getElementById("playlist-list");
         const newPlaylist = document.createElement("li");
         if(themeDark===true){
            newPlaylist.style.backgroundColor = "rgb(100,106,109)"; 
         }
        newPlaylist.textContent = playlistName;
         const icon = document.createElement("i");
        icon.className = "fa-solid fa-x";
        icon.style.float = "right";
        newPlaylist.appendChild(icon)
        icon.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent the playlist from being called when the delete icon is clicked
            deletePlaylist(newPlaylist.textContent); // Call the function to delete the playlist
        });
        
        newPlaylist.addEventListener("click", (function(playlistName) {
             return function() {

                 currentPlaylistName=playlistName;
                 document.getElementById('currentPlaylist').textContent=currentPlaylistName
                 renderPlaylistSongs(playlistName);
            };
        })(playlistName));
        
        playlistList.appendChild(newPlaylist);
     document.getElementById('create-playlist').value=''
     }
 });



// Function to add a song to a playlist
function addToPlaylist(song, playlistName) {
    console.log(song,playlistName)
    // Find the playlist by name
    //const playlist = document.querySelector(`#playlist-list li[data-name="${playlistName}"] ul`);
    //console.log(playlist)

    const currentSongs = playListsNdSongs[playlistName] || [];
    const updatedSongs = [...currentSongs, song];
    if(playlistName){
        // Create a new list item for the song and add it to the playlist
        const listItem = document.createElement("li");
        if(themeDark===true){
            listItem.style.backgroundColor = "rgb(100,106,109)"; 
         }
        listItem.textContent = `${song.name} - ${song.artist}`;
        document.getElementById('playlist-list-current').appendChild(listItem);
        console.log(playlistName)
        playListsNdSongs[playlistName] = updatedSongs;
        console.log(playListsNdSongs)
    }
}



function renderPlaylistSongs(playlistName) {
    
    console.log("Rendering songs for playlist:", playlistName);
    
    // Assuming you have an array of songs for each playlist


    const playlistSongs = playListsNdSongs[playlistName];
    const playlistSongsContainer = document.getElementById("playlist-list-current");

    // Clear any existing songs
    playlistSongsContainer.innerHTML = '';

    if (playlistSongs && playlistSongs.length > 0){
        // Create a new unordered list to hold the songs
        // Add each song as a list item to the unordered list
        playlistSongs.forEach(song => {
            const listItem = document.createElement("li");
            if(themeDark===true){
                listItem.style.backgroundColor = "rgb(100,106,109)"; 
             }
            listItem.textContent = `${song.name} - ${song.artist}`;
            playlistSongsContainer.appendChild(listItem);
        });
    

        // Append the unordered list to the container
    }
    
}


document.getElementById("next-btn").addEventListener("click", playNextSong);
document.getElementById("prev-btn").addEventListener("click", playPreviousSong);

document.getElementById('add-to-playlist-btn').addEventListener("click",function(){addToPlaylist(currentSong,currentPlaylistName)})


// Function to search playlists as the user types
document.getElementById('search-playlist').addEventListener('input', function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const playlistItems = document.querySelectorAll('#playlist-list li');

    playlistItems.forEach(item => {
        const playlistName = item.textContent.toLowerCase();
        if (playlistName.includes(searchQuery)) {
            item.style.display = 'block'; // Show matching playlists
        } else {
            item.style.display = 'none'; // Hide non-matching playlists
        }
    });
});

// Function to search songs as the user types
document.getElementById('search-song').addEventListener('input', function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const songItems = document.querySelectorAll('#song-list li');

    songItems.forEach(item => {
        const songName = item.textContent.toLowerCase();
        if (songName.includes(searchQuery)) {
            item.style.display = 'block'; // Show matching songs
        } else {
            item.style.display = 'none'; // Hide non-matching songs
        }
    });
});

function deletePlaylist(playlistName) {
    console.log(playlistName)
    const playlistList = document.getElementById("playlist-list");
    const playlistItems = playlistList.getElementsByTagName("li");

    for (let i = 0; i < playlistItems.length; i++) {
        const listItem = playlistItems[i];
        if (listItem.textContent === playlistName) {
            playlistList.removeChild(listItem);
            break; // Exit the loop once the playlist is deleted
        }
    }

    // Remove the playlist from the playListsNdSongs object
    delete playListsNdSongs[playlistName];
    console.log(playListsNdSongs);
    const playlistSongsContainer = document.getElementById("playlist-list-current");
    playlistSongsContainer.innerHTML = '';
    document.getElementById('currentPlaylist').textContent=''
}

// Initialize the app
renderAllSongs();
