## 综述

Ghostscroll 是适用于多滚动条场景的隐形滚动条。

* 版本：1.0
* 作者：筱谷
* demo：[http://gallery.kissyui.com/ghostscroll/1.0/demo/index.html](http://gallery.kissyui.com/ghostscroll/1.0/demo/index.html)

## 初始化组件

    <style>
        #demo {
            border: 3px solid #333;
            width: 300px;
            height: 400px;
            position: relative;
        }
    </style>

    <div id="demo">
        <div class="a">
            <p>这是很长很长的内容</p>
        </div>
    </div>
		
    S.use('gallery/ghostscroll/1.0/index', function (S, Ghostscroll) {
         var ghostscroll = new Ghostscroll(config);
    })
	
	
## API说明

    config.el            : '#demo'  # 外层元素
    config.delay         : 500      # 鼠标 Hover 时滚动条出现的延迟时间
    config.cancelBubble  : true     # 内部的滚动事件是否冒泡
    config.offset        : ['right', 0] # 滚动条位置
