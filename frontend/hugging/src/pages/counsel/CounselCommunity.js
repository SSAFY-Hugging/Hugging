import classes from "./CounselCommunity.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CounselCommunity = () => {
  const {
    sendMessage,
    UNSAFE__unityInstance,
    unityProvider,
    addEventListener,
    removeEventListener,
    isLoaded,
    requestFullscreen,
    loadingProgression,
    // unload
  } = useUnityContext({
    loaderUrl: "Build/WebGLBuild.loader.js",
    dataUrl: "Build/WebGLBuild.data",
    frameworkUrl: "Build/WebGLBuild.framework.js",
    codeUrl: "Build/WebGLBuild.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);
  const navigate = useNavigate();
  const exit = useCallback(() => {
    navigate("/counseldone");
  }, []);

  function setLandscape() {
    window.screen.orientation.lock("landscape");
  }

  function sendToUnity() {
    // AgoraRTC.createStream({ video: false, audio: true });
    // AgoraRTC.getDevices();
    window.unityInstance = UNSAFE__unityInstance;
    sendMessage("HuggingLauncher", "SetCounselInfos", "Community|주희");
  }

  useEffect(() => {
    addEventListener("Exit", exit);
    return () => {
      removeEventListener("Exit", exit);
    };
  }, [addEventListener, removeEventListener, exit]);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  return (
    <div>
      {setLandscape()}
      <Unity
        style={{
          width: "90%",
          height: "100%",
          justifySelf: "center",
          alignContent: "center",
        }}
        unityProvider={unityProvider}
        devicePixelRatio={window.devicePixelRatio}
      />
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className={classes.loadingOverlay}>
          <p>로딩중... ({loadingPercentage}%)</p>
        </div>
      )}
      {isLoaded === true && requestFullscreen(true)}
      {isLoaded === true && sendToUnity()}
      {isLoaded === true && (
        <button onClick={handleClickEnterFullscreen}>전체화면</button>
      )}
    </div>
  );
};

export default CounselCommunity;
