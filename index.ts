const form = document.getElementById("myForm") as HTMLInputElement;
const textInput = document.getElementById("textInput") as HTMLInputElement;

let todos: any[] = [];

const dateInput = document.getElementById("dateInput") as HTMLInputElement;
const textarea = document.getElementById("textarea")! as HTMLInputElement;
const add = document.getElementById("add")! as HTMLInputElement;
const msg = document.getElementById("msg")!;
const tasks = document.getElementById("tasks")!;

const createTodo = async (e: any) => {
  e.preventDefault();
  let title = document.getElementById("textInput")! as HTMLInputElement;
  let description = document.getElementById("textarea")! as HTMLInputElement;
  let email = document.getElementById("emailInput")! as HTMLInputElement;
  let date = document.getElementById("dateInput")! as HTMLInputElement;

  fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: title.value,
      description: description.value,
      email: email.value,
      date: date.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        showError(data.error);
        return;
      }
      getTodos();
    })
    .catch((error: any) => {
      console.log(error);
    });
  console.log({ getTodos });

  resetForm();
};

const getTodos = () => {
  const todosBody = document.querySelector("#todos-body")!;

  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then(({ data }) => {
      todos = data;
      console.log(data);

      const dataResult = data
        .map((detail?: any) => {
          return `
          <tr>
                <td>${detail.title}</td>
                <td>${detail.description}</td>
                <td>${detail.email}</td>
                <td>${detail.date}</td>
                
                <td> <button data-id=${detail.id} onclick="handleEditBtnClick(this)" class="edit-button">Edit</button> </td>
                <td> <button data-id=${detail.id} onclick="handleDeleteBtnClick(this)" class="delete-button" >Delete</button> </td>
              </tr>
          `;
        })
        .join("");

      todosBody.innerHTML = dataResult;
    })

    .catch((error: any) => {
      console.log(error.message);
    });
};

const handleEditBtnClick = (e: HTMLElement) => {
  const id = e.getAttribute("data-id");
  const todo = todos.find((todo) => todo.id === id);
  (document.getElementById("textarea") as HTMLInputElement).value =
    todo.description;
  (document.getElementById("emailInput") as HTMLInputElement).value =
    todo.email;
  (document.getElementById("dateInput") as HTMLInputElement).value = todo.date;
  (document.getElementById("textInput") as HTMLInputElement).value = todo.title;
  (document.getElementById("idInput") as HTMLInputElement).value = todo.id;
  (document.getElementById("update-btn") as HTMLButtonElement).style.display =
    "inline";
  (document.getElementById("cancel-btn") as HTMLButtonElement).style.display =
    "inline";
  (document.getElementById("add") as HTMLButtonElement).style.display = "none";
};

const showError = (error: any) => {
  (document.getElementById("error-display") as HTMLButtonElement).innerHTML =
    error;
  (
    document.getElementById("error-display") as HTMLButtonElement
  ).style.display = "block";

  setTimeout(() => {
    (
      document.getElementById("error-display") as HTMLButtonElement
    ).style.display = "none";

    (document.getElementById("error-display") as HTMLButtonElement).innerHTML =
      "";
  }, 6000);
};

const handleDeleteBtnClick = (target: any) => {
  const id = target.getAttribute("data-id");

  fetch("http://localhost:3000/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      getTodos();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const cancelEdit = () => {
  (document.getElementById("update-btn") as HTMLButtonElement).style.display =
    "none";
  (document.getElementById("cancel-btn") as HTMLButtonElement).style.display =
    "none";
  (document.getElementById("add") as HTMLButtonElement).style.display = "block";
  resetForm();
};

const handleUpdate = () => {
  let title = (document.getElementById("textInput") as HTMLInputElement).value;
  let description = (document.getElementById("textarea") as HTMLInputElement)
    .value;
  let email = (document.getElementById("emailInput") as HTMLInputElement).value;
  let date = (document.getElementById("dateInput") as HTMLInputElement).value;
  let id = (document.getElementById("idInput") as HTMLInputElement).value;

  const data = { title, description, email, date };

  fetch("http://localhost:3000/" + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      getTodos();
      cancelEdit();
    })
    .catch((error: any) => {
      console.log(error);
    });
};

const resetForm = () => {
  (document.getElementById("textarea") as HTMLInputElement).value = "";
  (document.getElementById("dateInput") as HTMLInputElement).value = "";
  (document.getElementById("emailInput") as HTMLInputElement).value = "";
  (document.getElementById("textInput") as HTMLInputElement).value = "";
};

getTodos();

form.addEventListener("submit", createTodo);
