burger=document.querySelector('.burger');
rightNav=document.querySelector('.rightNav');
navList=document.querySelector('.nav-list');
navbar=document.querySelector('.navbar');

burger.addEventListener('click',()=>{
    rightNav.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
    navList.classList.toggle('v-class-resp');
})