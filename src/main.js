import { createApp } from 'vue'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(VueSweetalert2,{toast: true, position: 'bottom-left',showConfirmButton: false,timer: 3000,timerProgressBar: true}).mount('#app')
