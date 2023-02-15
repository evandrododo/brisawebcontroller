import React, { useEffect } from 'react'
import './App.css'
import Node from './Node'
import * as videocontext from 'videocontext'




function App() {

  useEffect(() => {
    // Put variables in  scope to make them available to the browser console.
    const video = document.querySelector('video');
    const constraints = {
      audio: false,
      video: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log(`Using video device: ${videoTracks[0].label}`);
        stream.onremovetrack = () => {
          console.log('Stream ended');
        };
        video.srcObject = stream;
      })
      .catch((error) => {
        if (error.name === 'ConstraintNotSatisfiedError') {
          console.error(
            `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
          );
        } else if (error.name === 'PermissionDeniedError') {
          console.error(
            'Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.'
          );
        } else {
          console.error(`getUserMedia error: ${error.name}`, error);
        }
      });

    const canvas = document.getElementById('graph-canvas') as HTMLCanvasElement
    const videoContext = new videocontext(canvas)
    // attach the camera to videonode
    const videoNodeCamera = videoContext.video(video)

    const videoNodeCaldo = videoContext.video('./caldoluquita2.mp4')
    videoNodeCaldo.start(9)
    videoNodeCaldo.stop(19)

    var crossFade = videoContext.transition(videocontext.DEFINITIONS.CROSSFADE);
    crossFade.transition(9, 10, 0.0, 1.0, "mix");

    videoNodeCamera.connect(crossFade);
    videoNodeCaldo.connect(crossFade);
    crossFade.connect(videoContext.destination);

    videoContext.play()
  }, [])

  return (
    <div className="App">
      <video autoPlay playsInline></video>
      <canvas id="graph-canvas" width="1024" height="768"></canvas>
      <h1>Controladora de brisas</h1>
      <Node title="video">
      </Node>
      <Node title="shader">
        shader
      </Node>

      <Node title="todo">
        <ol>
          <li><s>Drag & Drop</s></li>
          <li>Video</li>
          <li>video final</li>
          <li>conector para input</li>
          <li>popup de video em nova janela</li>
          <li>filtro shader</li>
        </ol>
      </Node>
    </div>
  )
}

export default App
