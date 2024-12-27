export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectedValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += selectedValue;
  } else {
    cart.push({
      id: productId,
      quantity: selectedValue,
      deliveryOptionId: "3",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateFromCart(productId, selectedValue) {
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.quantity = selectedValue;
    }
  });
  saveToStorage();
}
export function updateDeliveryOption(productId, deliveryId) {
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      cartItem.deliveryOptionId = deliveryId;
    }
  });
  saveToStorage();
}
