import React, { useState } from 'react';

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  let mediaRecorder;
  let chunks = [];

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.ondataavailable = event => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const audioURL = URL.createObjectURL(blob);
          setAudioURL(audioURL);
        };
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h2>Voice Recorder</h2>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
};

export default Recorder;

