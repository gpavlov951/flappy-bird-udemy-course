!function(e){function t(t){for(var s,o,a=t[0],c=t[1],h=t[2],l=0,u=[];l<a.length;l++)o=a[l],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&u.push(n[o][0]),n[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);for(p&&p(t);u.length;)u.shift()();return r.push.apply(r,h||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],s=!0,a=1;a<i.length;a++){var c=i[a];0!==n[c]&&(s=!1)}s&&(r.splice(t--,1),e=o(o.s=i[0]))}return e}var s={},n={0:0},r=[];function o(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=s,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(i,s,function(t){return e[t]}.bind(null,s));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var p=c;r.push([1,1]),i()}([,function(e,t,i){"use strict";i.r(t);var s=i(0);class n extends s.Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[this.config.width/2,this.config.height/2],this.fontSize=32,this.fontOptions={fontSize:this.fontSize+"px",fill:"#FFF"},this.lineHeight=42}create(){this.add.image(0,0,"sky").setOrigin(0)}createMenu(e,t){let i=0;e.forEach((e=>{const s=this.screenCenter[0],n=this.screenCenter[1]+i;e.textGameObject=this.add.text(s,n,e.text,this.fontOptions).setOrigin(.5,2),i+=this.lineHeight,t(e)}))}}const r=()=>localStorage.getItem("bestScore")||0,o=e=>"Score: "+e,a=e=>"Best score: "+e;class c extends s.Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/sky.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pipe","assets/pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const{width:h,height:p}=window.screen,l={width:600>h?h:600,height:600,startPosition:{x:60,y:300}},u=[c,class extends n{constructor(e){super("ScoreScene",e)}create(){super.create();const e=r();this.add.text(...this.screenCenter,a(e),this.fontOptions).setOrigin(.5),this.createBackButton()}createBackButton(){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",this.onBackButton,this),this.input.keyboard.on("keydown_ESC",this.onBackButton,this),this.input.keyboard.on("keydown_BACKSPACE",this.onBackButton,this)}onBackButton(){this.scene.start("MenuScene")}},class extends n{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"}]}create(){super.create(),this.createMenu(this.menu,(e=>this.setupMenuEvents(e)))}setupMenuEvents(e){const t=e.textGameObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{this.scene.start(e.scene)}))}},class extends n{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.flapVelocity=300,this.score=0,this.scoreText="",this.currentDifficulty="",this.difficulties={easy:{pipeHorizontalDistanceRange:[300,350],pipeVerticalDistanceRange:[150,200]},normal:{pipeHorizontalDistanceRange:[280,330],pipeVerticalDistanceRange:[140,190]},hard:{pipeHorizontalDistanceRange:[250,310],pipeVerticalDistanceRange:[120,170]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.handleInputs(),this.listenToEvents(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:8,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in: "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(2).setOrigin(0),this.bird.body.gravity.y=600,this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0,this.scoreText=this.add.text(16,16,o(this.score),{fontSize:"32px",fill:"#00000"});const e=r();this.add.text(16,52,a(e),{fontSize:"18px",fill:"#00000"})}createPause(){this.isPaused=!1;this.add.image(this.config.width-10,this.config.height-10,"pause").setOrigin(1).setScale(2).setInteractive().on("pointerdown",this.onPause,this)}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this),this.input.keyboard.on("keydown_ESC",this.onPause,this)}onPause(){this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}placePipe(e,t){const i=this.difficulties[this.currentDifficulty],s=this.getRightMostPipe(),n=Phaser.Math.Between(...i.pipeVerticalDistanceRange),r=Phaser.Math.Between(20,this.config.height-20-n),o=Phaser.Math.Between(...i.pipeHorizontalDistanceRange);e.x=s+o,e.y=r,t.x=e.x,t.y=e.y+n}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((t=>{e=Math.max(t.x,e)})),e}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&e.push(t)})),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore(),this.increaseDifficulty())}increaseDifficulty(){const e=r(),t=e?Math.floor(.5*e):20,i=e?Math.floor(.8*e):40;this.score===t&&(this.currentDifficulty="normal"),this.score===i&&(this.currentDifficulty="hard")}flap(){this.isPaused||(this.bird.body.velocity.y=-this.flapVelocity)}increaseScore(){this.score++,this.scoreText.setText(o(this.score))}saveBestScore(){const e=r(),t=e&&parseInt(e,10);(!t||this.score>t)&&(e=>{localStorage.setItem("bestScore",e)})(this.score)}gameOver(){this.physics.pause(),this.bird.setTint(16711680),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>this.scene.restart(),loop:!1})}},class extends n{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,(e=>this.setupMenuEvents(e))),this.input.keyboard.on("keydown_SPACE",this.onContinue,this)}setupMenuEvents(e){const t=e.textGameObject;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{"Continue"===e.text&&this.onContinue(),"Exit"===e.text&&(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}onContinue(){this.scene.stop(),this.scene.resume("PlayScene")}}],d=e=>new e(l),f={type:s.AUTO,...l,pixelArt:!0,physics:{default:"arcade"},scene:(e=>e.map(d))(u)};new s.Game(f)}]);