import Vue from 'vue';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMoment from 'vue-moment';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import Viewer from 'v-viewer'
import VueModal from '@kouts/vue-modal';
import Vue2Filters from 'vue2-filters'
// import VeeValidate from 'vee-validate';
// import * as VueGoogleMaps from 'vue2-google-maps'

// import './filters/index'



/*  
  *
  * FontAwesome Library
  *
*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome,
  faTimes,
  faCheck,
  faUserFriends,
  faEnvelope,
  faCoins,
  faAngleRight,
  faPlusSquare,
  faEdit,
  faTrashAlt,
  faPlus,
  faStar as fasStar,
  faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { 
  faTwitter,
  faLinkedin,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faHome,
  faTwitter,
  faLinkedin,
  faFacebookSquare,
  faTimes,
  faCheck,
  faUserFriends,
  faEnvelope,
  faCoins,
  faAngleRight,
  faPlusSquare,
  faEdit,
  faTrashAlt,
  faPlus,
  fasStar,
  farStar,
  faStarHalfAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import App from './App.vue';
import router from './router';


// Library CSS
import 'sweetalert2/dist/sweetalert2.min.css';
import '@kouts/vue-modal/dist/vue-modal.css';
import 'viewerjs/dist/viewer.css'
import './assets/styles/index.scss';


const options = {
  confirmButtonColor: '#476A9D',
  cancelButtonColor: '#7c8aa0',
};




Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(VCalendar);
Vue.use(VueSweetalert2,options);
Vue.use(VueMoment);
Vue.use(Viewer)
Vue.use(VueModal)
Vue.use(Vue2Filters);
Vue.component('Modal', VueModal);

Vue.mixin(Vue2Filters.mixin);
// Vue.use(VeeValidate)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCkjWXef2lDguLgq1Pk9cUkWQd3ReWXXaQ',
//     libraries: 'places,geometry', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//   },
// })

Vue.config.productionTip = false;
Vue.router = router;

Vue.use(require('@websanova/vue-auth'), {
  auth: {
    request(req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: `Bearer ${token}`,
      })
    },
    response(res) {
      var token = res.data.access_token;
      if (token) {
        // token = token.split(/Bearer\:?\s?/i) //eslint-disable-line
        // return token[token.length > 1 ? 1 : 0].trim()
        return token;
      }
    },
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: '/user/login',
    method: 'POST',
    // redirect: '/',
  },
  authRedirect: { path: '/user/login' },
  tokenDefaultName: 'auth_token',
  refreshData: { enabled: false },
  fetchData: { enabled: false },
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
