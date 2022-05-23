<script>
import { IS_LOGOUT } from "@/helper/constants.js";

export default {
  methods: {
    handleLogout() {
      localStorage.setItem("isLogin", IS_LOGOUT);
      this.$router.push({ path: "/login" })
    },
  },
};
</script>

<template>
  <div class="main-header">
    <h1>TODO PAGE</h1>
    <div class="navigate">
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.main-header {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c1c89;
  padding: 0 2rem;
}

.main-header h1 {
  color: white;
}

.main-header .navigate button {
  font: inherit;
  background: #313085;
  border: 1px solid #313085;
  padding: 0.5rem 1.5rem;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  border-radius: 20px;
  font-weight: bold;
}

.main-header .navigate button:focus {
  outline: none;
}

.main-header .navigate button:hover,
.main-header .navigate button:active {
  color: #f3cafb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.26);
}
</style>