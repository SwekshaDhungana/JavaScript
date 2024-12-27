import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPayment() {
  let paymentHtml = "";
  let matchingProduct;
  let matchingDelivery;
  let itemPrice = 0;
  let shippingPrice = 0;
  let totalBeforeTax = 0;
  let tax = 0;
  let total = 0;

  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (cartItem.id === product.id) {
        matchingProduct = product;
      }
    });

    itemPrice += matchingProduct.priceCents * cartItem.quantity;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        matchingDelivery = option;
      }
    });
    shippingPrice += matchingDelivery.deliveryPrice;
  });

  totalBeforeTax = itemPrice + shippingPrice;
  tax = itemPrice * 0.1;
  total = totalBeforeTax + tax;
  paymentHtml = `
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              itemPrice
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPrice
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

  document.querySelector(`.js-payment-summary`).innerHTML = paymentHtml;
}
