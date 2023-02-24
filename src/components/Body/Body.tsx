'use client';

import 'regenerator-runtime';

import axios from 'axios';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import classes from './Body.module.scss';

function Body() {
  const [apiKey, setApiKey] = useState<string>('');
  const [voices, setVoices] = useState<any[]>(null as any);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [audio, setAudio] = useState<string>('');

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    (async () => {
      if (apiKey !== '') {
        try {
          const { data } = await axios.get('https://api.elevenlabs.io/v1/voices', {
            headers: {
              'xi-api-key': apiKey
            }
          });
          setVoices(data.voices);
        } catch {
          setVoices(null as any);
          setSelectedVoice(null as any);
        }
      }
    })();
  }, [apiKey]);

  async function getAndPlayAudio(text: string) {
    if (apiKey) {
      const { data } = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${
          voices.filter((voice) => {
            return voice.name === selectedVoice;
          })[0].voice_id
        }`,
        {
          text,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75
          }
        },
        {
          headers: {
            'xi-api-key': apiKey
          },
          responseType: 'blob'
        }
      );
      const audioUrl = window.URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' }));
      new Audio(audioUrl).play();
    }
  }

  useEffect(() => {
    (async () => {
      if (!listening && transcript !== '' && apiKey !== '' && selectedVoice !== '') {
        await getAndPlayAudio(transcript);
        resetTranscript();
      }
      SpeechRecognition.startListening();
    })();
  }, [listening]);

  async function startListening() {
    await SpeechRecognition.startListening();
  }
  async function stopListening() {
    setAudio('');
    SpeechRecognition.stopListening();

    resetTranscript();
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <form>
          <label htmlFor='apiKey'>ElevenLabs API Key</label>
          <input
            type='password'
            id='apiKey'
            name='apiKey'
            value={apiKey}
            onChange={(e) => {
              return setApiKey(e.target.value);
            }}
          />
          <br />
          <label htmlFor='voice'>Select a Voice</label>
          <select
            value={selectedVoice}
            onChange={(e) => {
              return setSelectedVoice(e.target.value);
            }}
          >
            {voices?.map((voice) => {
              return (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              );
            })}
          </select>
        </form>
        <p>Status: {listening ? 'ENABLED' : 'DISABLED'}</p>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default Body;
