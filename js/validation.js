const addBtn = document.querySelector(".add-btn")
const clearBtn = document.querySelector(".clear-btn")
const toDo = document.querySelector("ul")
const inputField = document.querySelector("input");
const taskCount = document.querySelector("span")
let tasksNum = 0

function createItem(taskText) {
    const item = document.createElement("li")
    item.innerHTML = `<div class="task">
    <p class="forDoing">${taskText}</p>
    <div class="btns">
    <button class="click-btn"><i class="fa-solid fa-check"></i></button>
    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
    </div>
    </div>`
    const text = item.querySelector(".forDoing")
    const clickBtn = item.querySelector(".click-btn")
    clickBtn.addEventListener("click", function () {
        text.classList.toggle("completed")
        if (text.classList.contains("completed")) {
            updateTaskCount(-1)
        } else {
            updateTaskCount(1)
        }
    })

    const deleteBtn = item.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", function () {
        item.remove()
        updateTaskCount(-1)
    })

    const editBtn = item.querySelector(".edit-btn")
    editBtn.addEventListener("click", function () {
        Swal.fire({
            title: "Edit your text",
            input: "textarea",
            inputValue: text.textContent,
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            preConfirm: async (text) => {
                try {
                    if (!text) {
                        throw new Error("Text cannot be empty");
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return text;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Error: ${error.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Text Saved",
                    text: result.value,
                    icon: "success"
                });
                text.textContent = result.value
            }
        });
    })
    return item;

}
addBtn.addEventListener("click", function (e) {
    e.preventDefault()
    const taskText = inputField.value
    if (taskText) {
        const item = createItem(taskText)
        toDo.append(item)
        toDo.classList.replace("d-none", "d-flex");
        inputField.value = "";
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        updateTaskCount(1);
    }
    else {
        Swal.fire("Input is empty!");
    }
})
clearBtn.addEventListener("click", function () {
    toDo.innerHTML = ''
    toDo.classList.replace("d-flex", "d-none")
    resetTaskCount()
})
function updateTaskCount(count) {
    tasksNum += count;
    if (tasksNum < 0) {
        tasksNum = 0
    }
    else {
        taskCount.textContent = tasksNum === 0 ? "no" : tasksNum;
    }
}
function resetTaskCount() {
    tasksNum = 0
    taskCount.textContent = "no"
}



