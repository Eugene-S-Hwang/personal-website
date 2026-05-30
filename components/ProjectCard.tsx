const FEATURED_TITLES = new Set(["Grantflow", "MosaicGPU"]);

function FeaturedStar() {
  return (
    <svg
      className="h-4 w-4 fill-green-400"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
    </svg>
  );
}

export interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  href: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags = [],
  href,
  featured,
}: ProjectCardProps) {
  const isFeatured = featured ?? FEATURED_TITLES.has(title);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-full flex-col border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-green-400"
    >
      {isFeatured && (
        <span
          className="absolute left-3 top-3"
          aria-label="Featured project"
          title="Featured project"
        >
          <FeaturedStar />
        </span>
      )}

      <div className={isFeatured ? "pl-6" : undefined}>
        <h3 className="mb-2 text-base text-white">{title}</h3>
        <p className="mb-4 text-sm leading-snug text-slate-400">{description}</p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[0.6rem] tracking-wide text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}
