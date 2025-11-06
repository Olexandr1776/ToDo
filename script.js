let ListOfTask = [];
let inputsCreated = false;

let InputNameofTask;


let descriptionNameofTask;



const container_task_show = document.getElementById("container");


function Task(name, description, isReady = false){
    this.name = name;
    this.description = description;
    this.isReady = isReady;
}



function renderTasks() {
    container_task_show.innerHTML = '';

    for (let i = 0; i < ListOfTask.length; i++) {
        const showtask = document.createElement("div");
        showtask.classList.add("showtask_container");

        const buttonready = document.createElement("button");
        buttonready.classList.add("ButtonReady");
     

        const button_task_settins = document.createElement("button");
        const context_menu = document.createElement("div");

        button_task_settins.classList.add("button_task_settins");
        button_task_settins.textContent = "⋮";

        const button_task_settins_div = document.createElement("div");
        button_task_settins_div.classList.add("button_task_settins_div");
        button_task_settins_div.appendChild(button_task_settins);

        button_task_settins.addEventListener('click', (e) => {
         e.stopPropagation();
     
        
         const existingMenu = button_task_settins_div.querySelector(".context_menu");
         if (existingMenu) {
             existingMenu.remove();
             return;
         }
     
   
         document.querySelectorAll(".context_menu").forEach(menu => menu.remove());
     
       
         const context_menu = document.createElement("div");
         context_menu.classList.add("context_menu");
     
         const delete_button = document.createElement("button");
         delete_button.textContent = "Delete";
     
         const rename_button = document.createElement("button");
         rename_button.textContent = "Raname";
     
         rename_button.addEventListener("click", () => {
             const newName = prompt("Enter new name:", ListOfTask[i].name);
             if (newName && newName.trim() !== "") {
                 ListOfTask[i].name = newName;
                 renderTasks();
             }
         });
     
    delete_button.addEventListener("click", () => {
        ListOfTask.splice(i, 1);
        renderTasks();
    });

    context_menu.appendChild(rename_button);
    context_menu.appendChild(delete_button);

    button_task_settins_div.appendChild(context_menu);

    const rect = context_menu.getBoundingClientRect();
    const overflowRight = rect.right > window.innerWidth;
    const overflowBottom = rect.bottom > window.innerHeight;
    
    if (overflowRight) {
     
        context_menu.style.left = `-${rect.width}px`;
    }
    if (overflowBottom) {
   
        context_menu.style.top = `-${rect.height}px`;
    }
});


        buttonready.addEventListener('click', () => {
            ListOfTask.splice(i, 1);
            renderTasks();
        });

        const button_task_settins_left = document.createElement("div");
        button_task_settins_left.classList.add("button_task_settins_left");
        button_task_settins_left.appendChild(button_task_settins_div);

        const button_task_settins_right = document.createElement("div");
        button_task_settins_right.classList.add("button_task_settins_right");

        const nameoftask = document.createElement("p");
        const descriptiontask = document.createElement("p");

        nameoftask.textContent = `name: ${ListOfTask[i].name}`;
        descriptiontask.textContent = ListOfTask[i].description.trim()
            ? `description: ${ListOfTask[i].description}`
            : "";

        button_task_settins_right.appendChild(buttonready);
        button_task_settins_right.appendChild(nameoftask);
        button_task_settins_right.appendChild(descriptiontask);

        showtask.appendChild(button_task_settins_right);
        showtask.appendChild(button_task_settins_left);

        container_task_show.appendChild(showtask);
    }
}


document.addEventListener('click', () => {
    document.querySelectorAll(".context_menu").forEach(menu => menu.remove());
});




const AddButton = document.getElementById("Add_Task");

 AddButton.addEventListener('click', () => {


    if(!inputsCreated){
           InputNameofTask = document.createElement("input");
           descriptionNameofTask = document.createElement("input");
      
           InputNameofTask.classList.add("InputNameofTask");
           InputNameofTask.placeholder = "Name of task: ";

           descriptionNameofTask.classList.add("InputNameofTask");
           descriptionNameofTask.placeholder = "description of task: ";

           let container_input = document.getElementById("container_input");
           container_input.appendChild(InputNameofTask);
           container_input.appendChild(descriptionNameofTask);
    

           inputsCreated = true;
      
      
    }else{
            if (!InputNameofTask.value.trim()) {
                alert("Enter name of task");
                return;
            }

           let task = new Task(InputNameofTask.value, descriptionNameofTask.value);
              
           ListOfTask.push(task);

           renderTasks();

           descriptionNameofTask.remove();
           InputNameofTask.remove();
      
           console.log("Добавлена задача:", task);
           inputsCreated = false;
    }
 })





