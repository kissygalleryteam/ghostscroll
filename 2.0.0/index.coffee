KISSY.add (S, Node)->

  $ = Node.all

  defaultConfig =
    el            : null
    delay         : 500
    cancelBubble  : true
    offset        : ['right', 0]

  tpl = """
        <div class="ks-ghostscroll-wrapper"><span class="ks-ghostscroll-thumb"></span></div>
        """

  class GhostScroll
    constructor: (@config)->
      @el = el = $(@config.el)
      return if !el
      # Mac 插上鼠标后滚动条默认还是出来的，所以不特殊处理了
      @isMac = false # S.UA.os is "macintosh" or S.UA.os is "ios" or S.UA.ie is 6
      @config = S.merge defaultConfig, @config
      @scrollEl = scrollEl = $ S.DOM.create(tpl)
      @thumbEl = thumbEl = scrollEl.one ".ks-ghostscroll-thumb"
      @conHeight = @calContainerHeight el
      @conWidth = @calContainerWidth(el) - 14
      @wrapperEl = $ @wrapEl()

      @resetHeight()
      @bindReset()
      # @realHeight = @calRealHeight @wrapperEl
      # # return if @realHeight <= @conHeight
      # @calThumbHeight()
      # @bindEvents()
      # scrollEl.appendTo el
      # scrollEl.hide()
      # @isBind = true

      if offset = @config.offset
        pos = offset[0]
        scrollEl.css pos, offset[1]

    wrapEl: ->
      content = @el.html()
      wrapperEl = S.DOM.create """
                               <div class="ks-ghostscroll-ghost" style="width:#{@conWidth}px;height:#{@conHeight}px">#{content}</div>
                               """
      @el.html("").append wrapperEl
      return wrapperEl

    calRealHeight: (el)->
      el = @el if !$(el)
      return el[0].scrollHeight


    calContainerHeight: (el)->
      el = @el if !$(el)
      # el.innerHeight()
      el.height()

    calContainerWidth: (el)->
      el = @el if !$(el)
      # el.innerWidth()
      el.width()

    calThumbHeight: ->
      @thumbHeight =  @conHeight / @realHeight * @conHeight
      @thumbEl.css
        "height"      : @thumbHeight

    calTop: ->
      return @wrapperEl.scrollTop() / @realHeight * @conHeight

    resetHeight: ->
      @realHeight = @calRealHeight @wrapperEl
      @thumbHeight = @calThumbHeight()
      if @realHeight <= @conHeight
        @el.addClass "ks-ghostscroll-invail"
        @invail = true
      else
        @el.removeClass "ks-ghostscroll-invail"
        @invail = false
      if !@isBind
        @bindEvents()
        @scrollEl.appendTo @el
        @scrollEl.hide()
        @isBind = true

    bindReset: ->
      @wrapperEl.all("img").on "load", =>
        @resetHeight()

    bindEvents: ->
      if @isMac
        @wrapperEl.css
          "overflow-x" : "hidden"
          "overflow-y" : "scroll"
        @wrapperEl.on "mousewheel", (ev)->
          ev.stopPropagation()

      else
        @wrapperEl.on "scroll", =>
          @thumbEl.css
            top: @calTop()

        timer = null
        inEl = false
        inThumb = false
        mouseDown = false
        isBind = false

        checkLeave = =>
          if !inThumb && !inEl && !mouseDown
            isBind = false
            @releaseScroll()
            @el.detach "mousemove"
            @wrapperEl.css "overflow-y", "hidden"

        @el.on "mouseenter", =>
          return if @invail
          clearTimeout timer
          inEl = true
          return if isBind
          timer = setTimeout =>
            isBind = true
            @bindScroll @scrollEl, @wrapperEl
          , @config.delay

        @el.on "mouseleave", =>
          clearTimeout timer
          inEl = false
          S.later =>
            checkLeave()
          , @config.delay

        @thumbEl.on "mouseenter", (ev)=>
          inThumb = true

        @thumbEl.on "mouseleave", (ev)=>
          inThumb = false
          S.later =>
            checkLeave()
          , @config.delay

        _top = 0;
        @thumbEl.on "mousedown", (ev)=>
          ev.halt()
          _top = ev.pageY
          mouseDown = true
          $(window).on "mouseup", ->
            mouseUp()

          $(window).on "mousemove", (ev)=>
            ev.halt()
            getSelection?().removeAllRanges()
            @wrapperEl.scrollTop @wrapperEl.scrollTop() + (ev.pageY - _top ) * 2
            _top = ev.pageY

        mouseUp = ->
          mouseDown = false
          checkLeave()
          $(window).detach "mouseup mousemove"

        @el.on "mouseup", ->
          mouseUp()

    bindScroll: (scrollEl, wrapperEl)->
      scrollEl = @scrollEl if !scrollEl
      wrapperEl = @wrapperEl if !wrapperEl
      scrollEl.show()
      wrapperEl.on "mousewheel", (ev)=>
        ev.halt()
        _temp = wrapperEl.scrollTop() -  if ev.wheelDelta then ev.wheelDelta else ev.delta * -120
        wrapperEl.scrollTop _temp

    releaseScroll: ->
      if @isMac
        @wrapperEl.css
          "overflow" : "hidden"
      else
        @scrollEl.hide()
      @wrapperEl.detach "mousewheel"

, 
  requires: ['node', "./index.css"]
