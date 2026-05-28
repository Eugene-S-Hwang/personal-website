import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Contacts
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>

        {/* ── Contact ─────────────────────────────────────── */}
        {/* <section id="contact" className="mx-auto max-w-5xl px-12 py-24">
          <div className="flex flex-wrap items-center justify-between gap-10
                          border border-white/[0.07] bg-white/[0.03] p-14">
            <h2 className="font-minecraft text-[clamp(0.85rem,1.8vw,1.3rem)] leading-relaxed text-white">
              Let's build<br />something{" "}
              <span className="text-green-400">great.</span>
            </h2>
            <div className="flex flex-col gap-3">
              <a href="mailto:eugene@example.com"
                 className="bg-green-400 px-7 py-3 text-center text-[0.65rem]
                            uppercase tracking-widest text-[#080b10]
                            transition-all hover:-translate-y-px hover:opacity-85">
                ehwang2@andrew.cmu.edu
              </a>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#"
                     className="flex-1 border border-white/[0.07] px-4 py-3 text-center
                                text-[0.6rem] uppercase tracking-widest text-slate-500
                                transition-colors hover:border-green-400 hover:text-green-400">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
