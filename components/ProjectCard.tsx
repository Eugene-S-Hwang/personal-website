export interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags = [],
  href,
}: ProjectCardProps) {
  const content = (
    <>
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
    </>
  );

  const className =
    "flex h-full flex-col border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-green-400";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
