import { React, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPlayer from "react-player/file";
import moment from "moment";
import Grid from "@mui/material/Grid";
import AnimatedWaves from "../components/AnimatedWaves";
import StaticWaves from "../components/StaticWaves";
import PlayIcon from "../components/Icons/PlayIcon";
import PauseIcon from "../components/Icons/PauseIcon";
import Slider from "@mui/material/Slider";

import "./VideoPlayer.css";

export default function VideoPlayer() {
  const url =
    "https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4";

  const [isReady, setIsReady] = useState(false);
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
          onReady={() => setIsReady(true)}
          onDuration={(duration) => setDuration(Math.floor(duration))}
          onProgress={(progress) =>
            isPlaying && setProgress(Math.floor(progress.playedSeconds))
          }
        />

        {!isReady ? (
          // show loader when the url still loading
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        ) : (
          // Controls section
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="controls"
          >
            {/* Play/Pause Button */}
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
                {/* Timer */}
                <Grid item>
                  <p className="time">
                    {moment.utc(progress * 1000).format("mm:ss")}
                  </p>
                </Grid>

                {/* Volume Slider */}
                <Grid
                  item
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
                        setMouseOnSlider(false);
                        setShowSlider(false);
                      }}
                      color="secondary"
                      aria-label="Volume"
                      orientation="vertical"
                      valueLabelDisplay="auto"
                      value={volume}
                      onChange={handleVolumeChange}
                      sx={{
                        height: "6.5vw",
                        position: "absolute",
                        width: "0.4vw",
                        bottom: "3.5vw",
                        right: "1.9vw",
                      }}
                      min={0}
                      step={0.1}
                      max={1}
                    />
                  ) : (
                    ""
                  )}

                  {/* Animated/Static Waves */}
                  {isPlaying && volume > 0 ? (
                    <AnimatedWaves />
                  ) : (
                    <StaticWaves />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
