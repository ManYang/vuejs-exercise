import Vue from 'vue'
import VueResource from'vue-resource';
import App from './components/App.vue'
Vue.use(VueResource);

new Vue({
	el: '#app',
	components: { App }
})