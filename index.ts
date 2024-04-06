#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"

let todoList: string [] = [];
let conditions = true;

console.log(chalk.bgMagentaBright.bold("\n \t Welcome to Hussain -Todo-List Application\n"));

let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("Select an option\n"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask ()
        }
        else if(option.choice === "Update Task"){
            await updateTask()
        }
        else if (option.choice === "View Todo-List"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            conditions = false;
            console.log(chalk.bgMagentaBright.bold("\n \tThanks For Using Hussain's Todo-List\n"));
        }
        
    }
}
// Function to add new task to the list.
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
           name: "task",
           type: "input",
           message:chalk.green("Enter your new task:\n") 
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.red.bold(`\n ${newTask.task} task added successfully in the Todo-List\n`));
}

// Function to view all Todo-List Tasks 
let viewTask =  () => {
    console.log(chalk.red.bold("\n Your Todo-List: \n"));
    todoList.forEach((task, index) => {
        console.log(chalk.red.bold(`${index + 1}: ${task}\n`))
    })
}

// Function to delete a task from the list.
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the 'index no.' of the task you want to delete:"),
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.red.bold(`\n ${deleteTask}, this task is been deleted successfully from your Todo-List\n`));
}

// Function to update a task.
let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the index of the task you want to update: ")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.green("Now Enter new task name:"),
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task
    console.log(chalk.red.bold(`\n Task at index no. ${update_task_index.index - 1} updated successfully [for updated list Check option: "View-Todo_List"]\n`))
}

main();