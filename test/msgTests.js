QUnit.module("MessagesViewModel");
QUnit.test("Ctor", function (assert) {
    var messagesViewModel = new MessagesViewModel();
    assert.notEqual(messagesViewModel, null, "Object construction failed.");
});

QUnit.test("InitialState", function (assert) {
    var messagesViewModel = new MessagesViewModel();
    assert.equal(messagesViewModel.messageCollection().length, 0, "Message collection should be empty upon initialization");
    assert.equal(messagesViewModel.hasMessages(), false, "HasMessages flag should be 'false'");
});

QUnit.test("AddMessage", function (assert) {
    var messagesViewModel = new MessagesViewModel();
    messagesViewModel.addMessage({Id:1,MessageText:"This is a test"});
    assert.equal(messagesViewModel.messageCollection().length, 1, "Message collection should have one entry.");
    assert.equal(messagesViewModel.hasMessages(), true, "HasMessages flag should be 'true'");
});

QUnit.test("AddMessage_multiple", function (assert) {
    var messagesViewModel = new MessagesViewModel();
    var msg1 = { Id: 1, MessageText: "This is a test" };
    var msg2 = { Id: 99, MessageText: "This is a second test" };
    messagesViewModel.addMessage(msg1);
    messagesViewModel.addMessage(msg2);
    assert.equal(messagesViewModel.messageCollection().length, 2, "Message collection should have two entries.");
    assert.equal(messagesViewModel.hasMessages(), true, "HasMessages flag should be 'true'");

    // Do a deep compare to make sure the items in the 
    // collection are correct
    assert.deepEqual(messagesViewModel.messageCollection()[0], msg1, "DeepCompare 1st Message");
    assert.deepEqual(messagesViewModel.messageCollection()[1], msg2, "DeepCompare 2nd Message");
});