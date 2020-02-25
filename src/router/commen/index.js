// const _import = require('../_import_' + process.env.NODE_ENV);

export const constRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/home/login')
  }
];
