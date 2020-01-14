alert("testing 1 2 3");
// This script finds each Asana task group (the Today, Upcoming, and Recently Assigned sections)
// and sorts the tasks within each group by due date.
// The function to do the sorting of each group comes first,
// followed by the logic to find each task group and apply the function to it.

const knownTaskGroupNames = ["Recently assigned", "Today", "Upcoming"];

function sortTasksByDueDate(taskGroupDiv) {
    console.log(taskGroupDiv);
    const taskGroupHeaderDiv = taskGroupDiv.children[0];
    if (knownTaskGroupNames.includes(taskGroupHeaderDiv.textContent)) {
        console.log("Sorting " + taskGroupHeaderDiv.textContent);
        const taskList= taskGroupDiv.children[1];
        console.log(taskList.children);
        const tasksAsArray = Array.prototype.slice.call(taskList.children);
        console.log("before");
        tasksAsArray.forEach(el => console.log(el.textContent)) ;
        tasksAsArray.sort(function(x, y) {
            return x.textContent.localeCompare(y.textContent)
        });
        console.log("after");
        tasksAsArray.forEach(el => console.log(el.textContent)) ;
        tasksAsArray.forEach(task => {
            // appendChild automatically removes the task from its previous location in the DOM.
            console.log("Appending");
            console.log(task);
            taskList.appendChild(task);
        });
        console.log("Sorted " + tasksAsArray);
    } else {
        console.log("Refusing to sort unknown task group " + taskGroupHeaderDiv.textContent);
    }
}

// Logic for finding and task groups and applying the sorting function to each one.
// this is the div which contains the Recently Assigned, Today, and Upcoming task groups
const taskGroupContainers = document.getElementsByClassName("TaskGroup-subgroups");

if (taskGroupContainers.length == 1) {
   const taskGroupContainer = taskGroupContainers[0];
   console.log(taskGroupContainer);
   for (let taskGroupDiv of taskGroupContainer.children) {
        sortTasksByDueDate(taskGroupDiv);
    }
}  else {
    console.log("Asana Secondary Sorter declining to run because multiple task group containers were encountered.");
}

