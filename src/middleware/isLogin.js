import axios from 'axios';
export default {
    getLink() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user/me', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then(() => {
                    console.log(token);
                }).catch(() => {})
        }
    }
}