import { expect } from 'chai';
import {
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';
import hideAlert, { openModal, hideModal } from 'src/actions/common-actions';
import { spy, stub } from 'sinon';

describe('common actions', () => {
    describe('hideAlert', () => {
        context('when it is called', () => {
            const dispatch = spy();
            before((done) => {
                hideAlert()(dispatch);
                done();
            });
            
            it(`dispatches ${HIDE_ALERT} and hides alert`, () => {
                expect(dispatch).to.have.been.calledWith({
                    type: HIDE_ALERT
                });
            });
        });
    });    

    describe('showModal', () => {
        context('when openModal is called', () => {
            const dispatch = spy();
            before((done) => {
                openModal()(dispatch);
                done();
            });

            it(`dispatches ${OPEN_MODAL} and opens modal`, () => {
                expect(dispatch).to.have.been.calledWith({
                    type: OPEN_MODAL
                });
            });
        });

        context('when hideModal is called', () => {
            const dispatch = spy();
            before((done) => {
                hideModal()(dispatch);
                done();
            });

            it(`dispatches ${HIDE_MODAL} and hides modal`, () => {
                expect(dispatch).to.have.been.calledWith({
                    type: HIDE_MODAL
                });
            });
        });
    });
});
