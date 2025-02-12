import iziToast from 'izitoast';  
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

form.addEventListener('submit', function(e) {
    e.preventDefault()
const delay = form.querySelector('input[name="delay"]').value;
    const state = form.querySelector('input[name="state"]:checked').value; 
    
    form.querySelector('input[name="delay"]').value = '';
    form.querySelector('input[name="state"]:checked').checked = false;
    
const promise = new Promise((resolve,reject)=>{
        setTimeout(() => { 
            if (state==='fulfilled') {
             resolve(delay)
            } else {
                reject(delay)
         }
        }, delay);
    })

    promise
        .then((delay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
                
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        })
    });