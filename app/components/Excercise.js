import React from 'react';
import { Well } from 'react-bootstrap';

const Excercise = () => (
    <div>
        Implement a messaging system to replace the random alert boxes that come up. The messaging system should meet the following criteria
        <ul>
            <li>Messages should appear near the top of the page</li>
            <li>Messages should fade out after 3 seconds</li>
            <li>If a new message appears before the previous message fades out, it should appear below the most recent visible message.</li>
            <li>Messages should have a close or delete box to dismiss the message before the fade out</li>
        </ul>

        <div>
            In addition to the above features, implement other updates you think might be helpful. E.g. Add an indicator
            to let the user know that the messages are running in addition to the text change on the button, update the
            layout to make the page more readable, etc. Feel free to use
            any third party libraries you find helpful.
        </div>

        <div>
            <Well bsSize="large">
                <strong>NOTE:</strong> jQuery is removed, and Lodash is used instead of underscore!
            </Well>
        </div>
    </div>
);

export default Excercise;
