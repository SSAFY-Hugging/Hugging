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
    // unload
  } = useUnityContext({
    loaderUrl: "Build/WebGLBuild.loader.js",
    dataUrl: "Build/WebGLBuild.data",
    frameworkUrl: "Build/WebGLBuild.framework.js",
    codeUrl: "Build/WebGLBuild.wasm",
  });
  const navigate = useNavigate();
  const exit = useCallback(() => {
    navigate("/counseldone");
  }, []);

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

  return (
    <div>
      {sendToUnity()}
      <Unity
        style={{
          width: "90%",
          height: "100%",
          justifySelf: "center",
          alignContent: "center",
        }}
        unityProvider={unityProvider}
      />
    </div>
  );
};

export default CounselCommunity;
