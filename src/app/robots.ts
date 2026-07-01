import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flashtethernetwork.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/terms", "/privacy"],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/software/",
          "/activate",
          "/login",
          "/register",
          "/checkout",
          "/order-confirmed",
          "/pending",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
