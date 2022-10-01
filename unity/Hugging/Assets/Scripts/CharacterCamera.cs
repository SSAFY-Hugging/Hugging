using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;

public class CharacterCamera : MonoBehaviourPun
{
    public GameObject player;
    private float offsetX = 0;
    private float offsetY = 8f;
    private float offsetZ = -11f;

    private float xRotateMove;

    private void Start()
    {
        if(!photonView.IsMine) {
            gameObject.SetActive(false);
            return;
        }
        transform.rotation = Quaternion.Euler(player.transform.rotation.x + 25, player.transform.rotation.y, player.transform.rotation.z);
    }

    private void FixedUpdate()
    {
        if (!photonView.IsMine) return;
        follow();
    }

    private void follow() {
        transform.position = new Vector3(player.transform.position.x + offsetX, player.transform.position.y + offsetY, player.transform.position.z + offsetZ);
    }
}
