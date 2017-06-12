import { expect } from 'chai';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import HelloWorld from '../hello-world';
import { renderShallow } from 'lib/test-helpers';

describe('<HelloWorld>', () => {
    context('when it renders', () => {
        let component;

        before(() => {
            component = renderShallow(<HelloWorld />).output;
        });

        it('returns Hello World', () => {
            expect(component).to.eql(
                <p className="HelloWorld-example">
                    <FormattedMessage
                        id="hello-world.welcoming-message"
                        defaultMessage="Hello World"
                    />
                </p>
            );
        });
    });
});
