using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using agora_gaming_rtc;
using agora_utilities;

public class VoiceManager : MonoBehaviour
{
    [SerializeField]
    private string appId;
    public string channelName = "";

    public static VoiceManager instance;

    internal IRtcEngine RtcEngine = null;

    public GameObject micOn, micOff;
    public bool micMute = true;

    private void Awake()
    {
        if (instance)
        {
            Destroy(gameObject);
        }
        else
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        RtcEngine = IRtcEngine.getEngine(appId);
        RtcEngine.SetLogFilter(LOG_FILTER.DEBUG | LOG_FILTER.INFO | LOG_FILTER.WARNING | LOG_FILTER.ERROR | LOG_FILTER.CRITICAL);

        //RtcEngine.OnJoinChannelSuccess = OnJoinChannelSuccessHandler;
        //RtcEngine.OnUserJoined = OnUserJoined;
        //RtcEngine.OnUserOffline = onUserOffline;
        RtcEngine.OnLeaveChannel += OnLeaveChannelHandler;

        RtcEngine.OnWarning = (int warn, string msg) => {
            Debug.LogWarningFormat("Warning code:{0} msg:{1}", warn, IRtcEngine.GetErrorDescription(warn));
        };
        RtcEngine.OnError = HandleError;

        TokenClient.Instance.RtcEngine = RtcEngine;        
    }

    private void Update()
    {
        PermissionHelper.RequestMicrophontPermission();
    }

    public void JoinChannel()
    {

        //RtcEngine.SetDefaultMuteAllRemoteAudioStreams(true);
      

        TokenClient.Instance.GetTokens(channelName, 0,
            (rtcToken, rtmToken) =>
            {
                // join channel with token
                ChannelMediaOptions options = new()
                {
                    publishLocalAudio = false,
                    autoSubscribeAudio = true,
                    publishLocalVideo = false,
                    autoSubscribeVideo = false
                };               
                RtcEngine.JoinChannelByKey(rtcToken, channelName, null, 0);
            }
        );
        RtcEngine.EnableAudio();

        //RtcEngine.SetChannelProfile(CHANNEL_PROFILE.CHANNEL_PROFILE_LIVE_BROADCASTING);
        RtcEngine.SetClientRole(CLIENT_ROLE_TYPE.CLIENT_ROLE_BROADCASTER);

    }

    public void ToggleMicState()
    {
        micMute = !micMute;
        micOn.SetActive(!micMute);
        micOff.SetActive(micMute);

        if(micMute)
        {
            RtcEngine.MuteLocalAudioStream(true);

            //RtcEngine.AdjustAudioMixingPublishVolume(0);
        }
        else
        {
            //Configurat
            RtcEngine.MuteLocalAudioStream(false);

            //RtcEngine.AdjustAudioMixingPublishVolume(100);
        }
    }

    //public void StopPublishAudio()
    //{
    //    ChannelMediaOptions options = new ChannelMediaOptions();
    //    options.publishLocalAudio = false;
    //    var nRet = RtcEngine
    //}

    //public void StartPublishAudio()
    //{
    //    var options = new ChannelMediaOptions();
    //    options.publishMicrophoneTrack.SetValue(true);
    //    var nRet = RtcEngine.UpdateChannelMediaOptions(options);
    //    this.Log.UpdateLog("UpdateChannelMediaOptions: " + nRet);
    //}


    void OnLeaveChannelHandler(RtcStats stats)
    {
        if(RtcEngine == null)
            return;
        RtcEngine.LeaveChannel();
    }

    private void HandleError(int error, string msg)
    {
        Debug.Log(string.Format("OnError err: {0}, msg: {1}", error, msg));
    }

    private void OnDestroy()
    {
        Debug.Log("OnDestroy");
        if (RtcEngine == null) return;
        RtcEngine.LeaveChannel();
    }
}