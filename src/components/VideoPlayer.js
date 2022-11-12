import "./VideoPlayer.css";

import { React, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPlayer from "react-player/file";
import moment from "moment";
import Grid from "@mui/material/Grid";
import AnimatedWaves from "./components/AnimatedWaves";
import StaticWaves from "./components/StaticWaves";
import PlayIcon from "./components/Icons/PlayIcon";
import PauseIcon from "./components/Icons/PauseIcon";
import Slider from "@mui/material/Slider";

export default function VideoPlayer() {
  const url =
    "https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4";

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [mouseOnSlider, setMouseOnSlider] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handleToggleButton = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  useEffect(() => {
    if (progress === duration) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [duration, progress]);

  // useEffect(() => {
  // if (showSlider) {
  //   setTimeout(() => {
  //     setShowSlider(false);
  //   }, 2000);
  // }
  // }, [showSlider]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="root"
    >
      {/* Video Player section */}

      <Grid item className="monitor">
        <ReactPlayer
          playing={isPlaying}
          url={url}
          volume={volume}
          width="100%"
          height="100%"
          fallback={<CircularProgress />}
          onReady={() => console.log("Ready")}
          onDuration={(duration) => setDuration(Math.floor(duration))}
          onProgress={(progress) =>
            isPlaying && setProgress(Math.floor(progress.playedSeconds))
          }
        />

        {/* Controls section */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="controls"
        >
          <Grid item className="margin">
            <IconButton
              aria-label="play/pause"
              style={{
                backgroundColor: "grey",
              }}
              onClick={handleToggleButton}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
          </Grid>
          <Grid item className="margin">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <p className="time">
                  {moment.utc(progress * 1000).format("mm:ss")}
                </p>
              </Grid>
              <Grid item>
                <div
                  onMouseOver={() => setShowSlider(true)}
                  onMouseOut={() => {
                    const timeoutID = setTimeout(() => {
                      if (!mouseOnSlider) {
                        setShowSlider(false);
                      }
                    }, 1000);
                    if (mouseOnSlider) {
                      clearTimeout(timeoutID);
                    }
                  }}
                >
                  {showSlider ? (
                    <Slider
                      onMouseOver={() => setMouseOnSlider(true)}
                      onMouseOut={() => {
                        // setTimeout(() => {
                        setMouseOnSlider(false);
                        setShowSlider(false);
                        // }, 2000);
                      }}
                      color="secondary"
                      aria-label="Volume"
                      orientation="vertical"
                      valueLabelDisplay="auto"
                      value={volume}
                      onChange={handleVolumeChange}
                      sx={{
                        height: 100,
                        position: "absolute",
                        bottom: 60,
                        right: 35,
                      }}
                      min={0}
                      step={0.1}
                      max={1}
                    />
                  ) : (
                    ""
                  )}

                  {isPlaying && volume > 0 ? (
                    <AnimatedWaves />
                  ) : (
                    <StaticWaves />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
