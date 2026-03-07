import { getCategories, getMenuItems } from "@/data/index";
import MenuInteractive from "./menu-section";

export default async function MenuSectionWrapper() {
  const categories = await getCategories();
  const items = await getMenuItems();

  return <MenuInteractive initialCategories={categories} initialItems={items} />;
}
