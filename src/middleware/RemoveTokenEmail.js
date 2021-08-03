import axios from "axios";

export default function auth({next, router }) {
    if (!localStorage.getItem('token_email')) {
    return router.push({ name: 'Login' });
    }else{
        const token = localStorage.getItem('token_email');
        const newToken = token.substring(0, token.length-1);
        axios.get('http://127.0.0.1:8000/api/user/me',
        {headers: {Authorization: 'Bearer ' + newToken}})
        .then(()=>{    
        }).catch(()=>{
        return router.push({ name: 'Login' })
    })
  }
  return next();
}