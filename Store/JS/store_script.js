let cart = [];
let isCartVisible = false; // Trạng thái giỏ hàng

// Hàm cập nhật giỏ hàng
function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartHeader = document.querySelector(".cart-header h2");
  let subtotal = 0;

  cartItemsContainer.innerHTML = ""; // Xóa nội dung cũ

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const cartItemHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">¥${item.price.toLocaleString()} JPY</p>
          <div class="cart-item-quantity">
            <button onclick="decreaseQuantity(${index})">−</button>
            <span id="quantity-${index}">${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeItem(${index})">×</button>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
  });

  document.getElementById(
    "subtotal"
  ).textContent = `¥${subtotal.toLocaleString()}`;
  cartHeader.textContent = `My bag (${cart.length})`;

  // Cập nhật số lượng giỏ hàng trên nút giỏ hàng
  cartCount.textContent = cart.length;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, image, price) {
  const existingProductIndex = cart.findIndex((item) => item.name === name);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ name, image, price, quantity: 1 });
  }

  updateCart();
}

// Hàm tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

// Hàm giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    updateCart();
  } else {
    removeItem(index);
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Hàm bật/tắt hiển thị giỏ hàng
function toggleCart() {
  const cartElement = document.querySelector(".cart");
  isCartVisible = !isCartVisible;
  cartElement.style.display = isCartVisible ? "block" : "none";
}

// Gắn sự kiện click cho nút giỏ hàng
document.getElementById("cart-button").addEventListener("click", toggleCart);

// Hàm thanh toán
function checkout(event) {
  if (cart.length === 0) {
    return; // Không làm gì nếu giỏ hàng trống
  }

  // Xóa giỏ hàng
  cart = [];
  updateCart();
}

// ưu tiên cuộn :
const cartBox = document.querySelector(".cart_list");

cartBox.addEventListener("wheel", (event) => {
  // Kiểm tra xem box có thể cuộn được không
  const isScrollable = cartBox.scrollHeight > cartBox.clientHeight;

  if (!isScrollable) {
    return; // Nếu không thể cuộn, thoát ra
  }

  const isAtTop = cartBox.scrollTop === 0 && event.deltaY < 0;
  const isAtBottom =
    cartBox.scrollHeight - cartBox.scrollTop <= cartBox.clientHeight &&
    event.deltaY > 0;

  // Nếu đang ở đầu hoặc cuối, ngăn cuộn
  if (isAtTop || isAtBottom) {
    event.preventDefault();
  }
});
