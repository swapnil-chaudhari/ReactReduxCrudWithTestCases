/**
 * @file Example component that renders Hello World.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';


/**
 * Renders HelloWorld Component
 * @return {ReactElement} Hello World HTML
 */
const HelloWorld = () =>
    <p className="HelloWorld-example">
        <FormattedMessage
            id="hello-world.welcoming-message"
            defaultMessage="Hello World"
        />
    </p>;

export default HelloWorld;
