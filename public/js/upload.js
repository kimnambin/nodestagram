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
        var card1 = document.querySelector(".card");
        var card2 = document.querySelector(".card2");
        var btn = document.getElementById("computerSelectBtn");
        btn.textContent = "공유하기";
        card1.style.display = "none";
        card2.style.display = "block";
      }
      reader.readAsDataURL(file);
    }
  }