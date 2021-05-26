<template>
  <body>
    <div id="main">
      <video
        id="video"
        playsinline
        style="
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          width: auto;
          height: auto;
        "
      ></video>
      <canvas id="output"></canvas>
      <div id="description">
        <div id="description-title">Blazeface demo</div>
        <p>
          This demo shows the blazeface model detecting faces in a live camera
          feed. The demo renders a semi-transparent red box over faces, and blue
          dots over facial landmarks (eyes, ears, nose, and mouth).
        </p>
      </div>
      <video
        id="video"
        playsinline
        style="
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          visibility: hidden;
          width: auto;
          height: auto;
        "
      ></video>
    </div>
  </body>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>
<script src="index.js"></script>
<script>
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs-core";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
export default {
  mounted() {
    tfjsWasm.setWasmPaths(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
    );

    const stats = new Stats();
    stats.showPanel(0);
    document.body.prepend(stats.domElement);

    let model, ctx, videoWidth, videoHeight, video, canvas;

    const state = {
      backend: "wasm",
    };

    const gui = new dat.GUI();
    gui
      .add(state, "backend", ["wasm", "webgl", "cpu"])
      .onChange(async (backend) => {
        await tf.setBackend(backend);
      });

    async function setupCamera() {
      video = document.getElementById("video");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user" },
      });
      video.srcObject = stream;

      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });
    }

    const renderPrediction = async () => {
      stats.begin();

      const returnTensors = false;
      const flipHorizontal = true;
      const annotateBoxes = true;
      const predictions = await model.estimateFaces(
        video,
        returnTensors,
        flipHorizontal,
        annotateBoxes
      );

      if (predictions.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < predictions.length; i++) {
          if (returnTensors) {
            predictions[i].topLeft = predictions[i].topLeft.arraySync();
            predictions[i].bottomRight = predictions[i].bottomRight.arraySync();
            if (annotateBoxes) {
              predictions[i].landmarks = predictions[i].landmarks.arraySync();
            }
          }

          const start = predictions[i].topLeft;
          const end = predictions[i].bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];
          ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          ctx.fillRect(start[0], start[1], size[0], size[1]);

          if (annotateBoxes) {
            const landmarks = predictions[i].landmarks;

            ctx.fillStyle = "blue";
            for (let j = 0; j < landmarks.length; j++) {
              const x = landmarks[j][0];
              const y = landmarks[j][1];
              ctx.fillRect(x, y, 5, 5);
            }
          }
        }
      }

      stats.end();

      requestAnimationFrame(renderPrediction);
    };

    const setupPage = async () => {
      await tf.setBackend(state.backend);
      await setupCamera();
      video.play();

      videoWidth = video.videoWidth;
      videoHeight = video.videoHeight;
      video.width = videoWidth;
      video.height = videoHeight;

      canvas = document.getElementById("output");
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

      model = await blazeface.load();

      renderPrediction();
    };

    setupPage();
  },
};
</script>

<style>
body {
  margin: 25px;
}

#main {
  position: relative;
  margin: 50px 0;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

#description {
  margin-top: 20px;
  width: 600px;
}

#description-title {
  font-weight: bold;
  font-size: 18px;
}
</style>
