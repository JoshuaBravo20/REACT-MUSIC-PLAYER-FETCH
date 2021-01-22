import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);

  const apiURL = "https://assets.breatheco.de/apis/sound/";

  let fetchSongs = () => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSongs((prevState) => {
          return data;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(null);
  let track = useRef(null);

  let newSongs = songs.map((index, i) => {
    return (
      <>
        <li
          key={index.id}
          className="list-group-item bg-dark text-white"
          onClick={() => {
            setCurrentIndex(i);
            track.current.src = apiURL + index.url;
            playRef.current.className = "hiding";
            pauseRef.current.className = "btn btn-primary btn-lg";
          }}
        >
          <span className="count">{i + 1} </span>
          {index.name} 
        </li>
      </>
    );
  });

  let playRef = useRef(null);
  let pauseRef = useRef(null);

  function playTrack() {
    if (currentIndex === null) {
      playRef.current.className = "btn btn-success btn-lg";
      pauseRef.current.className = "hiding";
    } else {
      track.current.play();
      playRef.current.className = "hiding";
      pauseRef.current.className = "btn btn-primary btn-lg";
    }
  }

  function pauseTrack() {
    track.current.pause();
    pauseRef.current.className = "hiding";
    playRef.current.className = "btn btn-success btn-lg";
  }

  function forwardTrack() {
    if (currentIndex !== songs.length - 1) {
      track.current.src = apiURL + songs[currentIndex + 1].url;
      setCurrentIndex(currentIndex + 1);
      playRef.current.className = "hiding";
      pauseRef.current.className = "btn btn-primary btn-lg";
    } else {
      setCurrentIndex(0);
      track.current.src = apiURL + songs[0].url;
    }
  }

  function backwardTrack() {
    if (currentIndex !== 0) {
      track.current.src = apiURL + songs[currentIndex - 1].url;
      setCurrentIndex(currentIndex - 1);
      playRef.current.className = "hiding";
      pauseRef.current.className = "btn btn-primary btn-lg";
    } else if (currentIndex === 0) {
      track.current.src = apiURL + songs[21].url;
      setCurrentIndex(21);
    }
  }

  function volumeUp() {
    if (track.current.volume < 0.9) {
      track.current.volume += 0.2;
    }
  }

  function volumeDown() {
    if (track.current.volume > 0.1) {
      track.current.volume = track.current.volume - 0.2;
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ul className="list-group">
            {newSongs}
          </ul>
        </div>
        <audio ref={track} src={null} key={null} controls autoPlay />
        <div className="buttonsBar">
          <button
            className="btn btn-link btn-lg vDown animate__animated animate__backInLeft"
            onClick={volumeDown}
          >
            <i class="fas fa-volume-down"></i>
          </button>
          <button
            className="btn btn-link btn-lg animate__animated animate__backInLeft"
            onClick={volumeUp}
          >
            <i class="fas fa-volume-up"></i>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={backwardTrack}>
            <i className="fas fa-backward"></i>
          </button>
          <button
            className="btn btn-success btn-lg"
            onClick={playTrack}
            ref={playRef}
          >
            <i className="fas fa-play"></i>
          </button>
          <button className="hiding" onClick={pauseTrack} ref={pauseRef}>
            <i className="fas fa-pause-circle"></i>
          </button>
          <button className="btn btn-secondary btn-lg" onClick={forwardTrack}>
            <i className="fas fa-forward"></i>
          </button>
          <div className="spotify animate__animated animate__backInRight">
            <i class="fab fa-spotify"></i>
          </div>
        </div>
      </div>
    </>
  );
}


export default App;
