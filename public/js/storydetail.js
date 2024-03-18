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
    window.location.href = "/mainpage"; // 이동 주소
}, 3000);

leftbtn.addEventListener('click', () => {
    card-body;
});

rightbtn.addEventListener('click', () => {
    card-body;
});

// storydetail.js

// 다음 스토리로 이동하는 함수
// storydetail.js

// 다음 스토리로 이동하는 함수
function showNextImage(userId) {
    // 서버로 다음 스토리의 userId를 요청
    $.ajax({
        url: '/nextStory', // 요청을 처리할 라우터 경로
        method: 'POST',
        data: { currentUserId: userId }, // 현재 스토리의 userId를 전달
        success: function(response) {
            // 서버에서 받은 응답을 기반으로 페이지 이동
            if (response.nextUserId) {
                window.location.href = '/storydetail/' + response.nextUserId;
            } else {
                console.log('다음 스토리가 없습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error('서버 요청 중 에러 발생:', error);
        }
    });
}
