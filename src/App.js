import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [apiURL, setApiUrl] = useState(
    "https://assets.breatheco.de/apis/sound/"
  );

  const [songs, setSongs] = useState([
    {
      id: 1,
      category: "game",
      name: "Mario Castle",
      url: "files/mario/songs/castle.mp3",
    },
    {
      id: 2,
      category: "game",
      name: "Mario Star",
      url: "files/mario/songs/hurry-starman.mp3",
    },
    {
      id: 3,
      category: "game",
      name: "Mario Overworld",
      url: "files/mario/songs/overworld.mp3",
    },
  ]);

  let newSongs = songs.map((index, i) => {

    return (
      <>
        <li
          key={i}
          className='list-group-item bg-dark text-white'
          onClick={() => {
            setCurrentIndex(i);
            console.log(currentIndex);
            track.current.src = apiURL + index.url;
            playRef.current.className = 'hiding';
            pauseRef.current.className = 'btn btn-primary btn-lg';
          }}
        >
          <span className="count">{i + 1} </span>
          {index.name}
        </li>
      </>
    );
  });

  let track = useRef(null);
  let playRef = useRef(null);
  let pauseRef = useRef(null);

  function playTrack() {
    track.current.play();
    playRef.current.className = 'hiding';
    pauseRef.current.className = 'btn btn-primary btn-lg';
  }

  function pauseTrack() {
    track.current.pause();
    pauseRef.current.className = 'hiding';
    playRef.current.className = 'btn btn-success btn-lg';
  }

  function forwardTrack() {
    if (currentIndex !== songs.length - 1) {
    track.current.src = apiURL + songs[currentIndex + 1].url;
    setCurrentIndex(currentIndex + 1);
    playRef.current.className = 'hiding';
    pauseRef.current.className = 'btn btn-primary btn-lg';
    }else {
      setCurrentIndex(0);
      track.current.src = apiURL + songs[0].url;
    }
  }

  function backwardTrack() {
    if (currentIndex !== 0) {
    track.current.src = apiURL + songs[currentIndex - 1].url;
    setCurrentIndex(currentIndex - 1);
    playRef.current.className = 'hiding';
    pauseRef.current.className = 'btn btn-primary btn-lg';
    }else if (currentIndex === 0) {
      track.current.src = apiURL + songs[2].url;
      setCurrentIndex(2);
    }
  }

  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ul className="list-group">{newSongs}</ul>
        </div>
        <audio ref={track} src={null} key={null} controls autoPlay />
        <div className="buttonsBar">
          <button className="btn btn-secondary btn-lg" onClick={backwardTrack}>
            <i className="fas fa-backward"></i>
          </button>
          <button className="btn btn-success btn-lg" onClick={playTrack} ref={playRef}>
            <i className="fas fa-play"></i>
          </button>
          <button className="hiding" onClick={pauseTrack} ref={pauseRef}>
            <i className="fas fa-pause-circle"></i>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={forwardTrack}>
            <i className="fas fa-forward"></i>
          </button>
          <div className='spotify'>
            <i class="fab fa-spotify"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
