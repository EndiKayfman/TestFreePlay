System.register("chunks:///_virtual/BridgePiece.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(i){var e,t,r,o,n,l,s,a,c,d,h;return{setters:[function(i){e=i.applyDecoratedDescriptor,t=i.inheritsLoose,r=i.initializerDefineProperty,o=i.assertThisInitialized},function(i){n=i.cclegacy,l=i._decorator,s=i.RigidBody,a=i.ERigidBodyType,c=i.Collider,d=i.BoxCollider,h=i.Component}],execute:function(){var u,y,p;n._RF.push({},"51a8fb4OdBHGI6XEIC3x1sp","BridgePiece",void 0);var g=l.ccclass,f=l.property;i("BridgePiece",g("BridgePiece")((p=e((y=function(i){function e(){for(var e,t=arguments.length,n=new Array(t),l=0;l<t;l++)n[l]=arguments[l];return e=i.call.apply(i,[this].concat(n))||this,r(e,"fallDelay",p,o(e)),e.rigidBody=null,e.hasFallen=!1,e}t(e,i);var n=e.prototype;return n.start=function(){this.rigidBody=this.getComponent(s),this.rigidBody&&(this.rigidBody.type=a.KINEMATIC,this.rigidBody.useGravity=!1);var i=this.getComponent(c);i&&i.on("onCollisionEnter",this.onCollisionEnter,this)},n.onCollisionEnter=function(i){var e=this,t=i.otherCollider;!this.hasFallen&&t.getComponent(d)&&(this.hasFallen=!0,this.scheduleOnce((function(){return e.fall()}),this.fallDelay))},n.fall=function(){this.rigidBody&&(this.rigidBody.type=a.DYNAMIC,this.rigidBody.useGravity=!0)},e}(h)).prototype,"fallDelay",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),u=y))||u);n._RF.pop()}}}));

System.register("chunks:///_virtual/CameraFollow.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,o,i,r,n,a,l,s,c;return{setters:[function(t){e=t.applyDecoratedDescriptor,o=t.inheritsLoose,i=t.initializerDefineProperty,r=t.assertThisInitialized},function(t){n=t.cclegacy,a=t._decorator,l=t.Node,s=t.Vec3,c=t.Component}],execute:function(){var p,u,f,h,d,g;n._RF.push({},"a836b1UPWlH4onWB9nGBC/U","CameraFollow",void 0);var w=a.ccclass,y=a.property;t("CameraFollow",(p=w("CameraFollow"),u=y(l),p((d=e((h=function(t){function e(){for(var e,o=arguments.length,n=new Array(o),a=0;a<o;a++)n[a]=arguments[a];return e=t.call.apply(t,[this].concat(n))||this,i(e,"target",d,r(e)),i(e,"followSpeed",g,r(e)),e.offset=new s,e}o(e,t);var n=e.prototype;return n.onLoad=function(){this.target&&(this.offset=this.node.position.clone().subtract(this.target.position))},n.update=function(t){if(this.target){var e=this.target.position.clone().add(this.offset),o=this.node.position.clone().lerp(e,t*this.followSpeed);this.node.setPosition(o)}},e}(c)).prototype,"target",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g=e(h.prototype,"followSpeed",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),f=h))||f));n._RF.pop()}}}));

System.register("chunks:///_virtual/CarController.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,i,r,n,o,a,l,s,h;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,r=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,l=e.Node,s=e.Quat,h=e.Component}],execute:function(){var u,c,p,f,d,R,g,W,b,w,y,m;o._RF.push({},"8637aDxuHdF45rqdN39XnD2","CarController",void 0);var L=a.ccclass,v=a.property;e("CarController",(u=L("CarController"),c=v(l),p=v(l),f=v(l),d=v(l),u((W=t((g=function(e){function t(){for(var t,i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return t=e.call.apply(e,[this].concat(o))||this,r(t,"frontLeftWheel",W,n(t)),r(t,"frontRightWheel",b,n(t)),r(t,"rearLeftWheel",w,n(t)),r(t,"rearRightWheel",y,n(t)),r(t,"wheelRadius",m,n(t)),t.speed=0,t.acceleration=0,t.maxSpeed=30,t.wheelRotation=0,t.baseRotation=new s,t.isStopping=!1,t.deceleration=7,t}i(t,e);var o=t.prototype;return o.onLoad=function(){this.frontLeftWheel&&this.baseRotation.set(this.frontLeftWheel.rotation)},o.update=function(e){this.isStopping?(this.speed-=this.deceleration*e,this.speed<=0&&(this.speed=0)):this.speed+=3*this.acceleration*e,this.speed=Math.max(0,Math.min(this.maxSpeed,this.speed));var t=this.node.position;this.node.setPosition(t.x+this.speed*e,t.y,t.z),this.rotateWheels(e)},o.rotateWheels=function(e){if(!(this.wheelRadius<=0)){var t=2*Math.PI*this.wheelRadius,i=this.speed/t*360*e;this.wheelRotation+=i;var r=new s;s.fromEuler(r,0,this.wheelRotation,0);var n=new s;s.multiply(n,this.baseRotation,r),this.frontLeftWheel&&this.frontLeftWheel.setRotation(n),this.frontRightWheel&&this.frontRightWheel.setRotation(n),this.rearLeftWheel&&this.rearLeftWheel.setRotation(n),this.rearRightWheel&&this.rearRightWheel.setRotation(n)}},o.setAcceleration=function(e){this.acceleration=5*e},o.stopCar=function(){this.isStopping=!0},t}(h)).prototype,"frontLeftWheel",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=t(g.prototype,"frontRightWheel",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),w=t(g.prototype,"rearLeftWheel",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),y=t(g.prototype,"rearRightWheel",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),m=t(g.prototype,"wheelRadius",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),R=g))||R));o._RF.pop()}}}));

System.register("chunks:///_virtual/CarFinish.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(n){var o,r,e,i,t,a,l,c,s;return{setters:[function(n){o=n.applyDecoratedDescriptor,r=n.inheritsLoose,e=n.initializerDefineProperty,i=n.assertThisInitialized},function(n){t=n.cclegacy,a=n._decorator,l=n.Animation,c=n.Collider,s=n.Component}],execute:function(){var u,h,p,g,d;t._RF.push({},"a733bK9Q6FPAbIOhWy2cg9t","CarFinish",void 0);var f=a.ccclass,m=a.property;n("RoadFinish",(u=f("RoadFinish"),h=m(l),u((d=o((g=function(n){function o(){for(var o,r=arguments.length,t=new Array(r),a=0;a<r;a++)t[a]=arguments[a];return o=n.call.apply(n,[this].concat(t))||this,e(o,"carAnimation",d,i(o)),o}r(o,n);var t=o.prototype;return t.onLoad=function(){var n=this.getComponent(c);n?(n.on("onTriggerEnter",this.onTriggerEnter,this),console.log("������� ���������������")):console.error("��������� �� ������ �� ������� RoadFinish")},t.onTriggerEnter=function(n){console.log("������ "+n.otherCollider.node.name+" �������� ������"),"Car"===n.otherCollider.node.name&&(console.log("������ �������� ������!"),this.carAnimation?(this.carAnimation.play(),console.log("�������� ��������!")):console.warn("�������� �� �������!"))},o}(s)).prototype,"carAnimation",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),p=g))||p));t._RF.pop()}}}));

System.register("chunks:///_virtual/Coin.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var n,o,e,i,r,a,s,c,l,u,h,p,d,C,f;return{setters:[function(t){n=t.applyDecoratedDescriptor,o=t.inheritsLoose,e=t.initializerDefineProperty,i=t.assertThisInitialized},function(t){r=t.cclegacy,a=t._decorator,s=t.Node,c=t.Collider,l=t.find,u=t.UITransform,h=t.Quat,p=t.tween,d=t.Label,C=t.Vec3,f=t.Component}],execute:function(){var g,m,v,I,y,U;r._RF.push({},"f83b7rK+ZhOP7dxLYNmTYnz","Coin",void 0);var P=a.ccclass,b=a.property;t("Coin",(g=P("Coin"),m=b(s),g(((U=function(t){function n(){for(var n,o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return n=t.call.apply(t,[this].concat(r))||this,e(n,"coinUI",y,i(n)),n.targetPos=new C,n.rotationSpeed=200,n}o(n,t);var r=n.prototype;return r.start=function(){var t=this.getComponent(c);(t&&t.on("onTriggerEnter",this.onCollect,this),l("Canvas")&&this.coinUI)&&(this.coinUI.getComponent(u)&&(this.targetPos=this.coinUI.worldPosition.clone()))},r.update=function(t){var n=this.node.rotation,o=new h;h.rotateY(o,n,this.rotationSpeed*t*(Math.PI/180)),this.node.setRotation(o)},r.onCollect=function(t){"Car"===t.otherCollider.node.name&&(this.incrementCoinCount(),this.animateToUI())},r.animateToUI=function(){var t=this;this.getComponent(c).enabled=!1,p(this.node).to(.7,{worldPosition:this.targetPos},{easing:"quadInOut"}).call((function(){t.node.destroy()})).start()},r.incrementCoinCount=function(){n.coinCount+=1,this.updateUI()},r.updateUI=function(){var t,o=null==(t=l("Canvas/Coins/CoinCounter/"))?void 0:t.getComponent(d);o?o.string=""+n.coinCount:console.warn("Не найден Label для счётчика монет!")},n}(f)).coinCount=0,y=n((I=U).prototype,"coinUI",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),v=I))||v));r._RF.pop()}}}));

System.register("chunks:///_virtual/debug-view-runtime-control.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,o,i,n,s,l,r,a,g,h,p,c,C,d,m,u,L;return{setters:[function(t){e=t.applyDecoratedDescriptor,o=t.inheritsLoose,i=t.initializerDefineProperty,n=t.assertThisInitialized},function(t){s=t.cclegacy,l=t._decorator,r=t.Node,a=t.Canvas,g=t.UITransform,h=t.instantiate,p=t.Label,c=t.Color,C=t.RichText,d=t.Toggle,m=t.Button,u=t.director,L=t.Component}],execute:function(){var f,M,b,v,T,S,x,E,I;s._RF.push({},"b2bd1+njXxJxaFY3ymm06WU","debug-view-runtime-control",void 0);var A=l.ccclass,y=l.property;t("DebugViewRuntimeControl",(f=A("internal.DebugViewRuntimeControl"),M=y(r),b=y(r),v=y(r),f((x=e((S=function(t){function e(){for(var e,o=arguments.length,s=new Array(o),l=0;l<o;l++)s[l]=arguments[l];return e=t.call.apply(t,[this].concat(s))||this,i(e,"compositeModeToggle",x,n(e)),i(e,"singleModeToggle",E,n(e)),i(e,"EnableAllCompositeModeButton",I,n(e)),e._single=0,e.strSingle=["No Single Debug","Vertex Color","Vertex Normal","Vertex Tangent","World Position","Vertex Mirror","Face Side","UV0","UV1","UV Lightmap","Project Depth","Linear Depth","Fragment Normal","Fragment Tangent","Fragment Binormal","Base Color","Diffuse Color","Specular Color","Transparency","Metallic","Roughness","Specular Intensity","IOR","Direct Diffuse","Direct Specular","Direct All","Env Diffuse","Env Specular","Env All","Emissive","Light Map","Shadow","AO","Fresnel","Direct Transmit Diffuse","Direct Transmit Specular","Env Transmit Diffuse","Env Transmit Specular","Transmit All","Direct Internal Specular","Env Internal Specular","Internal All","Fog"],e.strComposite=["Direct Diffuse","Direct Specular","Env Diffuse","Env Specular","Emissive","Light Map","Shadow","AO","Normal Map","Fog","Tone Mapping","Gamma Correction","Fresnel","Transmit Diffuse","Transmit Specular","Internal Specular","TT"],e.strMisc=["CSM Layer Coloration","Lighting With Albedo"],e.compositeModeToggleList=[],e.singleModeToggleList=[],e.miscModeToggleList=[],e.textComponentList=[],e.labelComponentList=[],e.textContentList=[],e.hideButtonLabel=void 0,e._currentColorIndex=0,e.strColor=["<color=#ffffff>","<color=#000000>","<color=#ff0000>","<color=#00ff00>","<color=#0000ff>"],e.color=[c.WHITE,c.BLACK,c.RED,c.GREEN,c.BLUE],e}o(e,t);var s=e.prototype;return s.start=function(){if(this.node.parent.getComponent(a)){var t=this.node.parent.getComponent(g),e=.5*t.width,o=.5*t.height,i=.1*e-e,n=o-.1*o,s=this.node.getChildByName("MiscMode"),l=h(s);l.parent=this.node,l.name="Buttons";var r=h(s);r.parent=this.node,r.name="Titles";for(var u=0;u<2;u++){var L=h(this.EnableAllCompositeModeButton.getChildByName("Label"));L.setPosition(i+(u>0?450:150),n,0),L.setScale(.75,.75,.75),L.parent=r;var f=L.getComponent(p);f.string=u?"----------Composite Mode----------":"----------Single Mode----------",f.color=c.WHITE,f.overflow=0,this.labelComponentList[this.labelComponentList.length]=f}n-=20;for(var M=0,b=0;b<this.strSingle.length;b++,M++){b===this.strSingle.length>>1&&(i+=200,M=0);var v=b?h(this.singleModeToggle):this.singleModeToggle;v.setPosition(i,n-20*M,0),v.setScale(.5,.5,.5),v.parent=this.singleModeToggle.parent;var T=v.getComponentInChildren(C);T.string=this.strSingle[b],this.textComponentList[this.textComponentList.length]=T,this.textContentList[this.textContentList.length]=T.string,v.on(d.EventType.TOGGLE,this.toggleSingleMode,this),this.singleModeToggleList[b]=v}i+=200,this.EnableAllCompositeModeButton.setPosition(i+15,n,0),this.EnableAllCompositeModeButton.setScale(.5,.5,.5),this.EnableAllCompositeModeButton.on(m.EventType.CLICK,this.enableAllCompositeMode,this),this.EnableAllCompositeModeButton.parent=l;var S=this.EnableAllCompositeModeButton.getComponentInChildren(p);this.labelComponentList[this.labelComponentList.length]=S;var x=h(this.EnableAllCompositeModeButton);x.setPosition(i+90,n,0),x.setScale(.5,.5,.5),x.on(m.EventType.CLICK,this.changeTextColor,this),x.parent=l,(S=x.getComponentInChildren(p)).string="TextColor",this.labelComponentList[this.labelComponentList.length]=S;var E=h(this.EnableAllCompositeModeButton);E.setPosition(i+200,n,0),E.setScale(.5,.5,.5),E.on(m.EventType.CLICK,this.hideUI,this),E.parent=this.node.parent,(S=E.getComponentInChildren(p)).string="Hide UI",this.labelComponentList[this.labelComponentList.length]=S,this.hideButtonLabel=S,n-=40;for(var I=0;I<this.strMisc.length;I++){var A=h(this.compositeModeToggle);A.setPosition(i,n-20*I,0),A.setScale(.5,.5,.5),A.parent=s;var y=A.getComponentInChildren(C);y.string=this.strMisc[I],this.textComponentList[this.textComponentList.length]=y,this.textContentList[this.textContentList.length]=y.string,A.getComponent(d).isChecked=!!I,A.on(d.EventType.TOGGLE,I?this.toggleLightingWithAlbedo:this.toggleCSMColoration,this),this.miscModeToggleList[I]=A}n-=150;for(var D=0;D<this.strComposite.length;D++){var B=D?h(this.compositeModeToggle):this.compositeModeToggle;B.setPosition(i,n-20*D,0),B.setScale(.5,.5,.5),B.parent=this.compositeModeToggle.parent;var w=B.getComponentInChildren(C);w.string=this.strComposite[D],this.textComponentList[this.textComponentList.length]=w,this.textContentList[this.textContentList.length]=w.string,B.on(d.EventType.TOGGLE,this.toggleCompositeMode,this),this.compositeModeToggleList[D]=B}}else console.error("debug-view-runtime-control should be child of Canvas")},s.isTextMatched=function(t,e){var o=new String(t),i=o.search(">");return-1===i?t===e:(o=(o=o.substr(i+1)).substr(0,o.search("<")))===e},s.toggleSingleMode=function(t){for(var e=u.root.debugView,o=t.getComponentInChildren(C),i=0;i<this.strSingle.length;i++)this.isTextMatched(o.string,this.strSingle[i])&&(e.singleMode=i)},s.toggleCompositeMode=function(t){for(var e=u.root.debugView,o=t.getComponentInChildren(C),i=0;i<this.strComposite.length;i++)this.isTextMatched(o.string,this.strComposite[i])&&e.enableCompositeMode(i,t.isChecked)},s.toggleLightingWithAlbedo=function(t){u.root.debugView.lightingWithAlbedo=t.isChecked},s.toggleCSMColoration=function(t){u.root.debugView.csmLayerColoration=t.isChecked},s.enableAllCompositeMode=function(t){var e=u.root.debugView;e.enableAllCompositeMode(!0);for(var o=0;o<this.compositeModeToggleList.length;o++){this.compositeModeToggleList[o].getComponent(d).isChecked=!0}var i=this.miscModeToggleList[0].getComponent(d);i.isChecked=!1,e.csmLayerColoration=!1,(i=this.miscModeToggleList[1].getComponent(d)).isChecked=!0,e.lightingWithAlbedo=!0},s.hideUI=function(t){var e=this.node.getChildByName("Titles"),o=!e.active;this.singleModeToggleList[0].parent.active=o,this.miscModeToggleList[0].parent.active=o,this.compositeModeToggleList[0].parent.active=o,this.EnableAllCompositeModeButton.parent.active=o,e.active=o,this.hideButtonLabel.string=o?"Hide UI":"Show UI"},s.changeTextColor=function(t){this._currentColorIndex++,this._currentColorIndex>=this.strColor.length&&(this._currentColorIndex=0);for(var e=0;e<this.textComponentList.length;e++)this.textComponentList[e].string=this.strColor[this._currentColorIndex]+this.textContentList[e]+"</color>";for(var o=0;o<this.labelComponentList.length;o++)this.labelComponentList[o].color=this.color[this._currentColorIndex]},s.onLoad=function(){},s.update=function(t){},e}(L)).prototype,"compositeModeToggle",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),E=e(S.prototype,"singleModeToggle",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),I=e(S.prototype,"EnableAllCompositeModeButton",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),T=S))||T));s._RF.pop()}}}));

System.register("chunks:///_virtual/DownloadButton.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(o){var n,t,e,r,i,a,l,s;return{setters:[function(o){n=o.applyDecoratedDescriptor,t=o.inheritsLoose,e=o.initializerDefineProperty,r=o.assertThisInitialized},function(o){i=o.cclegacy,a=o._decorator,l=o.sys,s=o.Component}],execute:function(){var c,p,u,d;i._RF.push({},"4cfe3xopM9GAKpzQx2HSS6+","DownloadButton",void 0);var f=a.ccclass,h=a.property;o("DownloadButton",f("DownloadButton")((u=n((p=function(o){function n(){for(var n,t=arguments.length,i=new Array(t),a=0;a<t;a++)i[a]=arguments[a];return n=o.call.apply(o,[this].concat(i))||this,e(n,"androidUrl",u,r(n)),e(n,"iosUrl",d,r(n)),n}return t(n,o),n.prototype.openStore=function(){l.os===l.OS.ANDROID?window.open(this.androidUrl,"_blank"):l.os===l.OS.IOS?window.open(this.iosUrl,"_blank"):console.log("Unknown OS, no store redirection")},n}(s)).prototype,"androidUrl",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"https://play.google.com/store/games"}}),d=n(p.prototype,"iosUrl",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"https://apps.apple.com/ru/charts/iphone"}}),c=p))||c);i._RF.pop()}}}));

System.register("chunks:///_virtual/LeverControl.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var i,o,n,e,r,a,s,l;return{setters:[function(t){i=t.applyDecoratedDescriptor,o=t.inheritsLoose,n=t.initializerDefineProperty,e=t.assertThisInitialized},function(t){r=t.cclegacy,a=t._decorator,s=t.Node,l=t.Component}],execute:function(){var c,h,p,u,v;r._RF.push({},"f8cb8pF3wVGKofDwRYhQtw/","LeverControl",void 0);var f=a.ccclass,d=a.property;t("LeverControl",(c=f("LeverControl"),h=d(s),c((v=i((u=function(t){function i(){for(var i,o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return i=t.call.apply(t,[this].concat(r))||this,n(i,"car",v,e(i)),i.initialY=0,i.minY=-48,i.maxY=51,i}o(i,t);var r=i.prototype;return r.onLoad=function(){this.initialY=this.node.position.y,this.node.on(s.EventType.TOUCH_MOVE,this.onTouchMove,this)},r.onTouchMove=function(t){var i,o=t.getDelta(),n=this.node.position.y+o.y;n=Math.min(this.initialY+this.maxY,Math.max(this.initialY+this.minY,n)),this.node.setPosition(this.node.position.x,n,this.node.position.z);var e=(n-this.initialY)/this.maxY;null==(i=this.car.getComponent("CarController"))||i.setAcceleration(e)},i}(l)).prototype,"car",[h],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),p=u))||p));r._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./debug-view-runtime-control.ts","./BridgePiece.ts","./CameraFollow.ts","./CarController.ts","./CarFinish.ts","./Coin.ts","./DownloadButton.ts","./LeverControl.ts","./RoadFinish.ts","./WheelSensor.ts"],(function(){return{setters:[null,null,null,null,null,null,null,null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/RoadFinish.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,n,o,r,i,a,l,c,s,u,h,p,d;return{setters:[function(t){e=t.applyDecoratedDescriptor,n=t.inheritsLoose,o=t.initializerDefineProperty,r=t.assertThisInitialized},function(t){i=t.cclegacy,a=t._decorator,l=t.Animation,c=t.Node,s=t.Collider,u=t.tween,h=t.UIOpacity,p=t.Vec3,d=t.Component}],execute:function(){var y,f,g,m,v,w,b,B,C,F,R,O,T;i._RF.push({},"27820ZOIbJOh6VFlo7lKDhJ","RoadFinish",void 0);var z=a.ccclass,A=a.property;t("RoadFinish",(y=z("RoadFinish"),f=A(l),g=A(c),m=A(c),v=A(c),w=A(c),y((C=e((B=function(t){function e(){for(var e,n=arguments.length,i=new Array(n),a=0;a<n;a++)i[a]=arguments[a];return e=t.call.apply(t,[this].concat(i))||this,o(e,"carAnimation",C,r(e)),o(e,"failText",F,r(e)),o(e,"darkOverlay",R,r(e)),o(e,"downloadButton",O,r(e)),o(e,"retryButton",T,r(e)),e}n(e,t);var i=e.prototype;return i.onLoad=function(){var t=this.getComponent(s);t?(t.on("onTriggerEnter",this.onTriggerEnter,this),console.log("������� ���������������")):console.error("��������� �� ������ �� ������� RoadFinish")},i.onTriggerEnter=function(t){var e=this;console.log("������ "+t.otherCollider.node.name+" �������� ������"),"Car"===t.otherCollider.node.name&&(console.log("������ �������� ������!"),this.carAnimation?(this.carAnimation.play(),console.log("�������� ��������!")):console.warn("�������� �� �������!"),this.scheduleOnce((function(){e.showFailScreen()}),1.5));var n=t.otherCollider.node.getComponent("CarController");n&&n.stopCar()},i.showFailScreen=function(){var t=this;this.failText&&(this.failText.active=!0),this.darkOverlay&&u(this.darkOverlay.getComponent(h)).to(.5,{opacity:255}).start(),this.downloadButton&&u(this.downloadButton.getComponent(h)).to(.5,{opacity:0}).start(),this.retryButton&&(this.retryButton.active=!0,this.retryButton.setScale(new p(0,0,0)),u(this.retryButton).to(.5,{scale:new p(1,1,1)}).call((function(){return t.pulseRetryButton()})).start())},i.pulseRetryButton=function(){u(this.retryButton).repeatForever(u().to(.5,{scale:new p(1.1,1.1,1)}).to(.5,{scale:new p(1,1,1)})).start()},e}(d)).prototype,"carAnimation",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),F=e(B.prototype,"failText",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),R=e(B.prototype,"darkOverlay",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),O=e(B.prototype,"downloadButton",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),T=e(B.prototype,"retryButton",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=B))||b));i._RF.pop()}}}));

System.register("chunks:///_virtual/WheelSensor.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var r,t,n,i,o,a,c;return{setters:[function(e){r=e.applyDecoratedDescriptor,t=e.inheritsLoose,n=e.initializerDefineProperty,i=e.assertThisInitialized},function(e){o=e.cclegacy,a=e._decorator,c=e.Component}],execute:function(){var l,s,u;o._RF.push({},"f15ffyf3vZEUJTLVcWYkGxK","WheelSensor",void 0);var p=a.ccclass,f=a.property;e("WheelSensor",p("WheelSensor")((u=r((s=function(e){function r(){for(var r,t=arguments.length,o=new Array(t),a=0;a<t;a++)o[a]=arguments[a];return r=e.call.apply(e,[this].concat(o))||this,n(r,"bridgeTag",u,i(r)),r}return t(r,e),r.prototype.onTriggerEnter=function(e){var r=e.otherCollider.node;if(r.group===this.bridgeTag){var t=r.getComponent("BridgePiece");t&&"function"==typeof t.fall&&t.fall()}},r}(c)).prototype,"bridgeTag",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"BridgePiece"}}),l=s))||l);o._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});