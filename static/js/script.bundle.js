!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o,i=function(){var e=this;this.init=function(){var t=document.documentElement.clientWidth,n=document.documentElement.clientHeight;-1!==window.navigator.userAgent.search(e.regexp)||t<n?e.isMobile=!0:e.isMobile=!1,e.responsiveManage()},this.responsiveManage=function(){var t=document.getElementById("icosahedron");!0===e.isMobile?t.setAttribute("radius",1.25):t.setAttribute("radius",1.5)},this.ua=navigator.userAgent,this.regexp=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i},r=function(){function e(){this.hideLoading=function(){var e=document.getElementById("loading");document.getElementById("loading-txt").style.display="none",e.classList.add("js-up")},this.classNameActive="is-active"}return e.prototype.activateDOM=function(e){e.classList.add(this.classNameActive)},e.prototype.deactivateDOM=function(e){e.classList.remove(this.classNameActive)},e}(),a=function(){var e=this;this.sceneFlag=!1,this.sceneControllOn=function(){e.defaultCamera.setAttribute("camera","active",!1),e.secondCamera.setAttribute("camera","active",!0),e.secondCamera.emit("foo"),e.sky.setAttribute("opacity",0)},this.sceneControllOff=function(){e.defaultCamera.setAttribute("camera","active",!0),e.secondCamera.setAttribute("camera","active",!1),e.sky.setAttribute("opacity",1)},this.sky=document.getElementById("sky"),this.defaultCamera=document.getElementById("default-camera"),this.secondCamera=document.getElementById("second-camera")},c=function(){this.setup=function(e){var t,n,o,i,r,c,s=new a;t=document.getElementById("outer"),n=document.querySelectorAll(".scroll-anchor"),o=document.getElementById("bg-anchor1"),i=o.offsetTop,c=document.querySelector(".a-canvas"),t.onscroll=function(){r=t.scrollTop,n.forEach((function(e){e.offsetTop<r+600&&e.classList.add("is-scrollin")})),i<r+650&&r<1800?c.classList.add("bg-flag1"):c.classList.remove("bg-flag1"),!0===e?r>1700&&r<2e3?s.sceneControllOn():r<1700&&s.sceneControllOff():r>2100&&r<2300?s.sceneControllOn():r<2100&&s.sceneControllOff()}}},s=function(){this.setup=function(){for(var e,t,n=document.getElementById("obj-wrapper"),o=["#ffb6b9","#beebe9","#FDFB82","#9debe7"],i=0;i<70;i++){(e=document.createElement("a-icosahedron")).setAttribute("radius",1.25),t=o[Math.floor(Math.random()*o.length)],e.setAttribute("color",t),e.setAttribute("position",{x:60*Math.random()-30,y:20*Math.random()-10,z:60*Math.random()-30});var r=7e3*Math.random()+3e3;e.setAttribute("animation","property: rotation; from: 0 0 0; to: 360 360 0; dur:"+r+"; loop: true; easing: linear"),n.appendChild(e)}}},l=new i,u=new r,d=new c,f=new s;window.addEventListener("load",(function(){l.init(),u.hideLoading(),f.setup(),d.setup(l.isMobile),m()}));var m=function(){var e="STATEMENT　どれだけ傷つき、ひとりで、怖くなっても　希望の全てを捨てない在り方をさがす　世界をすこしだけ味方にするプロダクトを考える　サハルプロダクツ　";o=document.getElementById("statement__circle");for(var t=0;t<e.length;t++){var n=document.createElement("div");n.className="element",n.textContent=e[t],o.appendChild(n);n.style.width="".concat(30,"px"),n.style.height="".concat(30,"px");var i=360/e.length*t,r=o.clientWidth/2,a=o.clientWidth/2-15,c=o.clientHeight/2-15,s=Math.cos((i-90)*Math.PI/180)*r+a,l=Math.sin((i-90)*Math.PI/180)*r+c;n.style.left="".concat(s,"px"),n.style.top="".concat(l,"px"),n.style.transform="rotate(".concat(i,"deg)")}};window.addEventListener("resize",(function(){l.init(),function(e){e.querySelectorAll(".element").forEach((function(e){e.remove()}))}(o),m()}),!1)}]);