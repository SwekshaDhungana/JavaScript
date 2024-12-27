import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateFromCart,
} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPayment } from "./paymentSummary.js";
export function renderCheckout() {
  let checkoutHtml = "";
  let matchingProduct;
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (cartItem.id === product.id) {
        matchingProduct = product;
      }
    });
    let matchingObject;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        matchingObject = option;
      }
    });
    const today = dayjs();
    const dateString = today.add(matchingObject.deliveryDays, "days");
    const dateFormat = dateString.format("dddd MMMM, D");

    checkoutHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
              <div class="delivery-date">Delivery date: ${dateFormat}</div>
  
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />
  
                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">$${formatCurrency(
                    matchingProduct.priceCents
                  )}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span> </span>
                    <div class="product-quantity-container">
                      <select class="js-selected-value-${matchingProduct.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <span class="update-quantity-link link-primary js-update-quantity-link
                    }" data-product-id="${matchingProduct.id}" >
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${generateDeliveryOption(matchingProduct, cartItem)}
                  
                  
                  
                </div>
              </div>
            </div>`;
  });
  document.querySelector(".js-order-summary").innerHTML = checkoutHtml;
  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        let { productId } = deleteLink.dataset;
        removeFromCart(productId);
        let container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        renderCheckout();
        renderPayment();
      });
    });

  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        let { productId } = updateLink.dataset;
        let selectedValue = Number(
          document.querySelector(`.js-selected-value-${productId}`).value
        );
        updateFromCart(productId, selectedValue);
        renderCheckout();
        renderPayment();
      });
    });

  function generateDeliveryOption(matchingProduct, cartItem) {
    let optionHtml = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const dateString = today.add(option.deliveryDays, "days");
      const dateFormat = dateString.format("dddd MMMM, D");

      const priceString =
        option.deliveryPrice === 0
          ? "FREE"
          : `$${formatCurrency(option.deliveryPrice)}`;
      const isChecked =
        option.id === cartItem.deliveryOptionId ? "checked" : "";

      optionHtml += `<div class="delivery-option js-delivery-option"
                      data-product-id=${matchingProduct.id}
                      data-delivery-id=${option.id}>
                    <input
                      type="radio"
                      ${isChecked}
                   
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">${dateFormat}</div>
                      <div class="delivery-option-price">${priceString}-Shipping</div>
                    </div>
                  </div>`;
    });
    return optionHtml;
  }
  document.querySelectorAll(`.js-delivery-option`).forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryId } = option.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderCheckout();
      renderPayment();
    });
  });
}
