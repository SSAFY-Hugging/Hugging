using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;
using System.Runtime.InteropServices;

public class HuggingLauncher : MonoBehaviourPunCallbacks
{
    [DllImport("__Internal")]
    private static extern void Exit();

    public GameObject canvas;
    public Text roomNameText;
    public Text playerCountText;
    public Text playerListText;
    
    public string counselType;
    public string roomName;
    private string roomNum;
    public string nickname;
    public static string subject;
    public int selectedCharacterNum;
    public Dictionary<string, string> subjectToHangul;

    private static string gameVersion = "1";
    private static string[] counselTypes = new string[2];

    public VoiceManager voiceManager;
    public GameObject isFullRoomAlert;
    public GameObject StartPanel;
    public GameObject CommunityLobby;
    public GameObject SelectCharacter;
    public GameObject CounselingRoom;

    private void Awake()
    {
        PhotonNetwork.AutomaticallySyncScene = true;
        counselTypes[0] = "OneToOne";
        counselTypes[1] = "Community";
        Connect();
    }

    public void SetCounselInfos(string infos)
    {
        string[] infoArr = infos.Split("|");
        counselType = infoArr[0];

        if(counselType.Equals(counselTypes[0])) {
            nickname = infoArr[1];
            roomName = infoArr[2];
            subject = infoArr[3];
        } else if(counselType.Equals(counselTypes[1])) {
            nickname = infoArr[1];
        }    
    }

    private void Connect()
    {

        PhotonNetwork.GameVersion = gameVersion;
        PhotonNetwork.ConnectUsingSettings();
    }

    public override void OnConnectedToMaster()
    {
        Debug.Log("connect to master");
        PhotonNetwork.JoinLobby();
    }

    public override void OnJoinedLobby()
    {
        StartPanel.SetActive(false);

        if (counselType.Equals(counselTypes[0]))
        {
            SelectCharacter.SetActive(true);
            CounselingRoom.SetActive(false);
        }
        else if (counselType.Equals(counselTypes[1]))
        {
            CommunityLobby.SetActive(true);
        }
    }

    public void EnterCounselingRoom(int characterNum)
    {
        selectedCharacterNum = characterNum;

        if (counselType.Equals(counselTypes[0]))
        {
            PhotonNetwork.JoinOrCreateRoom(roomName, new RoomOptions { MaxPlayers = 2 }, TypedLobby.Default);
        }
        else if (counselType.Equals(counselTypes[1]))
        {
            SelectCharacter.SetActive(false);
            CounselingRoom.SetActive(true);
            SetRoomInfos();
            SpawnPlayer();
            SetVoiceChat();
            photonView.RPC("SetPlayerList", RpcTarget.All);
        }
    }

    public void SelectCommunityRoom(string roomInfo)
    {
        string[] roomInfoArr = roomInfo.Split("|");
        subject = roomInfoArr[0];
        roomNum = roomInfoArr[1];
        roomName = subject + roomNum;

        PhotonNetwork.JoinOrCreateRoom(roomName, new RoomOptions { MaxPlayers = 6 }, TypedLobby.Default);
    }

    public override void OnJoinedRoom()
    {
        Debug.Log("on joined room");
        if (counselType.Equals(counselTypes[0]))
        {
            SelectCharacter.SetActive(false);
            CounselingRoom.SetActive(true);
            SetRoomInfos();
            SpawnPlayer();
            SetVoiceChat();
            photonView.RPC("SetPlayerList", RpcTarget.All);
        } else if(counselType.Equals(counselTypes[1]))
        {
            CommunityLobby.SetActive(false);
            SelectCharacter.SetActive(true);
        }
        
    }

    private void SetRoomInfos()
    {
        PlaceManager.instance.SetPlace(subject);
        PhotonNetwork.NickName = nickname;
        PhotonNetwork.LocalPlayer.NickName = nickname;

        if (counselType.Equals(counselTypes[0]))
        {
            roomNameText.text = roomName;
        }
        else if (counselType.Equals(counselTypes[1]))
        {
            subjectToHangul = new Dictionary<string, string>();
            subjectToHangul.Add("Depressed", "우울");
            subjectToHangul.Add("Insomnia", "불면증");
            subjectToHangul.Add("Family", "가족");
            subjectToHangul.Add("School", "학교/학업");
            subjectToHangul.Add("Company", "직장/진로");
            subjectToHangul.Add("Relationship", "대인관계");
            subjectToHangul.Add("Love", "연애/결혼");
            subjectToHangul.Add("SelfUnderstanding", "자기이해");
            roomNameText.text = subjectToHangul.GetValueOrDefault(subject) + " " + roomNum;
        }
    }

    [PunRPC]
    public void SetPlayerList()
    {
        Debug.Log("set player list");
        playerCountText.text = PhotonNetwork.CurrentRoom.PlayerCount.ToString();
        string playerListStr = "";
        foreach (Player item in PhotonNetwork.PlayerList)
        {
            Debug.Log("player : " + item.ToString());
            playerListStr += item.NickName + "\n";
        }
        playerListText.text = playerListStr;
    }

    private void SpawnPlayer()
    {
        string characterName = "Ch_" + selectedCharacterNum.ToString();
        GameObject player = PhotonNetwork.Instantiate(characterName, Camera.main.transform.position, Quaternion.identity);

        Camera.main.gameObject.SetActive(false);
        GameObject characterCamera = PhotonNetwork.Instantiate("characterCamera", player.transform.position, Quaternion.identity);
        characterCamera.GetComponent<CharacterCamera>().player = player;


        //GameObject nickName = PhotonNetwork.Instantiate("Nickname", player.transform.position, Quaternion.identity);
        //nickName.GetComponent<Text>().text = PhotonNetwork.NickName;
        //Nickname nn = nickName.GetComponent<Nickname>();
        //nn.target = player.transform;
        //nn.camera = characterCamera.GetComponent<Camera>();
    }

    private void SetVoiceChat()
    {
        voiceManager.channelName = PhotonNetwork.CurrentRoom.Name;
        voiceManager.JoinChannel();
    }

    public override void OnJoinRoomFailed(short returnCode, string message)
    {
        Debug.Log("on join room failed");

        isFullRoomAlert.SetActive(true);
        PhotonNetwork.JoinLobby();
    }

    public void LeaveRoom()
    {
        if (PhotonNetwork.InRoom)
        {
            PhotonNetwork.LeaveRoom();
        }
        VoiceManager.instance.LeaveVoiceChat();
        PhotonNetwork.Disconnect();
        Application.Quit();
        Exit();
    }

    public override void OnPlayerLeftRoom(Player otherPlayer)
    {
        photonView.RPC("SetPlayerList", RpcTarget.All);
    }

    private void OnDestroy()
    {
        if (PhotonNetwork.InRoom)
        {
            PhotonNetwork.LeaveRoom();
        }
    }
}