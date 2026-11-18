import { CodeIcon } from "@radix-ui/react-icons";
import { BrainCog, Cloudy, DatabaseZap, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import BlurFade from "@/components/blur-fade";
import { SectionHeader } from "@/components/card-primitives";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	BLUR_FADE_DELAY,
	getSkillIconUrl,
	SKILLS,
	type SkillCategoryKey,
} from "@/lib/constants";

const categoryIcons: Record<
	SkillCategoryKey,
	ComponentType<{ className?: string }>
> = {
	languages: CodeIcon,
	frameworks: LayoutDashboard,
	databases: DatabaseZap,
	cloud: Cloudy,
	ai: BrainCog,
};

function SkillBadge({ skill }: { skill: string }) {
	const iconUrl = getSkillIconUrl(skill);

	return (
		<Badge
			variant="outline"
			className="gap-1.5 px-1.5 py-0.5 text-[10px] font-medium md:text-xs"
		>
			{iconUrl && (
				<Image
					src={iconUrl}
					alt=""
					width={14}
					height={14}
					className="size-3.5 shrink-0 object-contain"
					unoptimized
				/>
			)}
			{skill}
		</Badge>
	);
}

export default function SkillsSection() {
	const t = useTranslations("Skills");

	return (
		<section id="skills" className="flex flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY * 9}>
				<SectionHeader title={t("title")} description={t("description")} />
			</BlurFade>

			<BlurFade delay={BLUR_FADE_DELAY * 10}>
				<Card className="divide-y divide-border p-0">
					{SKILLS.map(({ key, skills }) => {
						const Icon = categoryIcons[key];
						return (
							<div
								key={key}
								className="flex flex-col gap-2 p-3 md:grid md:grid-cols-[13rem_1fr] md:items-start md:gap-4 md:p-4"
							>
								<div className="flex items-center gap-2 text-sm font-medium md:pt-0.5">
									<Icon className="size-4 text-primary dark:text-secondary" />
									{t(`categories.${key}`)}
								</div>
								<div className="flex flex-wrap gap-1">
									{skills.map((skill) => (
										<SkillBadge key={skill} skill={skill} />
									))}
								</div>
							</div>
						);
					})}
				</Card>
			</BlurFade>
		</section>
	);
}
