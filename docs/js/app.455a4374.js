(function(e){function t(t){for(var a,c,i=t[0],o=t[1],u=t[2],f=0,d=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(l,c)&&l[c]&&d.push(l[c][0]),l[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);s&&s(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var o=n[i];0!==l[o]&&(a=!1)}a&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},l={app:0},r=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var s=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),l=(n("b0c0"),{class:"d-flex justify-content-center"}),r={class:"border",ref:"canvas",style:{width:"40rem",height:"20rem"}},c={class:"form-horizontal"},i=Object(a["e"])("label",{class:"form-lable",for:"waveColor"},"波形颜色：",-1),o=Object(a["e"])("br",null,null,-1),u=["src"],s=Object(a["e"])("br",null,null,-1),f=Object(a["e"])("br",null,null,-1),d={class:"form-check"},y=Object(a["e"])("label",{class:"form-check-label",for:"listCycle"}," 列表循环 ",-1),b=Object(a["e"])("i",{class:"bi bi-list-ol"},null,-1),p=[b],v={key:0,class:"list-group"},h=["onClick"];function j(e,t,n,b,j,O){return Object(a["g"])(),Object(a["d"])("div",l,[Object(a["e"])("div",null,[Object(a["e"])("div",null,[Object(a["e"])("canvas",r,null,512)]),Object(a["e"])("form",c,[i,Object(a["n"])(Object(a["e"])("input",{id:"waveColor",type:"color",class:"form-control-inline","onUpdate:modelValue":t[0]||(t[0]=function(t){return e.waveColor=t})},null,512),[[a["m"],e.waveColor]])]),o,Object(a["e"])("div",null,[Object(a["e"])("audio",{ref:"player",controls:"",src:e.currentPlay.src,onEnded:t[1]||(t[1]=function(t){return e.playEnd()})},null,40,u)]),s,Object(a["e"])("div",null,[Object(a["e"])("input",{ref:"fileInput",class:"form-control",type:"file",accept:".mp3,.wav,.flac",onChange:t[2]||(t[2]=function(){return e.fileUpload&&e.fileUpload.apply(e,arguments)})},null,544)]),f,Object(a["e"])("div",null,[Object(a["e"])("div",d,[Object(a["n"])(Object(a["e"])("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.listCycle=t}),id:"listCycle"},null,512),[[a["l"],e.listCycle]]),y]),Object(a["e"])("a",{class:"btn btn-secondary",onClick:t[4]||(t[4]=function(t){return e.playListButtonClick()})},p),e.showPlayList?(Object(a["g"])(),Object(a["d"])("ul",v,[(Object(a["g"])(!0),Object(a["d"])(a["a"],null,Object(a["j"])(e.playList,(function(t,n){return Object(a["g"])(),Object(a["d"])("li",{key:t.index,style:Object(a["f"])({color:e.currentPlay==n?"red":"black"}),class:"list-group-item",onClick:function(t){return e.playListClick(n)}},Object(a["k"])(t.name),13,h)})),128))])):Object(a["c"])("",!0)])])])}var O=n("d4ec"),C=n("bee2"),m=n("262e"),w=n("2caf"),g=(n("d3b7"),n("5cc6"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("c740"),n("3ca3"),n("ddb0"),n("2b3d"),n("9ab4")),k=n("ce1f"),x=function(e){Object(m["a"])(n,e);var t=Object(w["a"])(n);function n(){var e;return Object(O["a"])(this,n),e=t.apply(this,arguments),e.waveColor="#0080FF",e.listCycle=!0,e.currentPlay=0,e.playList=[],e.showPlayList=!0,e}return Object(C["a"])(n,[{key:"mounted",value:function(){this.player=this.$refs.player,this.canvas=this.$refs.canvas}},{key:"setCurrentAndPlay",value:function(e){var t=this;this.currentPlay=e,this.player.src=this.playList[e].url,setTimeout((function(){t.audioContext||(t.audioContext=new AudioContext,t.analySer=t.audioContext.createAnalyser(),t.analySer.fftSize=2048,t.audioSourceNode=t.audioContext.createMediaElementSource(t.player),t.audioSourceNode.connect(t.analySer),t.audioContext.createScriptProcessor,t.analySer.connect(t.audioContext.destination),t.waveData=new Uint8Array(t.analySer.frequencyBinCount),t.analySer.getByteFrequencyData(t.waveData),t.paintxWave(t.waveData),setInterval((function(){t.analySer.getByteFrequencyData(t.waveData),t.paintxWave(t.waveData)}),10)),t.player.play()}),1)}},{key:"playEnd",value:function(){this.listCycle&&this.playList.length&&this.setCurrentAndPlay((this.currentPlay+1)%this.playList.length)}},{key:"fileUpload",value:function(){var e=this.$refs.fileInput,t=e.files;if(t&&t.length){var n=t[0],a=this.playList.findIndex((function(e){return e.name==n.name})),l=0;if(-1!=a)l=a;else{var r=URL.createObjectURL(n);this.playList.push({name:n.name,url:r}),l=this.playList.length-1}this.setCurrentAndPlay(l)}}},{key:"playListClick",value:function(e){this.setCurrentAndPlay(e)}},{key:"playListButtonClick",value:function(){this.showPlayList=!this.showPlayList}},{key:"paintxWave",value:function(e){var t=this.canvas.getContext("2d");if(t){var n=this.canvas.width,a=n/e.length,l=this.canvas.height;t.clearRect(0,0,n,l),t.moveTo(0,l/2),t.lineTo(n,l/2),t.lineWidth=1,t.stroke(),t.fillStyle=this.waveColor;for(var r=0;r<e.length;r++){var c=e[r]/255*l;t.fillRect(r*a,(l-c)/2,a,c)}}}}]),n}(k["b"]);x=Object(g["a"])([Object(k["a"])({})],x);var P=x;P.render=j;var L=P;n("ab8b"),n("3e48"),n("cd74");Object(a["b"])(L).mount("#app")}});
//# sourceMappingURL=app.455a4374.js.map