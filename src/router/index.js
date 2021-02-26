// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 商品管理
import Goods from '@/views/goods/Goods';
// 机器信息管理
import Machine from '@/views/machine/Machine';
// 货道信息管理
import MachineAisle from '@/views/machine/MachineAisle';
/**
 * 订单管理
 */
// 交易订单
import Order from '@/views/pay/Order';
/**
 * 系统管理
 */
// 用户管理
import user from '@/views/system/user';
// 菜单管理
import Module from '@/views/system/Module';
// 角色管理
import Role from '@/views/system/Role';
// 公司管理
import Dept from '@/views/system/Dept';
// 系统环境变量
import Variable from '@/views/system/Variable';
// 权限管理
import Permission from '@/views/system/Permission';
/**
 * 支付管理
 */
// 支付配置信息
import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login';

import ReportedStatusOverview from '@/views/swork/ReportedStatusOverview'
import ReportedStatusDetail from '@/views/swork/ReportedStatusDetail'
import FileOverview from '@/views/market/FileOverview'
import FileSizeOverview from '@/views/market/FileSizeOverview'
import FileCountOverview from '@/views/market/FileCountOverview'
import MerchantStakedInfo from '@/views/market/MerchantStakedInfo'
import StorageMarketOverview from '@/views/market/StorageMarketOverview'


// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/market/StorageMarketOverview',
            name: '存储市场概览',
            component: StorageMarketOverview,
        }, {
            path: '/swork/ReportedStatusOverview',
            name: '工作量上报总览',
            component: ReportedStatusOverview,
        }, {
            path: '/swork/ReportedStatusDetail',
            name: '工作量上报详情',
            component: ReportedStatusDetail,
        }, {
            path: '/market/FileOverview',
            name: '文件总览',
            component: FileOverview,
        }, {
            path: '/market/FileSizeOverview',
            name: '文件大小分布',
            component: FileSizeOverview
        }, {
            path: '/market/FileCountOverview',
            name: '文件份数分布',
            component: FileCountOverview
        }, {
            path: '/market/MerchantStakedInfo',
            name: '商户Staked文件',
            component: MerchantStakedInfo,
        }, {
            path: '/system/user',
            name: '用户管理',
            component: user,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Module',
            name: '菜单管理',
            component: Module,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Role',
            name: '角色管理',
            component: Role,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Dept',
            name: '公司管理',
            component: Dept,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Variable',
            name: '系统环境变量',
            component: Variable,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Permission',
            name: '权限管理',
            component: Permission,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/MachineConfig',
            name: '支付配置信息',
            component: MachineConfig,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/pay/Config',
            name: '支付配置',
            component: Config,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/druid/login',
            name: '监控查询',
            component: druidLogin,
            meta: {
                requireAuth: true
            }
        }]
    }]
})