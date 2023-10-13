export default {
    notEmpty: [
        {
            required: true,
            trigger: 'blur',
            message: '不能为空',
        }
    ],
    notArrayEmpty: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value.indexOf('') >= 0) {
                    callback(new Error('选项不能为空'))
                } else {
                    callback()
                }
            }
        }
    ],
    limit0: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value <= 0) {
                    callback(new Error('数值需大于0'))
                } else {
                    callback()
                 }
            }
        }
    ],
    notNegative: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error('数值不能为负数'))
                } else {
                    callback()
                 }
            }
        }
    ],
    userName: [{
        required: true,
        message: '账号不能为空',
        trigger: 'blur'
    }],
    passwd: [{
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
    }],
    url: [{
        required: true,
        message: '请输入合法链接',
        trigger: 'change'
    }],
    image: [{
        required: true,
        message: '请上传图片',
        trigger: 'change'
    }],
    fundCode: [{
        required: true,
        message: '请输入至少6位基金代码',
        trigger: 'change',
        min: 6
    }],
}