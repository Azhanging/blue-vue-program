import utils from '$utils';
import { state as publicState } from '$config/store/state';

//扩展公共的state
const state = utils.extend(publicState, {
  /*项目相关的state*/
  view: {
    navigator: 'home'
  }
});

export default state;