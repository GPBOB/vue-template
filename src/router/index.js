import Vue from 'vue';
import Router from 'vue-router';
import { constRouterMap } from './commen';
import { asyncRouter } from './modules';

Vue.use(Router);
export const constantRouterMap = constRouterMap;
export const asyncRouterMapGetter = asyncRouter;

export default new Router({
  routes: constantRouterMap
});

