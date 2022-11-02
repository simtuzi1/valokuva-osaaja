require ('@mediapipe/face_mesh');
require ('@tensorflow/tfjs-core');
// Register WebGL backend.
//
require ('@tensorflow/tfjs-backend-webgl');
const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');

const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: './node_modules/@mediapipe/face_mesh'
};
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
// const { Canvas, Image, ImageData, faceDetectionNet, faceDetectionOptions} = canvas
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData})
async function run(filePath) {
  const input = new Image();
  input.src = './download.jpg';
  detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
  const estimationConfig = {flipHorizontal: false};
  const faces = await detector.estimateFaces(input, estimationConfig);
  console.log(faces);
}
module.exports = {
  run : run
};
