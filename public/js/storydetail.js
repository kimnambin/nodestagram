setTimeout(function() {
    window.location.href = "/mainpage"; 
}, 10000);


// 현재 이미지의 인덱스
let currentIndex = 0;
// 모든 스토리 이미지 요소를 가져옴
let storyImages = document.querySelectorAll('.story-image');

// 이미지 변경 함수
function changeStoryImage(userId, index) {
    const matchingFiles = files2.filter(file => file.startsWith(userId + '-'));
    const image = document.getElementById('storyImage-' + index);
    if (matchingFiles.length > 0) {
        image.src = "/storys/" + matchingFiles[0];
    }
}

// 좌측 버튼 클릭 이벤트 핸들러
function leftbtn() {
    if (currentIndex > 0) {
        // 현재 이미지를 숨김
        storyImages[currentIndex].style.display = 'none';
        // 이전 이미지의 인덱스로 이동
        currentIndex--;
        // 이전 이미지를 보이게 함
        storyImages[currentIndex].style.display = 'block';
    }
}

// 우측 버튼 클릭 이벤트 핸들러
function rightbtn() {
    if (currentIndex < storyImages.length - 1) {
        // 현재 이미지를 숨김
        storyImages[currentIndex].style.display = 'none';
        // 다음 이미지의 인덱스로 이동
        currentIndex++;
        // 다음 이미지를 보이게 함
        storyImages[currentIndex].style.display = 'block';
    }
}

// 클릭 이벤트 리스너 등록
document.querySelectorAll('.left-btn').forEach((button) => {
    button.addEventListener('click', leftbtn);
    console.log("안녕하세용")
});

document.querySelectorAll('.right-btn').forEach((button) => {
    button.addEventListener('click', rightbtn);
});
