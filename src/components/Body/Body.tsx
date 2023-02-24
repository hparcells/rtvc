'use client';

import 'regenerator-runtime';

import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { getAudio, getVoices } from '../../util/elevenlabs';

import classes from './Body.module.scss';

function Body() {
  const [apiKey, setApiKey] = useState<string>('');
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [audio, setAudio] = useState<string>('');

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    (async () => {
      if (apiKey.length === 32) {
        try {
          const voices = await getVoices(apiKey);
          setVoices(voices);
        } catch {
          setVoices([]);
          setSelectedVoice('');
        }
        return;
      }
      setVoices([]);
    })();
  }, [apiKey]);

  useEffect(() => {
    (async () => {
      if (!listening) {
        if (transcript !== '' && apiKey !== '' && selectedVoice !== '') {
          const audioUrl = await getAudio(selectedVoice, apiKey, transcript);
          new Audio(audioUrl).play();
        }
        resetTranscript();
        SpeechRecognition.startListening();
      }
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
          {voices?.length > 0 && (
            <>
              <label htmlFor='voice'>Select a Voice</label>
              <select
                value={selectedVoice}
                onChange={(e) => {
                  return setSelectedVoice(e.target.value);
                }}
              >
                {voices.map((voice) => {
                  return (
                    <option key={voice.name} value={voice.voice_id}>
                      {voice.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
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
