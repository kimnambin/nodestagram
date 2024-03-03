function uploadImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "180px";
            img.style.height = "auto";

            const preview = document.getElementById("previewImage");
            preview.innerHTML = ""; // 기존에 업로드된 이미지 제거
            preview.appendChild(img);
            preview.style.display = "block"; // 미리보기 요소 표시

            // card2 보이기
            const card1 = document.querySelector(".card");
            const card2 = document.querySelector(".card2");
            const btn = document.getElementById("computerSelectBtn");
            btn.textContent = "공유하기";
            card1.style.display = "none";
            card2.style.display = "block";

            // "공유하기" 버튼 클릭 이벤트 처리
            btn.addEventListener("click", function() {
                // 사용자가 입력한 데이터 수집
                const body = document.getElementById("body").value;
                
                // FormData 객체 생성
                const formData = new FormData();
                formData.append('body', body);
                formData.append('img', file); // 이미지 파일 직접 추가
                
                // POST 요청 보내기
                fetch("/main", {
                    method: "POST",
                    body: formData, // FormData 객체 전송
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Data received from server:", data);
                    // 서버에서 받은 데이터에 따라 처리
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            });
        }
        reader.readAsDataURL(file);
    }
}