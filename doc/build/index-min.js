/*!build time : 2014-06-08 1:51:10 AM*/
KISSY.add("kg/ghostscroll/2.0.0/index",function(a,b){var c,d,e,f;return c=b.all,e={el:null,delay:500,cancelBubble:!0,offset:["right",0]},f='<div class="ks-ghostscroll-wrapper"><span class="ks-ghostscroll-thumb"></span></div>',d=function(){function b(b){var d,g,h,i,j;this.config=b,this.el=d=c(this.config.el),d&&(this.isMac=!1,this.config=a.merge(e,this.config),this.scrollEl=i=c(a.DOM.create(f)),this.thumbEl=j=i.one(".ks-ghostscroll-thumb"),this.conHeight=this.calContainerHeight(d),this.conWidth=this.calContainerWidth(d)-14,this.wrapperEl=c(this.wrapEl()),this.resetHeight(),this.bindReset(),(g=this.config.offset)&&(h=g[0],i.css(h,g[1])))}return b.prototype.wrapEl=function(){var b,c;return b=this.el.html(),c=a.DOM.create('<div class="ks-ghostscroll-ghost" style="width:'+this.conWidth+"px;height:"+this.conHeight+'px">'+b+"</div>"),this.el.html("").append(c),c},b.prototype.calRealHeight=function(a){return c(a)||(a=this.el),a[0].scrollHeight},b.prototype.calContainerHeight=function(a){return c(a)||(a=this.el),a.height()},b.prototype.calContainerWidth=function(a){return c(a)||(a=this.el),a.width()},b.prototype.calThumbHeight=function(){return this.thumbHeight=this.conHeight/this.realHeight*this.conHeight,this.thumbEl.css({height:this.thumbHeight})},b.prototype.calTop=function(){return this.wrapperEl.scrollTop()/this.realHeight*this.conHeight},b.prototype.resetHeight=function(){return this.realHeight=this.calRealHeight(this.wrapperEl),this.thumbHeight=this.calThumbHeight(),this.realHeight<=this.conHeight?(this.el.addClass("ks-ghostscroll-invail"),this.invail=!0):(this.el.removeClass("ks-ghostscroll-invail"),this.invail=!1),this.isBind?void 0:(this.bindEvents(),this.scrollEl.appendTo(this.el),this.scrollEl.hide(),this.isBind=!0)},b.prototype.bindReset=function(){return this.wrapperEl.all("img").on("load",function(a){return function(){return a.resetHeight()}}(this))},b.prototype.bindEvents=function(){var b,d,e,f,g,h,i,j;return this.isMac?(this.wrapperEl.css({"overflow-x":"hidden","overflow-y":"scroll"}),this.wrapperEl.on("mousewheel",function(a){return a.stopPropagation()})):(this.wrapperEl.on("scroll",function(a){return function(){return a.thumbEl.css({top:a.calTop()})}}(this)),i=null,d=!1,e=!1,g=!1,f=!1,b=function(a){return function(){return e||d||g?void 0:(f=!1,a.releaseScroll(),a.el.detach("mousemove"),a.wrapperEl.css("overflow-y","hidden"))}}(this),this.el.on("mouseenter",function(a){return function(){return a.invail||(clearTimeout(i),d=!0,f)?void 0:i=setTimeout(function(){return f=!0,a.bindScroll(a.scrollEl,a.wrapperEl)},a.config.delay)}}(this)),this.el.on("mouseleave",function(c){return function(){return clearTimeout(i),d=!1,a.later(function(){return b()},c.config.delay)}}(this)),this.thumbEl.on("mouseenter",function(){return function(){return e=!0}}(this)),this.thumbEl.on("mouseleave",function(c){return function(){return e=!1,a.later(function(){return b()},c.config.delay)}}(this)),j=0,this.thumbEl.on("mousedown",function(a){return function(b){return b.halt(),j=b.pageY,g=!0,c(window).on("mouseup",function(){return h()}),c(window).on("mousemove",function(b){return b.halt(),"function"==typeof getSelection&&getSelection().removeAllRanges(),a.wrapperEl.scrollTop(a.wrapperEl.scrollTop()+2*(b.pageY-j)),j=b.pageY})}}(this)),h=function(){return g=!1,b(),c(window).detach("mouseup mousemove")},this.el.on("mouseup",function(){return h()}))},b.prototype.bindScroll=function(a,b){return a||(a=this.scrollEl),b||(b=this.wrapperEl),a.show(),b.on("mousewheel",function(){return function(a){var c;return a.halt(),c=b.scrollTop()-(a.wheelDelta?a.wheelDelta:-2.0.0*a.delta),b.scrollTop(c)}}(this))},b.prototype.releaseScroll=function(){return this.isMac?this.wrapperEl.css({overflow:"hidden"}):this.scrollEl.hide(),this.wrapperEl.detach("mousewheel")},b}()},{requires:["node","./index.css"]});