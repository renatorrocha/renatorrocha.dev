"use client";

import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	cardSurface,
	RichText,
	StatusPill,
	TechBadges,
} from "@/components/card-primitives";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ExperienceRole {
	title: string;
	/** ISO year-month, e.g. "2025-07" */
	start: string;
	/** ISO year-month; null/undefined means current role */
	end?: string | null;
	badges?: readonly string[];
	description?: string;
}

export interface Experience {
	company: string;
	href?: string;
	logoUrl: string;
	/** Most recent role first */
	roles: readonly ExperienceRole[];
}

function parseYearMonth(value: string) {
	const [year, month] = value.split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, 1));
}

/** Inclusive month count, e.g. Aug 2023 → Nov 2024 = 16 */
function monthsBetween(start: string, end?: string | null) {
	const s = parseYearMonth(start);
	const e = end ? parseYearMonth(end) : new Date();
	return (
		(e.getUTCFullYear() - s.getUTCFullYear()) * 12 +
		(e.getUTCMonth() - s.getUTCMonth()) +
		1
	);
}

function useExperienceFormat() {
	const locale = useLocale();
	const t = useTranslations("Work");

	const formatMonth = (value: string) => {
		const date = parseYearMonth(value);
		const month = new Intl.DateTimeFormat(locale, {
			month: "short",
			timeZone: "UTC",
		})
			.format(date)
			.replace(".", "");
		return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getUTCFullYear()}`;
	};

	const formatPeriod = (start: string, end?: string | null) =>
		`${formatMonth(start)} – ${end ? formatMonth(end) : t("present")}`;

	const formatDuration = (start: string, end?: string | null) => {
		const total = Math.max(monthsBetween(start, end), 1);
		const years = Math.floor(total / 12);
		const months = total % 12;
		return [
			years > 0 && t("years", { count: years }),
			months > 0 && t("months", { count: months }),
		]
			.filter(Boolean)
			.join(" ");
	};

	return { t, formatPeriod, formatDuration };
}

function RoleDescription({
	id,
	description,
}: {
	id: string;
	description: string;
}) {
	return (
		<motion.div
			id={id}
			key="content"
			initial="collapsed"
			animate="open"
			exit="collapsed"
			variants={{
				open: { opacity: 1, height: "auto" },
				collapsed: { opacity: 0, height: 0 },
			}}
			transition={{ duration: 0.2 }}
			className="overflow-hidden"
		>
			<RichText className="pt-2">{description}</RichText>
		</motion.div>
	);
}

function TimelineRole({
	role,
	isLatest,
	isLast,
	defaultOpen,
}: {
	role: ExperienceRole;
	isLatest: boolean;
	isLast: boolean;
	defaultOpen: boolean;
}) {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const { formatPeriod, formatDuration } = useExperienceFormat();
	const contentId = useId();
	const isCurrent = !role.end;

	return (
		<li className="relative pl-6">
			{/* connector line */}
			{!isLast && (
				<span
					aria-hidden
					className="absolute top-3 bottom-[-0.75rem] left-[5px] w-px bg-border"
				/>
			)}
			{/* dot */}
			<span
				aria-hidden
				className={cn(
					"absolute top-1.5 left-0 size-[11px] rounded-full border-2",
					isLatest
						? "border-primary bg-primary"
						: "border-muted-foreground/40 bg-card",
					isCurrent && "ring-4 ring-primary/15",
				)}
			/>

			<button
				type="button"
				onClick={() => setIsOpen((v) => !v)}
				aria-expanded={isOpen}
				aria-controls={role.description ? contentId : undefined}
				disabled={!role.description}
				className="group/role flex w-full cursor-pointer flex-col gap-0.5 rounded-md text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default"
			>
				<span className="inline-flex items-start gap-1 text-sm font-medium leading-snug">
					<span className={cn(!isLatest && "text-foreground/85")}>
						{role.title}
					</span>
					{role.description && (
						<ChevronRightIcon
							className={cn(
								"mt-0.5 size-4 shrink-0 opacity-60 transition-all duration-300 group-hover/role:opacity-100",
								isOpen
									? "rotate-90 opacity-100"
									: "group-hover/role:translate-x-0.5",
							)}
						/>
					)}
				</span>
				<span className="text-xs tabular-nums text-muted-foreground">
					{formatPeriod(role.start, role.end)}
					<span className="mx-1.5 opacity-50">·</span>
					{formatDuration(role.start, role.end)}
				</span>
			</button>

			<div className="mt-2">
				<TechBadges items={role.badges} />
			</div>

			<AnimatePresence initial={false}>
				{isOpen && role.description && (
					<RoleDescription id={contentId} description={role.description} />
				)}
			</AnimatePresence>
		</li>
	);
}

interface ExperienceCardProps {
	experience: Experience;
	/**
	 * "work" highlights promotions; "education" lists programs at the same
	 * institution (which may overlap in time).
	 */
	variant?: "work" | "education";
	/** Opens the most recent item's description on load (use for the current job). */
	featured?: boolean;
}

export function ExperienceCard({
	experience,
	variant = "work",
	featured = false,
}: ExperienceCardProps) {
	const { company, href, logoUrl, roles } = experience;
	const { t, formatPeriod, formatDuration } = useExperienceFormat();
	const tEducation = useTranslations("Education");
	const [isOpen, setIsOpen] = useState(featured);
	const contentId = useId();

	const isWork = variant === "work";
	const hasProgression = roles.length > 1;
	const single = hasProgression ? null : roles[0];

	// Overall span: earliest start → latest end (an ongoing item wins).
	const spanStart = roles.reduce(
		(min, r) => (r.start < min ? r.start : min),
		roles[0].start,
	);
	const spanEnd = roles.some((r) => !r.end)
		? null
		: roles.reduce<string>(
				(max, r) => (r.end && r.end > max ? r.end : max),
				roles[0].end ?? "",
			);

	return (
		<Card className={cn("flex flex-col gap-3", cardSurface)}>
			{/* header */}
			<div className="flex gap-3 md:gap-4">
				<Avatar className="bg-muted-background size-10 flex-none border-0 dark:bg-foreground md:size-12">
					<AvatarImage
						src={logoUrl || "/placeholder.svg"}
						alt={company}
						className="object-contain"
					/>
					<AvatarFallback>{company[0] ?? "?"}</AvatarFallback>
				</Avatar>

				<div className="flex min-w-0 grow flex-col gap-1">
					<div className="flex items-start justify-between gap-2">
						<h3 className="text-base font-semibold leading-tight">
							{href ? (
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={t("visit", { company })}
									className="group/link inline-flex items-center gap-1 rounded-sm hover:underline hover:underline-offset-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
								>
									{company}
									<ExternalLinkIcon className="size-3.5 opacity-0 transition-opacity group-hover/link:opacity-70 group-focus-visible/link:opacity-70" />
								</a>
							) : (
								company
							)}
						</h3>
						<div className="shrink-0 text-right text-xs tabular-nums text-muted-foreground md:text-sm">
							{formatPeriod(spanStart, spanEnd)}
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
						{spanEnd === null && (
							<StatusPill tone="live">{t("present")}</StatusPill>
						)}
						{single ? (
							<span className="text-sm">{single.title}</span>
						) : (
							isWork && (
								<span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 font-medium text-primary dark:bg-primary/15 dark:text-secondary">
									<TrendingUp className="size-3" aria-hidden />
									{t("promoted", { count: roles.length - 1 })}
								</span>
							)
						)}
						<span className="tabular-nums">
							{hasProgression &&
								(isWork
									? t("roles", { count: roles.length })
									: tEducation("programs", { count: roles.length }))}
							{isWork && (
								<>
									{hasProgression && (
										<span className="mx-1.5 opacity-50">·</span>
									)}
									{formatDuration(spanStart, spanEnd)}
								</>
							)}
						</span>
					</div>
				</div>
			</div>

			{/* body */}
			{hasProgression ? (
				<ol className="flex flex-col gap-4 md:ml-16 ml-1">
					{roles.map((role, i) => (
						<TimelineRole
							key={`${role.title}-${role.start}`}
							role={role}
							isLatest={i === 0}
							isLast={i === roles.length - 1}
							defaultOpen={i === 0 && featured}
						/>
					))}
				</ol>
			) : (
				single && (
					<div className="flex flex-col md:ml-16">
						<TechBadges items={single.badges} />
						{single.description && (
							<>
								<button
									type="button"
									onClick={() => setIsOpen((v) => !v)}
									aria-expanded={isOpen}
									aria-controls={contentId}
									className="group/role mt-2 inline-flex w-fit cursor-pointer items-center gap-1 rounded-sm text-xs text-muted-foreground hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
								>
									<ChevronRightIcon
										className={cn(
											"size-4 transition-transform duration-300",
											isOpen && "rotate-90",
										)}
									/>
									{isOpen ? t("hideDetails") : t("showDetails")}
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<RoleDescription
											id={contentId}
											description={single.description}
										/>
									)}
								</AnimatePresence>
							</>
						)}
					</div>
				)
			)}
		</Card>
	);
}
