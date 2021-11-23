

export default {

    name: 'daybook',
    component: () => import(/* webpackChunkName: "daybook" */ '@/modules/daybook/layouts/DaybookLayout.vue'),
    children: [
       {
           path: '',
           name: 'no-entry',
           component: () => import('@/modules/daybook/views/NoEntry.vue')
       } ,
       {
        path: ':id',
        name: 'entry',
        component: () => import('@/modules/daybook/views/EntryView.vue')
    }
    ]

}