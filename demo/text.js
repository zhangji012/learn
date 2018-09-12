// JavaScript Document
/******************************
 ** 文件描述 :  veryeast header login
 ** 时    间 ： 2018.6.1
 ** 作    者 ： gaozhiwen
 ** E-mail： gaozhiwen@dfwsgroup.com
 *******************************/

(function ($) {
  var login = {
    parameter: null,

    init: function () {
      this.parameter = {};
      this.loginInit();
      this.initSso();
      this.operate();
    },

    //数据
    loginInit: function () {
      this.parameter.autologin = 1;
      this.parameter['welcome'] = '<span class="top-item js-register-btn"><i' +
        ' class="top-register-icon"></i>最新消息</span><i class="splitline"></i><div class="top-item"><a href="http://i.veryeast.cn/user/register"' + ' rel="nofollow" target="_blank">免费注册</a></div><i' +
        ' class="splitline"></i><a   rel="nofollow" class="top-item" href="http://i.veryeast.cn/user/login?redirect=' + decodeURIComponent(location.href) + '">用户登录</a>';
      this.parameter['quit'] = '<span class="top-item top-logged"><span>您好，<a class="user-name" href="http://vip.veryeast.cn/">企业</a>，欢迎来到最佳东方！</span><a class="user-page" href="http://vip.veryeast.cn/">进入招聘通</a><a class="login-logout">[退出]</a></span>';
      this.parameter['quit2'] = '<span class="top-item top-logged"><span>您好，<a class="user-name" href="http://my.veryeast.cn/user/home/">个人</a>，欢迎来到最佳东方！</span><a class="user-page" href="http://my.veryeast.cn/user/home/">进入我的最佳东方</a><a class="login-logout">[退出]</a></span>';
      this.username = null;
    },

    initSso: function () {
      var me = this,
        sso = new SSO_Controller();
      sso.init({
        name: 'sso',
        encoding: 'utf-8',
        is_check_login_state: false,
        custom_login_state_callback: function (cookieinfo) {
          me.loginEnter(cookieinfo);
        }
      });
      //2017/1/5 对登录框不显示预处理
      if (sso && sso.getCookie("ticket") == null) {
        me.loginEnter(null);
      }
      this.sso = window.sso = sso;
      sso.custom_login_state_callback(sso.cookieinfo);


      var $top = $(".top_box");
      if (!sso.getCookie('top-register')) {
        $('.top-register-icon').css('display','inline-block');
      }
      $top.on('mouseenter', '.top-register-box, .js-top-login .js-register-btn', function () {
        $('.top-register-box').show() //stop().fadeIn(50);
      }).on('mouseleave', '.top-register-box, .js-top-login .js-register-btn', function () {
        $('.top-register-box').hide() // stop().fadeOut(200);
      })
      $top.on('mouseleave', '.top-register-box', function () {
        document.cookie = 'top-register=1;max-age=' + (60 * 60 * 24) + ';expires=' + new Date(Date.now() + (1000 * 60 * 60 * 24)).toUTCString();
        setTimeout(function () {
          $('.top-register-icon').fadeOut(300);
        }, 200)
      })
    },

    //登录后操作
    loginEnter: function (data) {
      var me = this,
        name, type;

      if (data && (me.parameter.username = name = data.username)) {
        type = data.user_type;
        if (1 == type) {
          $('.js-top-login').html(me.parameter.quit);
          $('.user-name').html(name);
          $('.register-bar').hide();
        } else if (2 == type) {
          $('.js-top-login').html(me.parameter.quit2);
          $('.user-name').html(name);
          $('.register-bar').hide();
        } else {
          $('.js-top-login').html(me.parameter.welcome);
        }

      } else {
        $('.js-top-login').html(me.parameter.welcome);
      }
    },

    //操作
    operate: function () {
      var me = this;
      //退出
      $('.js-top-login').on('click', '.login-logout', function () {
        me.sso.logout('script');
        me.initSso();
      });
    },
  };

  login.init();
}(jQuery))