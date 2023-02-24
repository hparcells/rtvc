import axios from 'axios';

import { IVoice } from '@/types/elevenlabs';

export async function getVoices(apiKey: string): Promise<IVoice[]> {
  const { data } = await axios.get('https://api.elevenlabs.io/v1/voices', {
    headers: {
      'xi-api-key': apiKey
    }
  });
  return data.voices;
}

/**
 * Transcribes text using a given voice using the ElevenLabs API and returns a local URL.
 * @param voiceId The voice ID to generate from.
 * @param apiKey Your API key found in your ElevenLabs profile.
 * @param text The text to transcribe.
 * @returns A local URL to the audio file.
 */
export async function getAudio(voiceId: string, apiKey: string, text: string): Promise<string> {
  const { data } = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
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
  return window.URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' }));
}
