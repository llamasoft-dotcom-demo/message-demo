# message-demo
Sample project for prospects
First I want to put every message in a "well" (bootstrap component) so that the view is better and clear for the user. I also decided to assign a unique ID to each message, this ID will be automatically and dynamic generated.
Each message has two buttons, one that deletes and one that saves the message if wished. 
Following the requirements the messages will be deleted with a delay of 3 seconds. There for the message will be identified with the ID. 
In case a user wants to delete the message manually, with the remove(); method the message can be deleted. 
$(this).parent().remove() enables to delete exactly the selected message. 
$("#saveMessages").append($(this).parent()); this code saves the selected message. 
As the message must stay in the list is necessary to stop:
$("#" + i).delay(3000).fadeOut('fast'); 

Once the message is in the list, the save button (pin) will dissapear as it doesn't have any function, when the message is saved. Only the delete button is still visible and functioning. 


