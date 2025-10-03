import {createRouter, createWebHistory} from 'vue-router';
import CiudadesView from '../view/CiudadesView.vue'; 
import AtletasView from '../view/AtletasView.vue';

const routes = [
    {path: '/', redirect: '/ciudades'},
    {path: '/ciudades', component: CiudadesView},
    {path: '/atletas', component: AtletasView},
];

const router = createRouter ({
    history: createWebHistory(),
    routes,
});

export default router;