import axios from "axios";

export default function auth({next, router }) {
    if (!localStorage.getItem('token')) {
      return router.push({ name: 'Login' });
    }else{
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/user/me',
        {headers: {Authorization: 'Bearer ' + token}})
        .then(()=>{    
        }).catch(()=>{
        return router.push({ name: 'Login' })
    })
  }
  return next();
}