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

    private void OnApplicationFocus(bool focus)
    {
        isPaused = !focus;
        setAudioSourceState();
    }

    private void OnApplicationPause(bool pause)
    {
        isPaused = pause;
        setAudioSourceState();
    }

    private void OnApplicationQuit()
    {
        isPaused = true;
        setAudioSourceState();
    }

    private void setAudioSourceState()
    {
        if (isPaused)
        {
            audioSource.Stop();
        }
        else if (!isPaused)
        {
            audioSource.Play();
        }
    }
}
