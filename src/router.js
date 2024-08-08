import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import LoginView from './components/LoginComponent.vue';
import ForgotPassword from './components/ForgotPassword.vue'; // Şifre Sıfırlama Componentini İmport Et
import DuyurularComponent from './components/DuyurularComponent.vue';
import FutbolComponent from './components/FutbolComponent.vue';
import YüzmeComponent from './components/YüzmeComponent.vue';
import RegisterView from './views/RegisterView.vue';
import AdminView from './views/AdminView.vue';
import tokenService from './Services/tokenService';
import ProfilView from './views/ProfilView.vue';

const routes = [
    { 
        path: '/',
        component: HomeView,
        children: [
            { path: "", component: DuyurularComponent },
            { path: "futbol", component: FutbolComponent },
            { path: "yüzme", component: YüzmeComponent },
        ]
    },
    { path: '/login', component: LoginView },
    { path: '/forgot-password', component: ForgotPassword }, // Yeni Şifre Sıfırlama Rotası
    { path: '/register', component: RegisterView },
    { path: '/admin', component: AdminView, meta: { requiresAdmin: true } },
    { path: '/profil', component: ProfilView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userToken = localStorage.getItem('userToken');

    if (userToken && tokenService.isTokenExpired(userToken)) {
        localStorage.removeItem('userToken');
        next('/login');
    } else {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (!userToken) {
                next('/login');
            } else {
                const isAdmin = tokenService.getUserRole(userToken) === 'Admin';
                if (isAdmin) {
                    next();
                } else {
                    next('/');
                }
            }
        } else {
            next();
        }
    }
});

export default router;
