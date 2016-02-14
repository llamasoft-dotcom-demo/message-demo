function MessagesViewModel() {
    this.hasMessages = ko.observable(false);
    this.messageCollection = ko.observableArray();
    this.addMessage = function (messageModel) {
        this.messageCollection.push(messageModel);
        this.hasMessages = ko.observable(true);
    }.bind(this);

    this.handleMessage = function (txt) {
        // show the alert icon
        $("#msgIcon").show();  // TODO: base this on a VM property binding

        // Hide any manually added accordion elements
        $.each($("#accordion").children("[manual]"), function (index, value) {
            $(value).hide();
        });

        // show the counter icon
        var msgCounter = $("#msgCounter");
        var previousMsgCounterValue = !msgCounter.text() ? 0 : parseInt(msgCounter.text());
        var newCounterValue = previousMsgCounterValue + 1;
        var messageModel = new MessageModel();
        messageModel.Id = newCounterValue;
        messageModel.MessageText = txt;

        // slide in the message frame if necessary
        if ($(".sideBar").is(':visible') == false) {
            $(".sideBar").toggle("slide", { direction: "right" }, 500);


            $("#msgIcon").off("click", this.showAllMessages);
            $("#msgIcon").on("click", this.showAllMessages);
            // Unbinding and rebinding the event handler to prevent
            // duplicate bindings.  This way the slider isn't immediatly opened
            // again after clicking close.
            $(".headerClose").off("click", toggleSidebar); //first unbind
            $(".headerClose").on("click", toggleSidebar);  // rebind the handler
        }

        this.addMessage(messageModel);

        // Update the counter in the MessageHeader
        msgCounter.text(newCounterValue);

        // Add a new accordion item
        $("#accordion").accordion({ collapsible: true });
        $("<h3 id=hid-"+newCounterValue + ">Attention: " + newCounterValue + "</h3>").appendTo("#accordion");
        $("<div id=did-"+newCounterValue +">" + messageModel.MessageText + "</div>").appendTo("#accordion");
        $("#accordion").accordion("refresh");

        // HACK: simulating a click on the H3 is the best workaround I could
        //       find to both activate and expand the last item in the list.
        if (newCounterValue > 1) {
            $("#hid-" + newCounterValue).click();
        }

        // remove a message from the visible list after 3 seconds
        setTimeout(removeAccordionItem, 3000, newCounterValue);
    }

    this.showAllMessages = function () {

        var childHeaders = $("#accordion").children("h3");

        $.each(childHeaders, function (index, value) {
            // add a 'manual' flag that can later be used to identify any
            // items added manually versus via the messagePump
            $(value).attr("manual", "true");
            $(value).show();
        });

        var childDivs = $("#accordion").children("div");

        $.each(childDivs, function (index, value) {
            $(value).show();
        });

        $("#accordion").accordion({ collapsible: true });
        $("#accordion").accordion("refresh");
    }
}

function toggleSidebar()
{
    $(".sideBar").toggle("slide", { direction: "right" }, 500);
}

function removeAccordionItem(key)
{
    var div = $("#did-"+key);
    var h3 = $("#hid-"+key);
    div.add(h3).fadeOut('slow',function(){});
}

this.MsgViewModel = new MessagesViewModel();

ko.applyBindings(this.MsgViewModel);