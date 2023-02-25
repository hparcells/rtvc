# rtvc
> Realtime voice cloning using ElevenLabs's API.

[https://rtvc.hunterparcells.com/](https://rtvc.hunterparcells.com/)

## Disclaimer
This project was largely thrown together in a single afternoon, ~~the UI at the moment is very crude~~ and many things may be still unoptimized.

There are probably many other *better* solutions that exist than this project, such as dedicated voice changer applications or ones for instant voice cloning, but I thought this would be interesting to make. 

## Requirements
- A browser that supports the Web Speech API. **Chrome Desktop** is recommended
- A subscription to [ElevenLabs](http://www.elevenlabs.io/). Traditionally this is **$5/month** but they currently have an offer for $1 for your first month.
- If you plan to play the audio through a microphone, I use [VoiceMeeter](https://vb-audio.com/Voicemeeter/) to route my desktop audio to a **virtual mic output**.

# Running
1. Clone or download this repository.
2. Install needed dependencies with `npm i` with [Node.js](https://nodejs.org/).
3. Build the app using `npm run build`.
4. Run using `npm start`.
