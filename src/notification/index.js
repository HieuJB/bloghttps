import Vue from 'vue';
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
    success(data) {
        Vue.swal({
            position: 'top-end',
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 1500,
        });
    },
    error(data) {
        Vue.swal({
            icon: 'error',
            title: 'Thông báo...',
            text: data,
        });
    },
};