const btn = document.getElementById('btn');
const box = document.querySelector('.box');
btn.addEventListener('click', () => {
    console.log('Button clicked');
    box.style.backgroundColor = 'red';
    console.log(box.style.backgroundColor);
})
setTimeout(() => {
    box.style.backgroundColor = 'white';
    console.log(box.style.backgroundColor);
}, 2000);