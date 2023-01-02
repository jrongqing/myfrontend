import { ref, reactive  } from 'vue'

interface User{
  email: string;
  password: string;
}

// 登录表单
export const loginUser = reactive<User>({
  email: '',
  password: ''
})

interface Rules{
  email: {
      required: boolean;
      type: string;
      message: string;
      trigger: string;
  }[];
  password: ({
      required: boolean;
      message: string;
      trigger: string;
      min?: undefined;
      max?: undefined;
  } | {
      min: number;
      max: number;
      message: string;
      trigger: string;
      required?: undefined;
  })[];
}

// 校验规则
export const rules = reactive<Rules>({
  email: [
    {
      required: true,
      type: 'email',
      message: 'email格式错误',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度必须在6到30之间', trigger: 'blur' }
  ]
})
