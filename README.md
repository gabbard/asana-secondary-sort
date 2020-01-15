# asana-secondary-sorter

## What is asana-secondary-sorter?
The ability to sort tasks in Asana by a second criterion
after doing a top-level sort by a different criterion
has long been requested (https://forum.asana.com/t/sorting-in-asana/845/161)
but as of January 2020 has not been implemented.

This Chrome extension provides partial support for doing this.
If you are within the Recently Assigned/Today/Upcoming view, 
it will sort the tasks within each of those groups by due date.
Tasks with no due date are treated as due on the current day.
The relative order of tasks with the same due date is preserved.

## How can I install it?
Right now, you need to clone this repository,
go to `chrome://extensions`, choose "Load Unpacked",
and navigate to your clone.

Once this has been tested a bit more it will get uploaded
to the Chrome Web Store.

## Notes
* Asana seems to load the tasks dynamically,
  so if your task list is large, 
  tasks towards the end will not be sorted.
  The current workaround is to scroll all the way to the bottom
  and then hit `Ctrl+D`, which will trigger a re-sort.
* This only sorts your view of the tasks. 
  The task order remains the same as far as Asana is concerned.
* I am unsure that the sorting this extension does plays nicely
  with manual reordering in all cases.
* I don't actually know Javascript
  and largely hacked this out on a plane trip
  without Internet access by experimenting in the Chrome debugger.
  PRs from actual Javascript programmers to bring it in line with better 
  practices are very welcome.

## Author

Ryan Gabbard (ryan.gabbard@gmail.com)