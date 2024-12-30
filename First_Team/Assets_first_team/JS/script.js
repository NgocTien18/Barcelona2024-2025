// Get all video buttons
const videoButtons = document.querySelectorAll(".video_btn");

videoButtons.forEach((button) => {
  const legendaryItem = button.closest(".legendary_item"); // Find the parent .legendary_item
  const videoOverlay = legendaryItem.querySelector(".legendary_video-overlay"); // Find the overlay within this item
  const video = videoOverlay.querySelector(".legendary_video"); // Find the video element
  const closeButton = videoOverlay.querySelector(".close_btn"); // Find the close button within this overlay

  // Show video overlay
  button.addEventListener("click", () => {
    videoOverlay.classList.add("active");
    video.play(); // Start playing the video when overlay is shown
  });

  // Hide video overlay and stop video
  closeButton.addEventListener("click", () => {
    videoOverlay.classList.remove("active");
    video.pause(); // Pause the video
    video.currentTime = 0; // Reset the video to the beginning
  });
});
