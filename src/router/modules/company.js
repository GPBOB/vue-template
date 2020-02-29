const _import = require('../_import_' + process.env.NODE_ENV);

export default [
  {
    path: '/company/workRecord',
    name: 'companyworkRecord',
    component: _import('company/workRecord'),
    meta: {
      icon: 'iconicon_fugongbeian',
      name_str: '复工备案',
      role: '5',
      isMenu: true
    }
  },
  {
    path: '/company/apply',
    name: 'companyapply',
    component: _import('company/apply'),
    meta: {
      icon: 'iconicon_shenqingjindu',
      name_str: '申请进度',
      role: '5',
      isMenu: true
    }
  },
  {
    path: '/company/workerManage',
    name: 'companyworkerManage',
    component: _import('company/workerManage'),
    meta: {
      icon: 'iconiconzhigongliebiao',
      name_str: '员工列表',
      role: '5',
      isMenu: true
    }
  },
  {
    path: '/company/punchCard',
    name: 'companypunchCard',
    component: _import('company/punchCard'),
    meta: {
      icon: 'iconicon_dakatongji',
      name_str: '打卡统计',
      role: '5',
      isMenu: true
    }
  },
  {
    path: '/company/statics',
    name: 'companystatics',
    component: _import('company/statics'),
    meta: {
      icon: 'iconicon_yinhuanguanli',
      name_str: '统计分析',
      role: '5',
      isMenu: true
    }
  },
  {
    path: '/company/trouble',
    name: 'companytrouble',
    component: _import('company/trouble'),
    meta: {
      icon: 'iconicon_yinhuanguanli',
      name_str: '隐患上报',
      role: '5',
      isMenu: true
    }
  }
];
