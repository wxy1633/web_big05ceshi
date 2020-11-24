$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form
    // 从layui中获取 layer
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({

        // 自定义一个叫pwd校验规则
        // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 两次密码不一致没有检验
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致！'
        }
    })
    // 监听注册表单提交
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认行为
        e.preventDefault()
        var data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        }
        // 2.发起Ajax的POST请求
        $.post('/api/reguser', data, function (res) {
            console.log(res.status);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录！')
            $('#link_login').click()
        })

    })
    // 监听登录表单提交
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                // 将登录成功得到的token字符串，保存到location中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})