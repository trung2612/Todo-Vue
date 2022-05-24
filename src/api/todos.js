const todos = [
  {
    id: 1,
    name: "Do homework",
    status: "not complete",
  },
  {
    id: 2,
    name: "Learning English",
    status: "not complete",
  },
  {
    id: 3,
    name: "Go out",
    status: "completed",
  },
  {
    id: 4,
    name: "Present project",
    status: "not complete",
  },
];

export default {
  async getTodos() {
    await wait(100);
    return todos;
  },
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
