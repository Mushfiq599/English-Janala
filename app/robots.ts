import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile", "/saved"],
    },
    sitemap: "https://english-janala.vercel.app/sitemap.xml",
  };
}