import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://shangaichinese.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://shangaichinese.com/#menu", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://shangaichinese.com/#about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://shangaichinese.com/#location", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
