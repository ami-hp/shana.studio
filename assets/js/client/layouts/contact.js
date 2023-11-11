// const Fun = require('../functions');

window.addEventListener('swal-contact-success' , () => {

    Swal.fire({
        icon: "success",
        title: ' ',
        text: 'Message\'s Been Sent Successfully',
        backdrop: true,
        // showClass: {
        //     popup: 'swal2-noanimation',
        //     backdrop: 'swal2-noanimation'
        // },

        // hideClass: {
        //     popup: '',
        //     backdrop: ''
        // },
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
    })

});
