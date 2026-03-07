import { MenuItem } from "@/data/restaurant";

export interface CartItem extends MenuItem {
  quantity: number;
}

export function buildWhatsAppUrl(cart: CartItem[], phone: string): string {
  let message = "Hi Shangai Chinese Kitchen, I would like to place an order.";

  if (cart.length > 0) {
    message += "\n\n🛒 *My Order:*\n";
    cart.forEach((item) => {
      message += `• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\n💰 *Total: ₹${total}*`;
    message += "\n\nPlease confirm my order. Thank you!";
  } else {
    message += "\n\nI'm interested in ordering. Could you help me with the menu?";
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
