"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("myForm");
const textInput = document.getElementById("textInput");
let todos = [];
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const add = document.getElementById("add");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const createTodo = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let title = document.getElementById("textInput");
    let description = document.getElementById("textarea");
    let email = document.getElementById("emailInput");
    let date = document.getElementById("dateInput");
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
        .catch((error) => {
        console.log(error);
    });
    console.log({ getTodos });
    resetForm();
});
const getTodos = () => {
    const todosBody = document.querySelector("#todos-body");
    fetch("http://localhost:3000/")
        .then((res) => res.json())
        .then(({ data }) => {
        todos = data;
        console.log(data);
        const dataResult = data
            .map((detail) => {
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
        .catch((error) => {
        console.log(error.message);
    });
};
const handleEditBtnClick = (e) => {
    const id = e.getAttribute("data-id");
    const todo = todos.find((todo) => todo.id === id);
    document.getElementById("textarea").value =
        todo.description;
    document.getElementById("emailInput").value =
        todo.email;
    document.getElementById("dateInput").value = todo.date;
    document.getElementById("textInput").value = todo.title;
    document.getElementById("idInput").value = todo.id;
    document.getElementById("update-btn").style.display =
        "inline";
    document.getElementById("cancel-btn").style.display =
        "inline";
    document.getElementById("add").style.display = "none";
};
const showError = (error) => {
    document.getElementById("error-display").innerHTML =
        error;
    document.getElementById("error-display").style.display = "block";
    setTimeout(() => {
        document.getElementById("error-display").style.display = "none";
        document.getElementById("error-display").innerHTML =
            "";
    }, 6000);
};
const handleDeleteBtnClick = (target) => {
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
        .catch((error) => {
        console.log(error);
    });
};
const cancelEdit = () => {
    document.getElementById("update-btn").style.display =
        "none";
    document.getElementById("cancel-btn").style.display =
        "none";
    document.getElementById("add").style.display = "block";
    resetForm();
};
const handleUpdate = () => {
    let title = document.getElementById("textInput").value;
    let description = document.getElementById("textarea")
        .value;
    let email = document.getElementById("emailInput").value;
    let date = document.getElementById("dateInput").value;
    let id = document.getElementById("idInput").value;
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
        .catch((error) => {
        console.log(error);
    });
};
const resetForm = () => {
    document.getElementById("textarea").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("textInput").value = "";
};
getTodos();
form.addEventListener("submit", createTodo);
