import Vuex, { createStore } from "vuex";
import todosModule from "./modules/todos.js";

export default createStore({
  modules: {
    todosModule,
  },
});
