<template>
    <!-- 登录 -->
    <el-form
      :model="registerUser"
      :rules="registerRules"
      ref="registerForm"
      label-width="100px"
      class="register-form sign-up-form"
    >
      <el-form-item label="UserName" prop="name">
        <el-input v-model="registerUser.name" placeholder="Enter Name..." />
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="registerUser.email" placeholder="Enter Email..." />
      </el-form-item>
      <el-form-item label="psw" prop="password">
        <el-input
          v-model="registerUser.password"
          type="password"
          placeholder="Enter Password..."
        />
      </el-form-item>
      <el-form-item label="confirm psw" prop="password2">
        <el-input
          v-model="registerUser.password2"
          type="password"
          placeholder="Enter Password again..."
        />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleRegister('registerForm')"
          type="primary"
          class="submit-btn"
          >submit</el-button
        >
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts">
  import { getCurrentInstance } from 'vue'
  import { register} from '@/api/loginRegister'
  import { useRouter } from 'vue-router'
  export default {
    name: 'registerForm',
    props: {
      registerUser: {
        type: Object,
        required: true
      },
      registerRules: {
        type: Object,
        required: true
      },

    },
    setup(props:any) {
      // 通过解构getCurrentInstance，获取this，这里的this就是ctx
      // @ts-ignore
      const {ctx,proxy } = getCurrentInstance()
      const router = useRouter()
      // 触发登录方法
      const handleRegister = (formName: string) => {
        console.log(ctx)
        ctx.$refs[formName].validate(async(valid: boolean) => {
          if (valid) {
            //console.log(props.registerUser.email)
            console.log("registeruser输入信息:",{"user":{"username":props.registerUser.name,"email":props.registerUser.email,"password":props.registerUser.password}})
            const res  = await register({"user":{"username":props.registerUser.name,"email":props.registerUser.email,"password":props.registerUser.password}}).then(function (resp) {return resp;})
            proxy.$message.success(res.data)
            //let JSONresult=JSON.parse(resp.data)
            console.log("data:",Response)
            router.push('/')
            console.log('submit!')
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
      return { handleRegister }
    }
  }
  </script>
  <style scoped>
  /* register */
  .login-form,
  .register-form {
    background-color: #fff;
    padding: 50px 80px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  
  .submit-btn {
    width: 100%;
  }
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
    width: 100%;
  }
  .tiparea a {
    color: #409eff;
  }
  </style>
  
  