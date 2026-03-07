import { getMenuItems, getCategories } from "@/data/index";
import MenuManagementClient from "@/components/menu-management-client";

export const dynamic = "force-dynamic";

export default async function MenuManagementServer() {
  const items = await getMenuItems();
  const categories = await getCategories();

  return <MenuManagementClient initialItems={items} categories={categories} />;
}
