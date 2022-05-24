<script>
import { mapState, mapActions } from "vuex";
import { IS_LOGIN } from "@/helper/constants.js";
import MainHeader from "@/components/MainHeader/MainHeader.vue";

export default {
  components: { MainHeader },
  data() {
    return {
      inputs: {
        name: "",
      },
      errors: {
        name: "",
        description: "",
      },
      selected: "all",
      filterTodo: {},
      show: "true",
      search: "",
    };
  },

  computed: mapState({
    todos: (state) => state.todosModule.todos,
  }),

  methods: {
    ...mapActions({
      onGetTodos: "todosModule/getTodos",
    }),

    clearInputs() {
      this.inputs = {
        name: "",
        description: "",
      };
    },

    handleAddTodo() {
      this.todos.push({
        id: !!this.todos.length ? this.todos.at(-1).id + 1 : 1,
        name: this.inputs.name,
        status: "not complete",
      });
      this.filterTodo = this.todos.filter((item) =>
        item.name.includes(this.search)
      );

      this.clearInputs();
    },

    handleCompleteTodo(todo) {
      let completedTodoIndex = this.todos.indexOf(todo);
      let replacedTodo = { ...todo, status: "completed" };
      if (completedTodoIndex > -1)
        this.todos[completedTodoIndex] = replacedTodo;
      this.filterTodo = this.todos.filter((item) =>
        item.name.includes(this.search)
      );
    },

    handleDeleteTodo(todo) {
      let deletedTodoIndex = this.todos.indexOf(todo);
      if (deletedTodoIndex > -1) {
        this.todos.splice(deletedTodoIndex, 1);
        this.filterTodo = this.todos.filter((item) =>
          item.name.includes(this.search)
        );
      }
    },

    handleSearchTodo() {
      if (this.selected === "all") {
        this.filterTodo = this.todos.filter((item) =>
          item.name.includes(this.search)
        );
      } else if (this.selected === "completed") {
        this.filterTodo = this.todos.filter(
          (item) => item.status === "completed"
        );
      } else if (this.selected === "uncompleted") {
        this.filterTodo = this.todos.filter(
          (item) => item.status === "not complete"
        );
      }
      this.filterTodo = this.filterTodo.filter((item) =>
        item.name.includes(this.search)
      );
    },
  },

  async created() {
    let isLogin = localStorage.getItem("isLogin");
    if (isLogin != IS_LOGIN) this.$router.push({ path: "/login" });
    await this.onGetTodos();
    this.filterTodo = this.todos;
  },

  watch: {
    selected: {
      handler() {
        if (this.selected === "all") {
          this.filterTodo = this.todos.filter((item) =>
            item.name.includes(this.search)
          );
        } else if (this.selected === "completed") {
          this.filterTodo = this.todos.filter(
            (item) =>
              item.status === "completed" && item.name.includes(this.search)
          );
        } else if (this.selected === "uncompleted") {
          this.filterTodo = this.todos.filter(
            (item) =>
              item.status === "not complete" && item.name.includes(this.search)
          );
        }
      },
      deep: true,
    },

    todos: {
      deep: true,
    },
  },
};
</script>
<template>
  <div class="todo-screen">
    <MainHeader />
    <header>
      <h1>Welcome to my Todo List</h1>
    </header>

    <div class="todo-wrapper">
      <input
        type="text"
        class="todo-input"
        maxlength="40"
        v-model="inputs.name"
        @keyup.enter="handleAddTodo"
      />
      <button class="todo-button" type="submit" @click="handleAddTodo">
        <!-- <i class="fas fa-plus-square" aria-hidden="true"></i> -->
        +
      </button>
      <div class="select">
        <select v-model="selected" class="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </div>

    <div class="search-wrapper">
      <input
        type="text"
        class="search-input"
        v-model="search"
        maxlength="40"
        @keyup="handleSearchTodo"
      />
      <button class="search-button" type="submit" @click="handleSearchTodo">
        Search
      </button>
    </div>

    <div class="todo-container">
      <ul class="todo-list">
        <TransitionGroup name="slide-fade">
          <div
            class="todo"
            v-for="todo in filterTodo"
            :class="{ completed: todo.status == 'completed' }"
            :key="todo.id"
          >
            <li class="todo-item">
              <span v-if="todo.status == 'completed'">{{ todo.name }}</span
              ><input
                v-if="todo.status == 'not complete'"
                v-model="todo.name"
              />
            </li>
            <button class="check-btn" @click="handleCompleteTodo(todo)">
              Complete</button
            ><button class="trash-btn" @click="handleDeleteTodo(todo)">
              Delete
            </button>
            <p v-if="show"></p>
          </div>
        </TransitionGroup>
      </ul>
    </div>
  </div>
