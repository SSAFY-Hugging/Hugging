using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class CounselPlace : SerializableDictionary<string, GameObject> { }

public class PlaceManager : MonoBehaviour {

    public static PlaceManager instance;
    public CounselPlace placeObjct;
    public CounselPlace placePos;

    private void Awake()
    {
        instance = this;
    }

    public void SetPlace(string subject)
    {
        placeObjct.GetValueOrDefault(subject).SetActive(true);
        Camera.main.transform.position = placePos.GetValueOrDefault(subject).transform.position;
    }
}