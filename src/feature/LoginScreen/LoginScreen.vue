<script>
import { IS_LOGIN } from "@/helper/constants.js";
export default {
  data() {
    return {
      account: {
        user: "",
        password: "",
      },
      error: {
        user: "",
        password: "",
      },
    };
  },

  methods: {
    checkUser(user) {
      if (user.length < 6) {
        this.error.user = "username must more than 6 character";
        return false;
      } else {
        this.error.user = "";
        return true;
      }
    },
    checkPassword(password) {
      if (password.length < 6) {
        this.error.password = "password must more than 6 character";
        return false;
      } else {
        this.error.password = "";
        return true;
      }
    },
    handleSubmit() {
      if (
        this.checkUser(this.account.user) &&
        this.checkPassword(this.account.password)
      ) {
        localStorage.setItem("isLogin", IS_LOGIN);
        this.$router.push({ path: "/" });
      } else alert(this.error.user || this.error.password);
    },
  },

  mounted() {
    this.error = {
      user: "",
      password: "",
    };

    let isLogin = localStorage.getItem("isLogin");
    if (isLogin == IS_LOGIN) this.$router.push({ path: "/" });
  },
};
</script>
<template>
  <section class="login-wrapper">
    <div class="login">
      <h1>Login</h1>
      <div class="form">
        <div class="input-wrapper username">
          <input
            v-model="account.user"
            type="text"
            required
            @keyup.enter="handleSubmit"
          />
          <span></span>
          <label class="username" :class="{ error: error.user != '' }"
            >Username</label
          >
        </div>
        <div class="input-wrapper password">
          <input
            v-model="account.password"
            type="password"
            required
            @keyup.enter="handleSubmit"
          />
          <span></span>
          <label :class="{ error: error.password != '' }">Password</label>
        </div>
        <div class="pass">Forgot Password?</div>
        <button class="submit" type="submit" @click="handleSubmit">
          Login
        </button>
        <div class="signup">Not a member? <a href="#">Signup</a></div>
      </div>
    </div>
  </section>
</template>

<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
}
.login h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
  color: #03a9f4;
}
.login .form {
  padding: 0 40px;
  box-sizing: border-box;
}
.form .input-wrapper {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.input-wrapper input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}
.input-wrapper span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: 0.5s;
}
.input-wrapper input:focus ~ label,
.input-wrapper input:valid ~ label {
  top: -5px;
  color: #2691d9;
}
.input-wrapper input:focus ~ label.error,
.input-wrapper input:valid ~ label.error {
  color: red;
}
.input-wrapper input:focus ~ span::before,
.input-wrapper input:valid ~ span::before {
  width: 100%;
}
.pass {
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
}
.pass:hover {
  text-decoration: underline;
}
.form .submit {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}
.form .submit:hover {
  border-color: #2691d9;
  transition: 0.5s;
}
.signup {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup a {
  color: #2691d9;
  text-decoration: none;
}
.signup a:hover {
  text-decoration: underline;
}

.input-wrapper .error {
  color: red;
}
</style>
