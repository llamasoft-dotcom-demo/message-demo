export const message = (state = {buttonText: 'Start'}, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE':
            return {
                ...state,
                buttonText: action.buttonText,
                sendMessage: action.sendMessage
            };
        case 'TEXT_INPUT':
            return {
                ...state,
                textFieldValue: action.value
            };
        default:
            return state;
    }
};

