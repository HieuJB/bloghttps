export default{
    getLink() {
    const apiUrl = 'https://572211767c23.ngrok.io/api/user';
    return apiUrl;
    },
    getHeader() {
      const token = localStorage.getItem('token');
      const name = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      return name;
    },
};
