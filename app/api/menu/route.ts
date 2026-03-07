import { NextResponse } from "next/server";
import { MENU_ITEMS } from "@/data/restaurant";

export async function GET() {
  return NextResponse.json({ items: MENU_ITEMS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = {
      id: String(Date.now()),
      ...body,
    };
    return NextResponse.json({ item: newItem, message: "Menu item created" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
