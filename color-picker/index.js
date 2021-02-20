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
};

const initVideoAsync = (status) => {
  video = document.getElementById("video");
  video.addEventListener("loadedmetadata", adjustVideoSize);

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
      width: windowWidth,
      height: windowHeight,
      // height: { min: 720, max: 1080 },
      // width: { min: 1280, max: 1920 },
      // height: { min: 720, max: 1080 },
    },
  };
};

const adjustVideoSize = () => {
  videoWidth = video.videoWidth;
  videoHeight = video.videoHeight;

  let videoAspect = videoWidth / videoHeight;
  let windowAspect = windowWidth / windowHeight;

  if (windowAspect < videoAspect) {
    let newWidth = videoAspect * windowHeight;
    video.style.width = newWidth + "px";
    video.style.marginLeft = -(newWidth - windowWidth) / 2 + "px";
    video.style.height = windowHeight + "px";
    video.style.marginTop = "0px";
  } else {
    let newHeight = 1 / (videoAspect / windowWidth);
    video.style.height = newHeight + "px";
    video.style.marginTop = -(newHeight - windowHeight) / 2 + "px";
    video.style.width = windowWidth + "px";
    video.style.marginLeft = "0px";
  }
};

const canvasUpdate = () => {
  canvas = document.getElementById("canvas");
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  context = canvas.getContext("2d");
  context.beginPath();
  let arcRadius = windowWidth / 2 - 10;
  arcWidth = arcRadius * 2;
  if (!isFirst) setArcStyle();
  isFirst = true;
  context.arc(
    windowWidth / 2,
    windowHeight / 3,
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
  let y = windowHeight / 2 - arcWidth / 3;
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
    // colorModal.style.background = currentColorCode;
    headerText.classList.remove("is-hidden");
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
  // newArc.style.bottom = 0;
  // newArc.style.left = "50%";
  // newArc.style.transform = "translateX(-50%)";
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

window.addEventListener("resize", () => {
  adjustVideoSize();
});