</template>
<style>
* {
  scroll-behavior: smooth;
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:focus,
*:active {
  outline: 0 !important;
  box-shadow: 0 !important;
}

body {
  background: rgb(68, 100, 173);
  background: linear-gradient(
    100deg,
    rgba(68, 100, 173, 1),
    rgba(74, 21, 110, 1)
  );
  color: white;
  min-height: 100vh;
  margin-bottom: 2rem;
}

header {
  text-shadow: 2px 2px 15px rgb(176, 230, 255);
  font-size: 1.2rem;
}

header {
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-wrapper input,
.todo-wrapper button {
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-size: 1.8rem;
  border: none;

  background: #f4f4f4;
}

.todo-wrapper button {
  padding: 0.5rem 1rem;
  color: rgba(74, 21, 110, 1);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.todo-wrapper button:hover {
  background: rgba(74, 21, 110, 1);
  color: white;
}

.todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
  min-width: 30%;
  list-style: none;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;
  background: white;
  font-size: 1.5rem;
  transition: all 0.5s ease;
}

.todo-wrapper input,
.todo {
  color: rgb(88, 87, 87);
}

.todo li {
  flex: 1;
}

.search-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 6vh;
  padding-top: 1rem;
}

.search-input {
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-size: 1.8em;
  border: none;
  background: #f4f4f4;
  color: rgb(88, 87, 87);
  width: 33%;
}

.search-button {
  padding: 0.5rem 1rem;
  color: rgba(74, 21, 110, 1);
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.4rem;
  border: none;
}

.trash-btn,
.check-btn {
  background-color: rgba(74, 21, 110, 1);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.2s all ease;
}

.check-btn {
  background-color: rgba(68, 100, 173, 1);
}

.check-btn:hover {
  background-color: rgba(68, 100, 173, 1);
  color: white;
}

.trash-btn:hover {
  color: white;
  background-color: rgba(74, 21, 110, 1);
}

.todo-item {
  padding: 0rem 1.2rem;
}
.todo-item input {
  border: none;
  font-size: 1.4rem;
  color: rgb(88, 87, 87);
}

.fa-trash,
.fa-check {
  pointer-events: none;
}

.completed,
.completed input {
  opacity: 0.6;
  text-decoration: line-through;
}

.fall {
  animation: fall-apart 0.5s ease-out;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@keyframes fall-apart {
  100% {
    transform: rotateZ(20deg) translateY(8rem);
    opacity: 0;
  }
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  font-size: 1.2em;
  color: rgba(74, 21, 110, 1);
  width: 15rem;
  cursor: pointer;
  padding: 1rem;
}

.select {
  margin-left: 1rem;
  position: relative;
  overflow: hidden;
}

.select::after {
  content: "\25BC";
  position: absolute;
  background: rgba(74, 21, 110, 1);
  top: 0;
  right: 0;
  padding: 1.2rem;
  pointer-events: none;
  transition: all 0.3s ease;
}

.select:hover::after {
  background-color: white;
  color: rgba(74, 21, 110, 1);
}
</style>
