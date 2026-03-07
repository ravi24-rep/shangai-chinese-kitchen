-- Supabase Architecture for Shangai Chinese Kitchen

-- 1. Create Menu Items Table
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    spicy BOOLEAN DEFAULT false,
    veg BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Orders Table
CREATE TABLE public.orders (
    id TEXT PRIMARY KEY, -- e.g. ORD-001
    customer_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    items JSONB NOT NULL, -- Array of {name, qty, price}
    total_amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, preparing, delivered, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set Up Security Policies (Row Level Security - RLS)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (public) to READ the menu items
CREATE POLICY "Menu is public readable"
ON public.menu_items FOR SELECT
USING (true);

-- Allow ANYONE to INSERT an order (during checkout)
CREATE POLICY "Anyone can create an order"
ON public.orders FOR INSERT
WITH CHECK (true);

-- IMPORTANT security: 
-- You MUST use your Service Role Key on the Next.js API/Admin side
-- to Read/Update/Delete orders! Do not allow public access to do that.
