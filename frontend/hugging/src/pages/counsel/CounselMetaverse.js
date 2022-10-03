import classes from "./CounselCommunity.module.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CounselMetaverse = () => {
  const location = useLocation();
  const from = location.state?.from;
  const nickName = location.state?.nickName;
  let counselId = 1;
  let subject = "Depressed";

  if (from === "OneToOne") {
    counselId = location.state?.counselId;
    subject = location.state?.subject;
  }

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
    if (from === "Community") {
      navigate("/counselselect");
    } else {
      navigate("/counseldone");
    }
  }, []);

  function setLandscape() {
    window.screen.orientation.lock("landscape");
  }

  function sendToUnity() {
    // AgoraRTC.createStream({ video: false, audio: true });
    // AgoraRTC.getDevices();
    window.unityInstance = UNSAFE__unityInstance;

    let msg = "Community|주희";
    if (from === "Community") {
      msg = "Community|" + nickName;
    } else {
      msg = "OneToOne|" + nickName + "|" + counselId + "|" + subject;
    }

    console.log(msg);
    sendMessage("HuggingLauncher", "SetCounselInfos", msg);
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

export default CounselMetaverse;
