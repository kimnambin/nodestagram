//이미지 디테일 부분
const leftbtn = document.querySelector('.left-btn');
const rightbtn = document.querySelector('.right-btn');

const container2 = document.getElementById('.card-body2');
const leftbtn2 = document.getElementById('.left-btn2');
const rightbtn2 = document.getElementById('.right-btn2');

document.getElementById('image_<%= storypost.userId %>').style.visibility = "hidden";
document.getElementById('.left-btn2').style.display = 'none';
document.getElementById('.right-btn2').style.display = 'none';

setTimeout(function() {
    window.location.href = "/mainupload"; // 이동 주소
}, 3000);

leftbtn.addEventListener('click', () => {
    card-body;
});

rightbtn.addEventListener('click', () => {
    card-body;
});

