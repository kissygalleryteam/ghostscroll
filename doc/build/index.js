/*
combined files : 

kg/ghostscroll/2.0.0/index

*/
KISSY.add('kg/ghostscroll/2.0.0/index',function(S, Node) {
  var $, GhostScroll, defaultConfig, tpl;
  $ = Node.all;
  defaultConfig = {
    el: null,
    delay: 500,
    cancelBubble: true,
    offset: ['right', 0]
  };
  tpl = "<div class=\"ks-ghostscroll-wrapper\"><span class=\"ks-ghostscroll-thumb\"></span></div>";
  return GhostScroll = (function() {
    function GhostScroll(config) {
      var el, offset, pos, scrollEl, thumbEl;
      this.config = config;
      this.el = el = $(this.config.el);
      if (!el) {
        return;
      }
      this.isMac = false;
      this.config = S.merge(defaultConfig, this.config);
      this.scrollEl = scrollEl = $(S.DOM.create(tpl));
      this.thumbEl = thumbEl = scrollEl.one(".ks-ghostscroll-thumb");
      this.conHeight = this.calContainerHeight(el);
      this.conWidth = this.calContainerWidth(el) - 14;
      this.wrapperEl = $(this.wrapEl());
      this.resetHeight();
      this.bindReset();
      if (offset = this.config.offset) {
        pos = offset[0];
        scrollEl.css(pos, offset[1]);
      }
    }

    GhostScroll.prototype.wrapEl = function() {
      var content, wrapperEl;
      content = this.el.html();
      wrapperEl = S.DOM.create("<div class=\"ks-ghostscroll-ghost\" style=\"width:" + this.conWidth + "px;height:" + this.conHeight + "px\">" + content + "</div>");
      this.el.html("").append(wrapperEl);
      return wrapperEl;
    };

    GhostScroll.prototype.calRealHeight = function(el) {
      if (!$(el)) {
        el = this.el;
      }
      return el[0].scrollHeight;
    };

    GhostScroll.prototype.calContainerHeight = function(el) {
      if (!$(el)) {
        el = this.el;
      }
      return el.height();
    };

    GhostScroll.prototype.calContainerWidth = function(el) {
      if (!$(el)) {
        el = this.el;
      }
      return el.width();
    };

    GhostScroll.prototype.calThumbHeight = function() {
      this.thumbHeight = this.conHeight / this.realHeight * this.conHeight;
      return this.thumbEl.css({
        "height": this.thumbHeight
      });
    };

    GhostScroll.prototype.calTop = function() {
      return this.wrapperEl.scrollTop() / this.realHeight * this.conHeight;
    };

    GhostScroll.prototype.resetHeight = function() {
      this.realHeight = this.calRealHeight(this.wrapperEl);
      this.thumbHeight = this.calThumbHeight();
      if (this.realHeight <= this.conHeight) {
        this.el.addClass("ks-ghostscroll-invail");
        this.invail = true;
      } else {
        this.el.removeClass("ks-ghostscroll-invail");
        this.invail = false;
      }
      if (!this.isBind) {
        this.bindEvents();
        this.scrollEl.appendTo(this.el);
        this.scrollEl.hide();
        return this.isBind = true;
      }
    };

    GhostScroll.prototype.bindReset = function() {
      return this.wrapperEl.all("img").on("load", (function(_this) {
        return function() {
          return _this.resetHeight();
        };
      })(this));
    };

    GhostScroll.prototype.bindEvents = function() {
      var checkLeave, inEl, inThumb, isBind, mouseDown, mouseUp, timer, _top;
      if (this.isMac) {
        this.wrapperEl.css({
          "overflow-x": "hidden",
          "overflow-y": "scroll"
        });
        return this.wrapperEl.on("mousewheel", function(ev) {
          return ev.stopPropagation();
        });
      } else {
        this.wrapperEl.on("scroll", (function(_this) {
          return function() {
            return _this.thumbEl.css({
              top: _this.calTop()
            });
          };
        })(this));
        timer = null;
        inEl = false;
        inThumb = false;
        mouseDown = false;
        isBind = false;
        checkLeave = (function(_this) {
          return function() {
            if (!inThumb && !inEl && !mouseDown) {
              isBind = false;
              _this.releaseScroll();
              _this.el.detach("mousemove");
              return _this.wrapperEl.css("overflow-y", "hidden");
            }
          };
        })(this);
        this.el.on("mouseenter", (function(_this) {
          return function() {
            if (_this.invail) {
              return;
            }
            clearTimeout(timer);
            inEl = true;
            if (isBind) {
              return;
            }
            return timer = setTimeout(function() {
              isBind = true;
              return _this.bindScroll(_this.scrollEl, _this.wrapperEl);
            }, _this.config.delay);
          };
        })(this));
        this.el.on("mouseleave", (function(_this) {
          return function() {
            clearTimeout(timer);
            inEl = false;
            return S.later(function() {
              return checkLeave();
            }, _this.config.delay);
          };
        })(this));
        this.thumbEl.on("mouseenter", (function(_this) {
          return function(ev) {
            return inThumb = true;
          };
        })(this));
        this.thumbEl.on("mouseleave", (function(_this) {
          return function(ev) {
            inThumb = false;
            return S.later(function() {
              return checkLeave();
            }, _this.config.delay);
          };
        })(this));
        _top = 0;
        this.thumbEl.on("mousedown", (function(_this) {
          return function(ev) {
            ev.halt();
            _top = ev.pageY;
            mouseDown = true;
            $(window).on("mouseup", function() {
              return mouseUp();
            });
            return $(window).on("mousemove", function(ev) {
              ev.halt();
              if (typeof getSelection === "function") {
                getSelection().removeAllRanges();
              }
              _this.wrapperEl.scrollTop(_this.wrapperEl.scrollTop() + (ev.pageY - _top) * 2);
              return _top = ev.pageY;
            });
          };
        })(this));
        mouseUp = function() {
          mouseDown = false;
          checkLeave();
          return $(window).detach("mouseup mousemove");
        };
        return this.el.on("mouseup", function() {
          return mouseUp();
        });
      }
    };

    GhostScroll.prototype.bindScroll = function(scrollEl, wrapperEl) {
      if (!scrollEl) {
        scrollEl = this.scrollEl;
      }
      if (!wrapperEl) {
        wrapperEl = this.wrapperEl;
      }
      scrollEl.show();
      return wrapperEl.on("mousewheel", (function(_this) {
        return function(ev) {
          var _temp;
          ev.halt();
          _temp = wrapperEl.scrollTop() - (ev.wheelDelta ? ev.wheelDelta : ev.delta * -2.0.0);
          return wrapperEl.scrollTop(_temp);
        };
      })(this));
    };

    GhostScroll.prototype.releaseScroll = function() {
      if (this.isMac) {
        this.wrapperEl.css({
          "overflow": "hidden"
        });
      } else {
        this.scrollEl.hide();
      }
      return this.wrapperEl.detach("mousewheel");
    };

    return GhostScroll;

  })();
}, {
  requires: ['node', "./index.css"]
});

