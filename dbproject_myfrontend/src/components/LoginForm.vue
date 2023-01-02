<template>
  <!-- 登录 -->
  <el-form
    :model="loginUser"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="login-form sign-in-form"
  >
    <el-form-item label="email" prop="email">
      <el-input v-model="loginUser.email" placeholder="Enter Email..." />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter Password..."
      />
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleLogin('loginForm')"
        type="primary"
        class="submit-btn"
        >submit</el-button
      >
    </el-form-item>
    <!-- 找回密码 -->
    <el-form-item>
      <p class="tiparea">forget password<a>Immediate retrieval</a></p>
    </el-form-item>
  </el-form>
</template>

<script>
import { getCurrentInstance,onMounted,ref, } from 'vue'
import { useRouter } from 'vue-router'
import {login} from '@/api/loginRegister'
import axios from 'axios'
import { loginUser } from '@/utils/loginValidators'
export default {
  name: 'LoginForm',
  props: {
    loginUser: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // 通过解构getCurrentInstance，获取this，这里的this就是ctx
    // @ts-ignore
    const { ctx,proxy } = getCurrentInstance()
    const router = useRouter()
    // 触发登录方法
    const handleLogin = (formName) => {
    console.log(ctx)
      ctx.$refs[formName].validate(async(valid) => {  
        if (valid) {
          console.log({"user":{"email":loginUser.email,"password":loginUser.password}})
            const res = await login({"user":{"email":loginUser.email,"password":loginUser.password}})
            proxy.$message.success(res.data)
            console.log("res",res.token)
            window.localStorage.setItem("token", res.token);
            // console.log("res.data",res)
            // console.log("res.data.token",res.data.token)
            // router.push('/userPage')
            if(res.users[0].username == 'admin'){
              router.push('/managerPage')
            }
            else{
              router.push('/userPage')
            }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    return { handleLogin}
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


