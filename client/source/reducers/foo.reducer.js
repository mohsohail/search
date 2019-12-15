import { CLICK_FOO } from '../constants/actions';

const initialState = {
  firstname: 'john',
  lastname: 'doe',
  age: 26
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'FOO':
      return {
        ...state
      };
    case CLICK_FOO:
      return {
        ...state
      };
    default:
      return state;
  }
}
