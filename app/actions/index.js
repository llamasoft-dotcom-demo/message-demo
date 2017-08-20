export function onTextInputChange(value) {
    return {
        type: 'TEXT_INPUT',
        value
    };
}

export function clickMessageButton(buttonText) {
    return {
        type: 'TOGGLE_MESSAGE',
        buttonText: buttonText === 'Start' ? 'Stop' : 'Start', // toggle button status
        sendMessage: buttonText === 'Start' ? true : false // send/stop messages
    };
}
