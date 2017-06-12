import {
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';

export const openModal = () =>
	dispatch =>
        dispatch({ type: OPEN_MODAL });

export const hideModal = () =>
	dispatch =>
        dispatch({ type: HIDE_MODAL });

const hideAlert = () =>
    dispatch =>
        dispatch({ type: HIDE_ALERT });
export default hideAlert;
