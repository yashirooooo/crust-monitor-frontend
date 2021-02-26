// 导入组件
import Vue from 'vue';
import Router from 'vue-router';

import index from '@/views/index';

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
        }]
    }]
})