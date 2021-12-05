/**
 * jquery.doDrag.js
 * https://github.com/bbjavascript/jquery.doDrag.js
 * 
 * Released under the MIT license
 * https://github.com/bbjavascript/jquery.doDrag.js/blob/main/LICENSE
 * 
 * lastUpdate: 2021-12-05T11:10:57.449Z
 */
(function($) {
    var Drag = (function() {
        function Drag(ele, options) {
            this.settings = {};
            this.settings = $.extend(true, this.settings, options);
            this.ele = ele;
            this.init();
        }
        Drag.prototype = {
            init: function() {
                var dc = $(document),
                    me = $(this.ele),
                    tW = dc.outerWidth(),
                    tH = dc.outerHeight(),
                    oW = me.outerWidth(),
                    oH = me.outerHeight(),
                    zidx = me.css('z-index'), maxIdx = 9e7;
                me.off().on("mousedown", function(e) {
                    var offX = e.offsetX, offY = e.offsetY;
                    dc.off("mousemove.dragmove").on("mousemove.dragmove", function(e) {
                        var eX = e.pageX - offX,
                            eY = e.pageY - offY,
                            maxX = tW - oW,
                            maxY = tH - oH;
                        if (eX < 0) {
                            eX = 0;
                        } else if(eX > maxX) {
                            eX = maxX;
                        }
                        if (eY < 0) {
                            eY = 0
                        } else if (eY > maxY) {
                            eY = maxY;
                        }
                        me.css({
                            'left': eX + 'px',
                            'top': eY + 'px',
                            'z-index': maxIdx
                        })
                    })
                    e.preventDefault();
                }).on("mouseup", function(e) {
                    dc.off("mousemove.dragmove");
                    me.css("z-index", zidx);
                });
            }
        }
        return Drag;
    })()
    $.fn.doDrag = function(options) {
        return this.each(function() {
            var me = $(this),
                opts = options,
                inst = me.data("DragData");
            me.css('cursor', 'move');
            if(!inst) {
                if ($.type(opts) !== "object") {
                    opts = {};
                }
                inst = new Drag(me, opts);
                me.data("DragData", inst);
            } else {
                if ($.type(opts) === "object") {
                    inst.settings = $.extend(true, inst.settings, opts);
                    me.data("DragData", inst);
                }
            }
            if ($.isFunction(inst.settings.callback)) {
                inst.settings.callback();
            }
            if ($.isFunction(inst[opts])) {
                return inst[opts]();
            }
        })
    }
})(jQuery)
