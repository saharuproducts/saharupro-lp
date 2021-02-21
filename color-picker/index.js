let windowWidth = 0;
let windowHeight = 0;
let video = null;
let videoStream = null;
let videoInput = null;
let canvas = null;
let context = null;
let arcWidth = 0;
let arcHeight = 0;
let colorPreviewArc = null;
let currentColorCode = null;
let headerText = null;
let isFirst = false;
let isPC = false;
const cameraSize = { w: 1080, h: 1080 };

const initWindow = () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  document.body.style.minHeight = window.innerHeight + "px";
  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.enumerateDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    console.log("このブラウザには対応していません。");
  }
  if (
    navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile)/i) ||
    navigator.userAgent.match(/(iPad|(?!(Android.*Mobile)+)Android)/i)
  ) {
    return;
  } else {
    isPC = true;
    windowWidth = window.innerHeight / 2;
    windowHeight = window.innerHeight;
    canvas = document.querySelector("canvas");
    canvas.style.top = "10%";
    colorPreviewArc = document.getElementById("color-preview");
    colorPreviewArc.style.bottom = "10%";
    return;
  }
};

const initVideoAsync = (status) => {
  video = document.getElementById("video");
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      videoInput = devices.filter((device) => device.kind === "videoinput");
      getVideo(status.isFirst);
    })
    .catch(function (error) {});
};

const getVideo = (isFirst) => {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop());
  }
  navigator.mediaDevices
    .getUserMedia(setVideo())
    .then(function (stream) {
      console.log(stream);
      video.srcObject = stream;
      video.play();
      videoStream = stream;
      canvasUpdate();
      getColorFromCanvas();
      setInterval(() => {
        getColorFromCanvas();
      }, 100);
      if (isFirst) {
        isFinishInit.video = true;
      }
    })
    .catch(function (error) {});
};

const setVideo = () => {
  return {
    audio: false,
    video: {
      deviceId: videoInput,
      facingMode: "environment",
      // height: { min: 720, max: 1080 },
      // width: { min: 1280, max: 1920 },
      width: { ideal: 500 },
      height: { ideal: 500 },
    },
  };
};

const canvasUpdate = () => {
  canvas = document.getElementById("canvas");
  canvas.width = windowWidth;
  canvas.height = windowWidth;
  context = canvas.getContext("2d");
  context.beginPath();
  let arcRadius = windowWidth / 2 - 10;
  arcWidth = arcRadius * 2;
  if (!isFirst) setArcStyle();
  isFirst = true;
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    arcRadius,
    (0 * Math.PI) / 180,
    (360 * Math.PI) / 180
  );
  context.clip();
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(canvasUpdate);
};

const setArcStyle = () => {
  colorPreviewArc.style.width = arcWidth + "px";
  colorPreviewArc.style.height = arcWidth + "px";
};

const getColorFromCanvas = () => {
  let x = windowWidth / 2;
  let y;
  if (isPC) {
    y = windowHeight / 2 - arcWidth / 2;
  } else {
    y = windowHeight / 2 - arcWidth / 2 + arcWidth / 10;
  }
  let imagedata = context.getImageData(x, y, 1, 1);
  let r = imagedata.data[0];
  let g = imagedata.data[1];
  let b = imagedata.data[2];
  colorPreviewArc.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
  currentColorCode = rgbToHex([r, g, b]);
};

const rgbToHex = (rgb) => {
  return (
    "#" +
    rgb
      .map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
      })
      .join("")
  );
};

const initAtachTrigger = () => {
  colorPreviewArc = document.getElementById("color-preview");
  colorPreviewArc.addEventListener("click", () => {
    createArcInstance();
    showHeaderText();
  });
};

const showHeaderText = () => {
  const colorCodeText = document.getElementById("color-code-text");
  headerText = document.getElementById("header-text");
  if (currentColorCode) {
    colorCodeText.innerText = currentColorCode;
    headerText.classList.remove("is-hidden");
    navigator.clipboard.writeText(currentColorCode);
  }
  setTimeout(() => {
    hideHeaderText();
  }, 1000);
};

const hideHeaderText = () => {
  headerText.classList.add("is-hidden");
};

const createArcInstance = () => {
  const newArc = document.createElement("div");
  newArc.style.zIndex = 2;
  newArc.style.position = "fixed";
  newArc.style.borderRadius = "100rem";
  newArc.style.background = currentColorCode;
  newArc.style.width = arcWidth + "px";
  newArc.style.height = arcWidth + "px";
  newArc.classList.add("bound");
  colorPreviewArc.appendChild(newArc);
  setTimeout(() => {
    colorPreviewArc.removeChild(newArc);
  }, 1000);
};

window.addEventListener("load", () => {
  initWindow();
  initAtachTrigger();
  initVideoAsync({ isFirst: true });
});
