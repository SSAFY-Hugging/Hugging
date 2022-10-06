using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BgmManager : MonoBehaviour
{
    private bool isPaused = false;
    private AudioSource audioSource;

    private void Awake()
    {
        audioSource = GetComponent<AudioSource>();
    }

    void Update()
    {
        if(isPaused)
        {
            audioSource.Stop();
        } else if(!isPaused && !audioSource.isPlaying)
        {
            audioSource.Play();
        }
    }

    private void OnApplicationFocus(bool focus)
    {
        isPaused = !focus;
    }

    private void OnApplicationPause(bool pause)
    {
        isPaused = pause;
    }

    private void OnApplicationQuit()
    {
        isPaused = true;
    }
}
