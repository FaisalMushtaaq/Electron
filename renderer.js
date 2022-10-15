// const {download} = require("electron-dl");
// // const {app, BrowserWindow, ipcMain} = require("electron");

const { app } = require('electron');
const NetworkSpeed = require('network-speed'); 
// const { download } = require("electron-dl");

// https://download.samplelib.com/mp4/sample-5s.mp4

const ipcRenderer = require('electron').ipcRenderer;
// // let window;
const setButton = document.getElementById('btn')
const url = document.getElementById('title')
setButton.addEventListener('click', () => {
    ipcRenderer.send("download", {
      url: url.value,
      properties: {directory: ""}
    });
});
ipcRenderer.on("download progress", (event, progress) => {
  console.log(progress); // Progress in fraction, between 0 and 1
  const progressInPercentages = progress * 100; // With decimal point and a bunch of numbers
  const cleanProgressInPercentages = Math.floor(progress * 100); // Without decimal point
  const titleInput = document.getElementById('downloadedFile');
  progress.transferredBytes = progress.transferredBytes/1000000;
  progress.totalBytes = progress.totalBytes/1000000;
  titleInput.innerText = progress.transferredBytes + " mb";
  const total = document.getElementById('total');
  total.innerText = progress.totalBytes + " mb";
  getNetworkDownloadSpeed(progress);
});
const testNetworkSpeed = new NetworkSpeed();

async function getNetworkDownloadSpeed(progress) {
  // const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
  // const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(url.value, progress.totalBytes);
  const total = document.getElementById('speed');
  total.innerText = speed.mbps + "MB/ sec";
  console.log("speed",speed);
}
// ipcRenderer.on("download complete", (event, file) => {
//     console.log(file); // Full file path
//     const titleInput = document.getElementById('progress');
//     titleInput.innerText = "download completed";
// });