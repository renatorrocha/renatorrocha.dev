import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/private/"],
			},
		],
		sitemap: "https://renatorrocha.dev/sitemap.xml",
		host: "https://renatorrocha.dev",
	};
}
