//이미지 디테일 부분
const leftbtn = document.querySelector('.left-btn');
const rightbtn = document.querySelector('.right-btn');

const carousel = document.querySelector('.carousel');

// 0부터 시작하며, 시작 시 첫 번째 슬라이드만 보이도록 설정
let index = 0;
showSlide(index);

leftbtn.addEventListener('click', () => {
    index = (index - 1 + 4) % 4; // 왼쪽으로 이동
    showSlide(index);
});

rightbtn.addEventListener('click', () => {
    index = (index + 1) % 4; // 오른쪽으로 이동
    showSlide(index);
});

function showSlide(index) {
    const slideWidth = document.querySelector('.slide').offsetWidth;
    carousel.style.transform = `translate3d(-${slideWidth * index}px, 0, 0)`;
}