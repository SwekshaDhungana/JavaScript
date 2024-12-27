export let products = [];
export async function loadProducts() {
  const res = await fetch("https://supersimplebackend.dev/products");
  products = await res.json();
}
