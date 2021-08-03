import axios from "axios";

export default function auth({next, router }) {
  const token = localStorage.getItem('token');
  const token_email = localStorage.getItem('token_email');
  if(token){
      axios.get('http://127.0.0.1:8000/api/user/me',
      {headers: {Authorization: 'Bearer ' + token}})
      .then(()=>{    
      return router.push({ name: 'Home' })
      }).catch(()=>{})
  }else if(token_email){
      const newToken = token_email.substring(0, token_email.length-1);
      axios.get('http://127.0.0.1:8000/api/user/me',
      {headers: {Authorization: 'Bearer ' + newToken}})
      .then(()=>{    
      return router.push({ name: 'SentEmail' })
    }).catch(()=>{})
  }
  return next();
}