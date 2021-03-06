import layerTmpl from './view/layer.tmpl';
import './index.less';

var layer = {
  init: function () {
    var _this = this;
    $.tmpl(layerTmpl, {}).appendTo("body");
    _this.drag();
    _this.offset();
    $(window).on('resize', function () {
      _this.offset();
    })
  },
  // 拖拽
  drag: function () {
    var $wrap = $('#ve-layer');
    $('#ve-layer-drag').on('mousedown', function (e) {
      e.preventDefault();
      var positionDiv = $wrap.offset();
      var distenceX = e.pageX - positionDiv.left;
      var distenceY = e.pageY - positionDiv.top;
      $(document).mousemove(function (e) {
        e.preventDefault();
        var x = e.pageX - distenceX;
        var y = e.pageY - distenceY;
        if (x < 0) {
          x = 0;
        } else if (x > $(document).width() - $wrap.outerWidth(true)) {
          x = $(document).width() - $wrap.outerWidth(true);
        }

        if (y < 0) {
          y = 0;
        } else if (y > $(document).height() - $wrap.outerHeight(true)) {
          y = $(document).height() - $wrap.outerHeight(true);
        }
        $wrap.css({
          'left': x + 'px',
          'top': y + 'px'
        });
      });

      $(document).mouseup(function () {
        $(document).off('mousemove');
      });
    });
  },
  //计算坐标
  offset: function () {
    var $wrap = $('#ve-layer');
    var x = ($(document).width() - $wrap.outerWidth(true)) / 2;
    var y = ($(document).height() - $wrap.outerWidth(true)) / 2;
    $wrap.css({
      'left': x + 'px',
      'top': y + 'px'
    });
  }
}


export default layer

