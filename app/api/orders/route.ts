import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ orders: data || [] });
  } catch (err) {
    console.error("Order fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderId = `SCK-${Date.now().toString().slice(-6)}`;
    
    // Calculate total from cart items just to be safe
    const calculatedTotal = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          id: orderId,
          customer_name: body.customerDetails.name,
          phone_number: body.customerDetails.phone,
          delivery_address: body.delivery_address || 'Unspecified',
          payment_method: body.payment_method || 'cash',
          items: body.items,
          total_amount: calculatedTotal,
          status: "pending"
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ order: data, message: "Order placed successfully" }, { status: 201 });
  } catch (err) {
    console.error("Order placed error:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 400 });
  }
}
