
import { getToken, setToken, removeToken } from '../../utils/auth';
import store from '@/utils/store';

const storeState = {
  token: getToken(),
  userInfo: store.get('userInfo'),
  appcode: store.get('appcode'),
  // parkId: store.get('park-id')
};
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  appcode: state => state.appcode,
};
const mutations = {
  setTokens(state, data) {
    state.token = data;
    if (data) {
      setToken(data);
    } else {
      removeToken();
    }
  },
  setuserInfo(state, data) {
    state.userInfo = data;
    if (data) {
      store.set('userInfo', data);
    } else {
      store.remove('userInfo');
    }
  },
  setAppcode(state, data) {
    state.appcode = data;
    if (data) {
      store.set('appcode', data);
    } else {
      store.remove('appcode');
    }
  },
  loginOutUser(state){
    state.token=null
    state.userInfo = null
    store.remove('userInfo');
    removeToken();
  }
};
const actions = {

};

export default {
  state: storeState,
  getters,
  mutations,
  actions
};
