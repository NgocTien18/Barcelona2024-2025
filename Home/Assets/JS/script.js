// Chuyển động slider
document.addEventListener("DOMContentLoaded", function () {
  const sliderAlbum = document.querySelector(".slider-album");
  const sliderItems = document.querySelectorAll(".slider-item");
  const totalItems = sliderItems.length;

  // Nhân đôi danh sách ảnh để tạo hiệu ứng lặp mượt mà
  sliderAlbum.innerHTML += sliderAlbum.innerHTML;

  let currentIndex = 0;

  function moveToNextSlide() {
    currentIndex++;
    sliderAlbum.style.transform = `translateX(-${100 * currentIndex}%)`;
    sliderAlbum.style.transition = "transform 1s ease";

    // Khi đã đến cuối phần nhân đôi, nhanh chóng quay lại vị trí đầu tiên
    if (currentIndex === totalItems) {
      setTimeout(() => {
        sliderAlbum.style.transition = "none";
        currentIndex = 0;
        sliderAlbum.style.transform = `translateX(0)`;
      }, 1000); // Sau khi animation hoàn tất (1s)
    }
  }

  // Chuyển ảnh mỗi 3 giây
  setInterval(moveToNextSlide, 5000);
});
