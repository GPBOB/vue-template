import { asyncRouterMapGetter, constantRouterMap } from '@/router';
import _ from 'lodash';

const routerStore = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menuRoutes: [],
    isMountedRoute:false
  },
  getters: {
    addRouters: state => state.addRouters,
    menuRoutes: state => state.menuRoutes,
    routers: state => state.routers,
    isMountedRoute:state=>state.isMountedRoute
  },
  mutations: {
    setRouters(state, routers) {
      state.addRouters = _.cloneDeep(routers);
      state.routers = _.cloneDeep(constantRouterMap.concat(routers));
    },
    setIsMountedRoute(state, isMounted){
      state.isMountedRoute=isMounted
    }
  },
  actions: {
    GenerateRoutes({ commit }, role) {
      return new Promise(resolve => {
        // eslint-disable-next-line no-console
        if (role == 5) {
          commit('setRouters', asyncRouterMapGetter);
        }

        resolve(asyncRouterMapGetter);
      });
    }
  }
};
export default routerStore;
