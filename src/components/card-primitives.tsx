import type { ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks so Experience, Education, Projects and Skills
 * read as one system: same card surface, badges, pills and text rhythm.
 */

export const cardSurface =
	"p-3 transition-all duration-300 hover:shadow-md hover:ring-2 hover:ring-muted-foreground/40 md:p-4";

export function TechBadges({
	items,
	className,
}: {
	items?: readonly string[];
	className?: string;
}) {
	if (!items?.length) return null;
	return (
		<div className={cn("flex flex-wrap gap-1", className)}>
			{items.map((item) => (
				<Badge
					variant="outline"
					className="px-1.5 py-0.5 text-[10px] md:text-xs"
					key={item}
				>
					{item}
				</Badge>
			))}
		</div>
	);
}

/** Compact, scannable markdown: summary line + bullets. */
const richTextComponents: Components = {
	p: ({ children }) => <p className="text-pretty">{children}</p>,
	ul: ({ children }) => <ul className="flex flex-col gap-1.5">{children}</ul>,
	li: ({ children }) => (
		<li className="relative pl-3.5 text-pretty before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-primary/60 dark:before:bg-secondary/70">
			{children}
		</li>
	),
	strong: ({ children }) => (
		<strong className="font-medium text-foreground">{children}</strong>
	),
};

export function RichText({
	children,
	className,
}: {
	children: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground",
				className,
			)}
		>
			<Markdown components={richTextComponents}>{children}</Markdown>
		</div>
	);
}

export function StatusPill({
	tone,
	children,
}: {
	tone: "live" | "muted";
	children: ReactNode;
}) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
				tone === "live"
					? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
					: "bg-muted text-muted-foreground",
			)}
		>
			<span aria-hidden className="relative flex size-1.5">
				{tone === "live" && (
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
				)}
				<span
					className={cn(
						"relative inline-flex size-1.5 rounded-full",
						tone === "live" ? "bg-emerald-500" : "bg-muted-foreground/60",
					)}
				/>
			</span>
			{children}
		</span>
	);
}

export function SectionHeader({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="flex flex-col gap-1">
			<h2 className="text-xl font-bold">{title}</h2>
			{description && (
				<p className="text-sm text-muted-foreground">{description}</p>
			)}
		</div>
	);
}
