/**
 * Bundle of cock
 * Generated: 2018-03-28
 * Version: 0.0.1
 * author: 清酒稻香, Faker, Mark
 * gitUrl: https://gitee.com/veryeast/complex-layer
 */
var Cock = function(e) {
  "use strict";
  var t, n, i = window.layer, a = window.__template__v3__ || window.template, l = $(window), c = {};
  a.helper("parseInt", parseInt),
      a.helper("ceil", Math.ceil),
      a.helper("inArray", $.inArray),
      a.helper("colsp", function(e, t) {
        return Math.ceil(Math.sqrt(e / t));
      }),
      (t = {
        init: function() {
          this.events();
        },
        offset: function(e, t, n) {
          var i, a = {};
          for (i in e)
            a[i] = window.eval(e[i] + (n || "-") + (t[i] || 0));
          return a;
        },
        check: function(e, t) {
          $(".ve-w-cock .ck-table input[value=" + e + "]").prop("checked", t);
        },
        getVelues: function(e) {
          var t = [];
          return e.each(function() {
            t.push($(this).val());
          }),
              t;
        },
        events: function() {
          var e, t = $("body"), a = this, c = ".ve-w-cock .item-cache";
          t.on("click.cock", ".ve-w-cock .J_ck-all span", function() {
            var e, t = $(this), n = t.closest(".ve-w-cock"), i = parseInt(t.data("index"), 10), c = a.cache(n.attr("name")), s = n.find(">.item-cache").show(), d = s.find(">#item-" + i), o = a.getVelues($(".ve-w-cock .ck-std-list input"));
            d = a.render('<table cellpadding="0" cellspacing="0" border="0" class="ck-table" id="item-{{index}}" runjs-var="{{cols=colsp(all[index][1].length, ratio)}}">\n\t{{if allowed}}\n\t    <tr>\n            <th colspan="{{cols}}">\n                {{if parent}}\n                <label><input type="{{if multi > 1}}checkbox{{else}}radio{{/if}}" class="isTitle" value="{{all[index][0]}}" {{if inArray(all[index][0], hit)>=0}}checked{{/if}}>{{type[all[index][0]]}}</label>\n                {{else}}\n                <em style="padding-left:9px">{{type[all[index][0]]}}</em>\n                {{/if}}\n            </th>\n        </tr>\n        <tr>\n            {{each all[index][1] as item i}}\n          {{if i > 0 && i % cols == 0}}</tr>{{if i < all[index][1].length - 1}}<tr>{{/if}}{{/if}}\n          <td>\n            {{if inArray(item, allowed) > -1}}\n                <label><input type="{{if multi > 1}}checkbox{{else}}radio{{/if}}" value="{{item}}" {{if inArray(item, hit) >= 0}}checked{{/if}}>{{raw[item]}}</label>\n            {{else}}\n                <span style="padding:0 10px;" class="disabled"><input type="{{if multi > 1}}checkbox{{else}}radio{{/if}}" value="{{item}}" disabled="value" {{if inArray(item, hit) >= 0}}checked{{/if}}>{{raw[item]}}</span>\n            {{/if}}\n          </td>\n          {{if i == all[index][1].length - 1 && (i+1) % cols > 0}}<td colspan="{{cols-(i+1)%cols}}"></td>{{/if}}\n            {{/each}}\n        </tr>\n\t{{else}}\n\t    <tr>\n            <th colspan="{{cols}}">\n                {{if parent}}\n                <label><input type="{{if multi > 1}}checkbox{{else}}radio{{/if}}" class="isTitle" value="{{all[index][0]}}" {{if inArray(all[index][0], hit)>=0}}checked{{/if}}>{{type[all[index][0]]}}</label>\n                {{else}}\n                <em style="padding-left:9px">{{type[all[index][0]]}}</em>\n                {{/if}}\n            </th>\n        </tr>\n        <tr>\n            {{each all[index][1] as item i}}\n          {{if i > 0 && i % cols == 0}}</tr>{{if i < all[index][1].length - 1}}<tr>{{/if}}{{/if}}\n          <td>\n            <label><input type="{{if multi > 1}}checkbox{{else}}radio{{/if}}" value="{{item}}" {{if inArray(item, hit) >= 0}}checked{{/if}}>{{raw[item]}}</label>\n          </td>\n          {{if i == all[index][1].length - 1 && (i+1) % cols > 0}}<td colspan="{{cols-(i+1)%cols}}"></td>{{/if}}\n            {{/each}}\n        </tr>\n\t{{/if}}\n</table>', $.extend({}, c.data, {
              hit: o,
              index: i,
              parent: c.parent,
              cols: c.ratio,
              multi: c.multi
            }, {
              allowed: c.allowed || ""
            })),
                s.append(d),
                d.show().siblings().hide();
            var r = t.offset().left + s.outerWidth() + 10
                , p = l.width()
                , h = t.offset().top + s.outerHeight() + 10 - $(document).scrollTop()
                , f = l.height()
                , u = r > p ? r - p : 0
                , m = h > f ? h - f : 0;
            e = a.offset(a.offset(t.offset(), n.parent().offset()), {
              left: u,
              top: m
            }),
                s.css(e);
          }).on("mouseleave.cock", c, function() {
            var t = $(this);
            e = setTimeout(function() {
              t.hide();
            }, 240);
          }).on("mouseenter.cock", c, function() {
            clearTimeout(e);
          }).on("change.cock-i", ".ve-w-cock .ck-table input", function() {
            var e, l = $(this), s = l.val(), d = l.prop("checked"), o = $(".ve-w-cock .ck-std-list"), r = l.closest(".ve-w-cock"), p = a.cache(r.attr("name")), h = l.closest("label"), f = [], u = parseInt(p.multi, 10) > 1;
            for (e in p.emp)
              f.push(e);
            if (u) {
              if (d) {
                if (o.find("input[value=" + l.attr("parent") + "]").closest("label").click(),
                    h.closest("table").find(("TH" == h.parent().get(0).tagName ? "td" : "th") + " input").prop("checked", !1).trigger("change.cock-i"),
                    !(o.find("label").length < p.multi))
                  return l.prop("checked", !1),
                      void i.tips(p.data.lang.multi.replace("<%multi%>", p.multi), o, {
                        tips: 3,
                        time: 2400
                      });
                o.append(h.clone().removeClass(f.join(" ")));
              } else
                o.find("input[value=" + s + "]").closest("label").remove();
            } else
              o.find("input[value]").prop("checked", !1).click(),
                  l.prop("checked", d = !0),
                  o.append(h.clone().removeClass(f.join(" "))),
                  setTimeout(function() {
                    t.find(c).trigger("mouseleave.cock"),
                        n.find(".layui-layer-btn0").click();
                  });
            a.check(s, d);
          }).on("click", ".ve-w-cock .ck-std-list label", function() {
            var e = $(this)
                , t = e.find("input").val();
            e.remove(),
                a.check(t, !1);
          });
          var s, d;
          l.keydown(function(e) {
            void 0;
          }).keydown(function(e) {
            s && 13 == e.keyCode && d.find(".layui-layer-btn0").click();
          });
        },
        cache: function(e, t) {
          return void 0 !== t && (c[e] = t),
              c[e];
        },
        render: function(e, t) {
          if (t.allowed) {
            var n = t.allowed instanceof Array ? t.allowed : t.allowed.toString().split(",")
                , i = [];
            $.map(n, function(e) {
              var t = e.substr(0, 2) + "0000";
              i.push(e),
              -1 === $.inArray(t, i) && i.push(t);
            }),
                t.allowed = i;
          }
          return $(a.compile(e)(t));
        },
        biu: function(e) {
          var t, n = this.cache(e.name);
          e.data.ratio = e.ratio || 999,
              n = this.cache(e.name, $.extend({
                $main: this.render(e.tpl, $.extend({
                  multi: e.multi
                }, e.data, {
                  allowed: e.allowed || ""
                })).attr("name", e.name)[(window.screen.availHeight < 732 ? "add" : "remove") + "Class"]("mini-ms").append('<div class="item-cache"></div>')
              }, e));
          for (t in n.emp)
            n.$main.find(".J_ck-hot, .J_ck-all").find(n.emp[t].join(",").replace(/(\d+)/g, "span[data-id=$1],input[value=$1]")).parent().addClass(t);
          return n;
        },
        run: function(e, t) {
          var a = this
              , c = a.biu(e);
          i.open({
            area: "750px",
            title: (e.tip || "~") + (e.multi > 1 ? " （" + e.data.lang.multi.replace("<%multi%>", e.multi) + "）" : ""),
            shift: parseInt(5 * Math.random() + 1, 10),
            btn: ["[" + e.data.lang.ok + "]", "[" + e.data.lang.clean + "]"],
            closeBtn: 0,
            skin: "ve-w-cock-box",
            success: function(t, i) {
              n = t,
                  t.children(".layui-layer-content").append(c.$main),
                  l.resize(),
                  a.render('<div class="ck-std-list">\n\t{{each hit as item}}\n\t\t{{if item!=\'\'}}\n\t\t<label><input type="checkbox" {{if type[item]}}class="isTitle"{{/if}} value="{{item}}" checked>{{type[item]||raw[item]}}</label>\n\t\t{{/if}}\n\t{{/each}}\n</div>', $.extend({
                    hit: e.hit || []
                  }, e.data, {
                    allowed: e.allowed || ""
                  })).find("label").appendTo(t.find(".ck-std .ck-std-list").find("label").click().end()),
                  t.find(".ck-table").find(e.hit.join(",").replace(/(\d+)/g, "input[value=$1]")).prop("checked", !0),
              e.clean || (t.find(">.layui-layer-btn>.layui-layer-btn1").css("display", "none"),
                  window.hello = c.$main);
            },
            yes: function(e) {
              var a = {
                v: [],
                t: []
              }
                  , l = [];
              n.find(".ve-w-cock .ck-std-list label").each(function() {
                var e = $(this)
                    , t = e.find("input").val()
                    , n = e.text();
                a.v.push(t),
                    a.t.push(n),
                    l.push({
                      value: t,
                      text: n
                    });
              }),
                  c.$main.remove(),
                  i.close(e),
                  n = !1,
                  c.$main.find(".item-cache").hide(),
              t && t(a, l);
            },
            cancel: function(e) {
              return n.find(".ve-w-cock .ck-std-list label").click(),
                  !1;
            }
          });
        },
        skin: function(e, t) {
          return this;
        }
      }).init();
  var s = t
      , d = {
    data: {},
    Initial: function() {
      var e, t, n = new String(window.location.search);
      e = (n = n.substr(1, n.length)).split("&");
      for (var i = 0; i < e.length; i++)
        t = e[i].split("="),
            this.data[t[0]] = t[1];
    },
    GetValue: function(e) {
      return this.data[e];
    }
  };
  d.Initial();
  var o = {
    browser: function() {
      var e = navigator.userAgent.toLowerCase().match(/(msie|chrome|safari|firefox).(\d+)\./) || 0;
      return e ? [e[1], parseInt(e[2], 10)] : [];
    }(),
    substring: function(e, t, n) {
      if (!e)
        return e;
      var i, a = 0, l = "", c = /[^\x00-\xff]/g, s = (e = "string" != typeof e ? "" : e).replace(c, "**").length;
      n = void 0 === n ? "..." : n;
      if (s <= t + (s % 2 == 0 ? 2 : 1))
        return e;
      for (var d = 0; d < s && (null != (i = e.charAt(d).toString()).match(c) ? a += 2 : a++,
          !(a > t)); d++)
        l += i;
      return n && s > t && (l = $.trim(l) + n),
          l;
    },
    selected: function(e, t) {
      $(t || document)[e ? "off" : "on"]("selectstart mousedown mouseup selectstart", r);
    },
    random: function() {
      return parseInt(String(Math.random()).slice(2), 10);
    },
    pad: function(e, t, n, i) {
      "boolean" == typeof n && (i = n,
          n = 0);
      var a = String(e).length
          , l = Array(t > a ? t - a + 1 : 0).join(n || 0) + e;
      return i ? l.slice(a - t) : l;
    },
    object: function(e) {
      if ("string" == typeof e)
        return Function("return " + (e || "{}"))();
    },
    type: function(e) {
      return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1].toLowerCase();
    },
    refresh: function(e) {
      $(e || "input[placeholder], textarea[placeholder]").trigger("blur.placeholder");
    },
    cookie: function(e, t, n) {
      var i, a, l = {}, c = "regexp" == this.type(e) ? {} : null, s = document.cookie.split(/; */), d = arguments;
      if (!t) {
        for (i = 0; i < s.length; i++)
          l[(a = s[i].match(/^([^=]+)=(.*)/))[1]] = a[2],
          c && e.test(a) && (c[a[1]] = a[2]);
        return d.length ? c || (1 == d.length ? l[e] : void 0) : l;
      }
      var o = new Date();
      o.setTime(1e3 * n + o.getTime()),
          document.cookie = e + "=" + t + (n ? ";expires=" + o.toGMTString() : "");
    },
    rmCookie: function(e) {
      var t = new Date();
      t.setTime(t.getTime() - 1),
          document.cookie = e + "=;expires=" + t.toGMTString();
    },
    getValue: function(e) {
      return d.GetValue(e);
    },
    split: String.prototype.split || function(e) {
      var t, n = String.prototype.split, i = void 0 === /()??/.exec("")[1];
      return t = function(e, t, a) {
        if ("[object RegExp]" !== Object.prototype.toString.call(t))
          return n.call(e, t, a);
        var l, c, s, d, o = [], r = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.extended ? "x" : "") + (t.sticky ? "y" : ""), p = 0;
        t = new RegExp(t.source,r + "g");
        for (e += "",
             i || (l = new RegExp("^" + t.source + "$(?!\\s)",r)),
                 a = void 0 === a ? -1 >>> 0 : a >>> 0; (c = t.exec(e)) && !((s = c.index + c[0].length) > p && (o.push(e.slice(p, c.index)),
        !i && c.length > 1 && c[0].replace(l, function() {
          for (var e = 1; e < arguments.length - 2; e++)
            void 0 === arguments[e] && (c[e] = void 0);
        }),
        c.length > 1 && c.index < e.length && Array.prototype.push.apply(o, c.slice(1)),
            d = c[0].length,
            p = s,
        o.length >= a)); )
          t.lastIndex === c.index && t.lastIndex++;
        return p === e.length ? !d && t.test("") || o.push("") : o.push(e.slice(p)),
            o.length > a ? o.slice(0, a) : o;
      }
          ,
          String.prototype.split = function(e, n) {
            return t(this, e, n);
          }
          ,
          t;
    }()
  };
  function r(e) {
    return e.returnValue = !1,
        !1;
  }
  window.Helper = o;
  var p = []
      , h = []
      , f = {}
      , u = {};
  $.map(static_data.department, function(e) {
    var t = [];
    t[0] = e.code,
        t[1] = [],
        u[e.code] = e.name,
    e.showNew && h.push(e.code),
        $.map(static_data.position, function(n) {
          n.parent_id === e.id && t[1].push(n.code),
          n.showNew && h.push(e.code),
              f[n.code] = n.name;
        }),
        p.push(t);
  });
  var m = {
    all: p,
    raw: f,
    type: u,
    showNew: h,
    hot: [["高级管理", ["1003", "1921", "0101", "0901"]], ["中层管理", ["1004", "1102", "1302", "1402"]], ["基层管理", ["1113", "1304", "1403", "2303"]], ["一线员工", ["1014", "1115", "1310", "1417"]]]
  }
      , v = {
    multi: "您最多能选择<%multi%>项",
    okMsg: "您确定要修改求职条件吗？",
    ok: "确定",
    no: "再想想",
    clean: "不限",
    postStd: "已选职位",
    postHot: "热门职位",
    postAll: "所有职位",
    areaStd: "已选地点",
    areaHot: "主要城市",
    areaAll: "所有省份",
    classStd: "已选行业",
    classAll: "所有行业"
  }
      , g = {
    name: "post",
    tpl: '<div class="ve-w-cock">\n  <div class="ck-std" {{if !(multi > 1)}}style="display:none;"{{/if}}>\n    <h4>{{lang.postStd}}：</h4>\n    <div class="ck-std-list"></div>\n  </div>\n\n  <h3 class="ck-title">{{lang.postHot}}</h3>\n  <div class="ck-job-hot J_ck-hot">\n    <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n      {{each hot as child ps}}\n        <tbody>\n          {{if ps>0}}<tr class="ck-dashed"><td colspan="4"><i></i></td></tr>{{/if}}\n          <tr>\n            <th rowspan="{{ceil(child[1].length/4)}}" title="{{child[0]}}"><em>{{child[0]}}：</em></th>\n            {{each child[1] as item index}}\n              {{if index > 0 && index % 4 == 0}}</tr>{{if index < child[1].length - 1}}<tr>{{/if}}{{/if}}\n              <td>\n                <label title="{{raw[item]}}"><input type="{{if !(multi > 1)}}radio{{else}}checkbox{{/if}}" {{if type[item]}}class="isTitle"{{/if}} value="{{item}}" parent="{{item.substr(0,2)}}00">{{raw[item]}}</label>\n              </td>\n              {{if index == child[1].length - 1 && (index+1) % 4 > 0}}<td colspan="{{4-(index+1)%4}}"></td>{{/if}}\n            {{/each}}\n          </tr>\n        </tbody>\n      {{/each}}\n    </table>\n  </div>\n\n  <h3 class="ck-title">{{lang.postAll}}</h3>\n  <div class="ck-job-all J_ck-all">\n    <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n      {{each all as child index}}\n        {{if index % 4 == 0 && index < all.length - 1}}<tr>{{/if}}\n        <td>\n          <span title="{{type[child[0]]}}" data-id="{{child[0]}}" data-index="{{index}}">{{type[child[0]]}}</span>\n        </td>\n        {{if index == all.length - 1 && (index+1) % 4 > 0}}<td colspan="{{4-(index+1)%4}}"></td>{{/if}}\n        {{if (index > 0 && index % 4 == 4) || index == all.length - 1}}</tr>{{/if}}\n      {{/each}}\n    </table>\n  </div>\n\n</div>\n',
    data: m,
    emp: {
      "item-new": m.showNew
    },
    tip: "请选择职位",
    ratio: 12,
    mui: {}
  };
  g.data.lang = v;
  function k(e, t) {
    s.run($.extend({}, g, e), t);
  }
  k.skin = s.skin,
      k.data = g.data;
  var b = {}
      , x = [["", []], ["", []], ["", []], ["", []], ["", []]]
      , y = static_data.province;
  $.map(static_data.province, function(e, t) {
    b[e.code] = e.abbr;
  }),
      $.map(y, function(e, t) {
        var n = parseInt(t / 8);
        x[n][1].push(e.code.substring(0, 2));
      }),
      $.map(static_data.city, function(e) {
        b[e.code] = e.abbr;
      });
  var w, _, A = {
    name: "area",
    tpl: '<div class="ve-w-cock">\n  <div class="ck-std" {{if !(multi > 1)}}style="display:none;"{{/if}}>\n    <h4>{{lang.areaStd}}：</h4>\n    <div class="ck-std-list"></div>\n  </div>\n\n    {{if allowed}}\n        <h3 class="ck-title">{{lang.areaHot}}</h3>\n        <div class="ck-area-hot J_ck-hot">\n          <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n            <tbody>\n            {{each hot as child ps}}\n              {{if ps % h_col.length == 0}}<tr>{{/if}}\n                <th>{{child[0]}}</th>\n                {{each child[1] as item index}}\n                  <td>\n                    {{if inArray(item, allowed) === -1}}\n                        <span title="{{raw[item]}}" class="disabled"><input type="{{if !(multi > 1)}}radio{{else}}checkbox{{/if}}" {{if type[item]}}class="isTitle"{{/if}} value="{{item}}" parent="{{item.substr(0,2)}}0000">{{raw[item]}}</span>\n                    {{else}}\n                        <label title="{{raw[item]}}"><input type="{{if !(multi > 1)}}radio{{else}}checkbox{{/if}}" {{if type[item]}}class="isTitle"{{/if}} value="{{item}}" parent="{{item.substr(0,2)}}0000">{{raw[item]}}</label>\n                    {{/if}}\n                  </td>\n                {{if index == child[1].length - 1 && (index+1) % h_col[ps%h_col.length] > 0}}<td colspan="{{h_col[ps%h_col.length]-(index+1)%h_col[ps%h_col.length]}}"></td>{{/if}}\n                {{/each}}\n              {{if ps % h_col.length == h_col.length - 1}}</tr>{{/if}}\n            {{/each}}\n            </tbody>\n          </table>\n        </div>\n\n        <h3 class="ck-title">{{lang.areaAll}}</h3>\n        <div class="ck-area-all J_ck-all">\n          <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n            {{each a_ll as child index}}\n            <tr>\n              <th>{{child[0]}}</th>\n              {{each child[1] as item ps}}\n              <td>\n                {{if inArray(item+\'0000\', allowed) > -1 }}\n                    <span\n                        title="{{type[item+\'0000\']}}"\n                        data-id="{{item}}0000"\n                        data-index="{{parseInt(item, 10)}}">\n                        {{raw[item+\'0000\']}}\n                    </span>\n                {{else}}\n                    <div\n                        title="{{type[item+\'0000\']}}"\n                        data-id="{{item}}0000"\n                        class="disabled"\n                        style="padding:0 5px;"\n                        data-index="{{parseInt(item, 10)}}">\n                        {{raw[item+\'0000\']}}\n                    </div>\n                {{/if}}\n              </td>\n              {{/each}}\n            </tr>\n            {{/each}}\n          </table>\n        </div>\n\n\n      {{else}}\n\n\n        <h3 class="ck-title">{{lang.areaHot}}</h3>\n        <div class="ck-area-hot J_ck-hot">\n          <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n            <tbody>\n            {{each hot as child ps}}\n              {{if ps % h_col.length == 0}}<tr>{{/if}}\n                <th>{{child[0]}}</th>\n                {{each child[1] as item index}}\n                  <td> <label title="{{raw[item]}}"><input type="{{if !(multi > 1)}}radio{{else}}checkbox{{/if}}" {{if type[item]}}class="isTitle"{{/if}} value="{{item}}" parent="{{item.substr(0,2)}}0000">{{raw[item]}}</label> </td>\n                {{if index == child[1].length - 1 && (index+1) % h_col[ps%h_col.length] > 0}}<td colspan="{{h_col[ps%h_col.length]-(index+1)%h_col[ps%h_col.length]}}"></td>{{/if}}\n                {{/each}}\n              {{if ps % h_col.length == h_col.length - 1}}</tr>{{/if}}\n            {{/each}}\n            </tbody>\n          </table>\n        </div>\n\n        <h3 class="ck-title">{{lang.areaAll}}</h3>\n        <div class="ck-area-all J_ck-all">\n          <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n            {{each a_ll as child index}}\n            <tr>\n              <th>{{child[0]}}</th>\n              {{each child[1] as item ps}}\n              <td>\n                <span\n                    title="{{type[item+\'0000\']}}"\n                    data-id="{{item}}0000"\n                    data-index="{{parseInt(item, 10)}}">\n                    {{raw[item+\'0000\']}}\n                </span>\n              </td>\n              {{/each}}\n            </tr>\n            {{/each}}\n          </table>\n        </div>\n\n      {{/if}}\n</div>',
    data: {
      raw: b,
      a_ll: x,
      h_col: [3, 6],
      hot: [["华北-东北 ", ["010000", "020000", "161300", "160100", "240200", "140100", "120100"]], ["", []], ["华东地区 ", ["030000", "050100", "050200", "061100", "060900", "060100", "350100"]], ["", []], ["华南-华中 ", ["070100", "070200", "070500", "071900", "230100", "300100", "080100"]], ["", []], ["西北-西南 ", ["040000", "200100", "100100", "210100"]]]
    },
    tip: "请选择工作地点",
    ratio: 3,
    parent: !1,
    mui: {}
  };
  A.data.lang = v,
      A.data.type = {},
      A.data.all = [];
  for (w in A.data.raw)
    _ = parseInt(w.match(/\d{2}/), 10),
        /0{4}$/.test(w) ? (A.data.type[w] = A.data.raw[w],
            A.data.all[_] = [w, []]) : A.data.all[_][1].push(w);
  function S(e, t) {
    var n = $.extend({}, A, e);
    if (e.allowed) {
      var i = e.allowed.toString().split(",")
          , a = [];
      $.map(i, function(e) {
        "0000" === e.substring(2) && a.push(e);
      }),
          $.map(a, function(e) {
            var t = e.substring(0, 2);
            $.map(static_data.city, function(e) {
              var n = e.code.substring(0, 2);
              t === n && i.push(e.code);
            });
          }),
          n.allowed = i,
          n.data.allowed = i;
    }
    s.run(n, t);
  }
  S.skin = s.skin,
      S.data = A.data;
  var T = {}
      , I = [];
  $.map(static_data.company_industry, function(e) {
    T[e.code] = e.name;
  }),
      $.map(static_data.company_industry, function(e) {
        I.push(e.code);
      });
  var j, C, J = {
    name: "class",
    tpl: '<div class="ve-w-cock">\n  <div class="ck-std" {{if !(multi > 1)}}style="display:none;"{{/if}}>\n    <h4>{{lang.classStd}}：</h4>\n    <div class="ck-std-list"></div>\n  </div>\n\n  <h3 class="ck-title">{{lang.classAll}}</h3>\n  <div class="ck-class-all J_ck-all">\n    <table cellpadding="0" cellspacing="0" border="0" class="ck-table">\n      <tr>\n      {{each all as item index}}\n        {{if index % 4 == 0 && index < all.length - 1}}<tr>{{/if}}\n        <td>\n          {{if all[index][1].length}}\n          <span title="{{type[item[0]]}}" data-id="{{item[0]}}" data-index="{{index}}">{{type[item[0]]}}</span>\n          {{else}}\n          <label title="{{type[item[0]]}}"><input type="{{if !(multi > 1)}}radio{{else}}checkbox{{/if}}" value="{{item[0]}}">{{type[item[0]]}}</label>\n          {{/if}}\n        </td>\n        {{if index == all.length - 1 && (index+1) % 4 > 0}}<td colspan="{{4-(index+1)%4}}"></td>{{/if}}\n        {{if (index > 0 && index % 4 == 3) || index == all.length - 1}}</tr>{{/if}}\n      {{/each}}\n    </table>\n  </div>\n\n</div>\n',
    data: {
      raw: T,
      a_ll: I
    },
    tip: "请选择行业",
    ratio: 12,
    parent: !1,
    mui: {}
  };
  for (J.data.lang = v,
           J.data.type = {},
           J.data.all = [],
           j = 0; j < J.data.a_ll.length; j++)
    C = J.data.a_ll[j],
        J.data.type[C] = J.data.raw[C],
        J.data.all.push([C, []]);
  function H(e, t) {
    s.run($.extend({}, J, e), t);
  }
  return H.skin = s.skin,
      H.data = J.data,
      e.base = s,
      e.helper = o,
      e.post = k,
      e.area = S,
      e["class"] = H,
      e;
}({});
//# sourceMappingURL=cock.js.map
console.log(111, Cock)
