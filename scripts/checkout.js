import { loadProducts } from "../data/products.js";
import { renderCheckout } from "./checkout/checkoutSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
async function lodedPage() {
  await loadProducts();
  renderCheckout();
  renderPayment();
}
lodedPage();
