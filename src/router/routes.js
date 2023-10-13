import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import { tabs, childRoutes } from '@/projects'
const routes = [{
        path: "*",
        redirect: Login
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }, 
    { 
        path: "/home",
        name: "home",
        component: Home,
        children: [
            // 侧边栏的路由配置，根据配置项自动生成
            // ...ASIDE_MENU_ROUTES,
            ...tabs,
            ...childRoutes
            // 手动添加的路由选项
        ]
    },
    process.env.NODE_ENV === 'prodcution' ? {} : { 
        path: "/editor",
        name: "editor",
        component: () => import('@/editor/index.vue'),
    }
]
export default routes