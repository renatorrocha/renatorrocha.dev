import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar";
import SnowFall from "@/components/snow-fall";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isChristmasModeEnabled } from "@/lib/feature-flags";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themes-provider";
import { routing } from "@/services/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://renatorrocha.dev"),
	title: "Renato Rocha | Fullstack Developer",
	description:
		"Portfolio of Renato Rocha, a fullstack developer building web products end to end with TypeScript, Next.js, Nest.js and PostgreSQL, with a background in Android and applied AI.",
	keywords: [
		"Renato Rocha",
		"Fullstack Developer",
		"Software Engineer",
		"React Developer",
		"Next.js Developer",
		"Nest.js Developer",
		"Node.js",
		"TypeScript",
		"PostgreSQL",
		"AI",
		"Web Development",
		"Brazil Developer",
	],
	authors: [{ name: "Renato Rocha", url: "https://renatorrocha.dev" }],
	creator: "Renato Rocha",
	publisher: "Renato Rocha",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		alternateLocale: "en_US",
		title: "Renato Rocha | Fullstack Developer",
		description:
			"Explore the portfolio of Renato Rocha, a fullstack developer working with TypeScript, Next.js and Nest.js, with experience in mobile and applied AI.",
		url: "https://renatorrocha.dev",
		siteName: "Renato Rocha Portfolio",
		images: [
			{
				url: "/project-screenshot.png",
				width: 1200,
				height: 630,
				alt: "Renato Rocha - Fullstack Developer Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Renato Rocha | Fullstack Developer",
		description:
			"Fullstack developer working with TypeScript, Next.js, Nest.js and applied AI.",
		images: ["/project-screenshot.png"],
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta
					name="google-site-verification"
					content="zaHfJlY0IXdmPkqIWgyJD0Fjh31bj62sYNyVF4GPGnQ"
				/>
			</head>
			<body
				className={cn(
					inter.className,
					"mx-auto min-h-screen max-w-6xl overflow-x-hidden bg-background px-6 py-12 font-sans antialiased sm:py-16",
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider>
						<TooltipProvider delayDuration={0}>
							{children}

							{isChristmasModeEnabled() && <SnowFall />}

							<Navbar />
						</TooltipProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
