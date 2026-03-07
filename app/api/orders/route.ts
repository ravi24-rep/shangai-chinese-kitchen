import { NextResponse } from "next/server";

export async function GET() {
  const orders = [
    { id: "ORD-001", customer: "Rahul S.", total: 700, status: "pending", time: new Date().toISOString() },
  ];
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = {
      id: `ORD-${Date.now()}`,
      ...body,
      status: "pending",
      time: new Date().toISOString(),
    };
    return NextResponse.json({ order, message: "Order placed" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
