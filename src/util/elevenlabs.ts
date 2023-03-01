import axios from 'axios';

import { ISubscription, IVoice } from '@/types/elevenlabs';

/**
 * Fetches the voices the user has access to.
 * @param apiKey ElevenLabs API key.
 * @returns An array of voices.
 */
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
 * @param apiKey ElevenLabs API key.
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

/**
 * Fetches user subscription information from their API key.
 * @param apiKey ElevenLabs API key.
 * @returns User subscription information.
 */
export async function getSubscriptionInfo(apiKey: string): Promise<ISubscription> {
  const { data } = await axios.get('https://api.elevenlabs.io/v1/user/subscription', {
    headers: {
      'xi-api-key': apiKey
    }
  });
  return data;
}
