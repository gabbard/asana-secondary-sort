// This script finds each Asana task group (the Today, Upcoming, and Recently Assigned sections)
// and sorts the tasks within each group by due date.
// The function to do the sorting of each group comes first,
// followed by the logic to find each task group and apply the function to it.

// Make usage of the JSJoda date library more compact below.
const LocalDate = JSJoda.LocalDate;
const DayOfWeek = JSJoda.DayOfWeek;
const TemporalAdjusters = JSJoda.TemporalAdjusters;

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
        tasksAsArray.sort(taskDateComparator);
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

function taskDateComparator(firstTask, secondTask) {
    let firstTaskDate = extractTaskDate(firstTask);
    let secondTaskDate = extractTaskDate(secondTask);

    // Anything which lacks a date is treated as "Today".
    if (firstTaskDate == null) {
        firstTaskDate = LocalDate.now()
    }

    if (secondTaskDate == null) {
        secondTaskDate = LocalDate.now()
    }

    const ret = firstTaskDate.compareTo(secondTaskDate);
    console.log("Comparing " + firstTask.textContent + " to " + secondTask.textContent + ": " + ret);
    return ret;
}

function extractTaskDate(task) {
    const currentDate = LocalDate.now();
    const dateElements = task.getElementsByClassName("DueDateContainer");

    if (dateElements.length > 1) {
        console.log("Warning: got multiple date elements for task " + task + ", using the first");
    }

    if (dateElements.length > 0) {
        const dateElement = dateElements[0];
        const dateString = dateElement.textContent;

        const dayOfWeek = toDayOfWeek(dateString);

        if (dateString == "Today") {
            return currentDate;
        } else if (dateString == "Yesterday") {
            return currentDate.minusDays(1);
        } else if (dateString == "Tomorrow") {
            return currentDate.plusDays(1);
        } else if (dayOfWeek != null) {
            // e.g. "Wednesday"
            return currentDate.with(TemporalAdjusters.next(dayOfWeek));
        } else {
            // TODO: Dec 15
            // TODO: Jan 5, 2021
            console.log("Don't know how to parse " + dateString);
            return null;
        }
    } else {
        // No due date is specified for this task. 
        return null;
    }
}

function toDayOfWeek(dateString) {
    switch (dateString) {
        case "Monday":
            return DayOfWeek.MONDAY;
        case "Tuesday":
            return DayOfWeek.TUESDAY;
        case "Wednesday":
            return DayOfWeek.WEDNESDAY;
        case "Thursday":
            return DayOfWeek.THURSDAY;
        case "Friday":
            return DayOfWeek.FRIDAY;
        case "Saturday":
            return DayOfWeek.SATURDAY;
        case "Sunday":
            return DayOfWeek.SUNDAY;
        default:
            return null;
    }
}

// Logic for finding and task groups and applying the sorting function to each one.
// this is the div which contains the Recently Assigned, Today, and Upcoming task groups
const taskGroupContainers = document.getElementsByClassName("TaskGroup-subgroups");

for (let taskGroupContainer of taskGroupContainers) {
   console.log(taskGroupContainer);
   for (let taskGroupDiv of taskGroupContainer.children) {
        sortTasksByDueDate(taskGroupDiv);
    }
}
