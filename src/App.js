import "./App.css";
import { useRef, useState } from "react";

import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPlayer from "react-player/file";
import moment from "moment";
import VideoPlayer from "./components/VideoPlayer";

// https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4

function App() {
  return (
    // <div className="App">
    <VideoPlayer />
    // </div>
  );
}

export default App;
