import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('@/views/Home.vue');
const Economy = () => import('@/views/Economy.vue');
const Entertainment = () => import('@/views/Entertainment.vue');
const Sport = () => import('@/views/Sport.vue');
const Health = () => import('@/views/Health.vue');
const World = () => import('@/views/World.vue');
const Other = () => import('@/views/Other.vue');
const Login = () => import('@/views/Login.vue');
const Registration = () => import('@/views/Registration.vue');
const Profile = () => import('@/views/Profile.vue');
const PostApprove = () => import('@/layouts/PostApprove.vue');
const Saved = () => import('@/layouts/Saved.vue');
const Posted = () => import('@/layouts/Posted.vue');
const PersonalPost = () => import('@/layouts/PersonalPost.vue');
const Post = () => import('@/views/Post.vue');
const Search = () => import('@/views/Search.vue');
const SentEmail = () => import('@/views/SentEmail.vue');
const VerifyEmail = () => import('@/views/VerifyEmail.vue');
const ForgetPassword = () => import('@/views/ForgetPassword.vue');
import RemoveTokenEmail from '@/middleware/RemoveTokenEmail';
import RemoveToken from '@/middleware/RemoveToken';

Vue.use(VueRouter);

const progress = {
  func: [
    {call: 'color', modifier: 'temp', argument: '#00cfff'},
    {call: 'fail', modifier: 'temp', argument: '#6e0000'},
    {call: 'location', modifier: 'temp', argument: 'top'},
    {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.4s', termination: 400}}
  ]
}

const routes = [
  {path: '',name: 'Home',component: Home,meta:{progress:progress}},
  {path: '/economy',name: 'Economy',component: Economy,meta:{progress:progress}},
  {path: '/entertainment',name: 'Entertainment',component: Entertainment,meta:{progress:progress}},
  {path: '/sport',name: 'Sport',component: Sport,meta:{progress:progress}},
  {path: '/health',name: 'Health',component: Health,meta:{progress:progress}},
  {path: '/world',name: 'World',component: World,meta:{progress:progress}},
  {path: '/other',name: 'Other',component: Other,meta:{progress:progress}},
  {path: '/login',name: 'Login',component: Login,meta:{progress:progress}},
  {path: '/registration',name: 'Registration',component: Registration,meta:{progress:progress}},
  {path: '/post/:id',name: 'Post',component: Post,meta:{progress:progress}},
  {path: '/search',name: 'Search',component: Search,meta:{progress:progress}},
  {path: '/sent-email',name:'SentEmail',component:SentEmail,meta:{middleware:RemoveTokenEmail}},
  {path: '/verify-email/:id',name:'VerifyEmail',component:VerifyEmail,meta:{progress:progress}},
  {path: '/forget-password/:id',name:'ForgetPassword',component:ForgetPassword,meta:{progress:progress}},
  {path: '/profile',redirect:'/profile/:name',name:'Profile',component: Profile,meta:{progress:progress,middleware:RemoveToken},
    children: [
      {
        path: ':name',name:'Posted',component:Posted,meta:{progress:progress},
      },
      {
        path: 'post-approve/:name',name:'PostApprove',component:PostApprove,meta:{progress:progress},
      },
      {
        path: 'saved/:name',name:'Saved',component:Saved,meta:{progress:progress},
      },
      {
        path: 'personal-post/:name',name:'PersonalPost',component:PersonalPost,meta:{progress:progress},
      }
    ]
  },
  // {path: '/saved/',name:'Saved',component:Saved,meta:{progress:progress}},

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;
  
  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index  );
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}
  
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware];
    const context = {from,next,router,to,};
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
    return next();
  });
export default router;
