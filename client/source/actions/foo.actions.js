import { CLICK_FOO } from '../constants/actions';

export const dispatchFoo = () => async dispatch => {
  dispatch({
    type: CLICK_FOO
  });
};
