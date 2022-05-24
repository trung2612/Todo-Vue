import getTodosApi from '@/api/todos.js';

const state = () => ({
  todos: [],
});

const getters = {};

const actions = {
  async getTodos({commit}) {
    const response = await getTodosApi.getTodos();
    commit('setTodos', response);
  }
}

const mutations = {
   setTodos(state, todos){
    state.todos = todos;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};