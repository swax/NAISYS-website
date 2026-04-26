import { getPostContent, getPostMetadata } from "@/app/postService";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";

// Used this project as a reference: https://github.com/pixegami/nextjs-blog-tutorial/

interface ArticleProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = async () => {
  return getPostMetadata().map((post) => ({
    slug: post.slug,
  }));
};

export default async function Article({ params }: ArticleProps) {
  const { slug } = await params;
  const post = getPostContent(slug);

  const formattedDate = new Date(post.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const htmlContent = await marked(post.content);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-4 sm:px-8">
          <Link
            className="flex items-center gap-3 font-semibold text-slate-950 no-underline"
            href="/"
          >
            <Image
              alt="NAISYS Logo"
              className="rounded-md border border-slate-200"
              priority
              src="/naisys-logo.webp"
              width="36"
              height="36"
            />
            <span>NAISYS</span>
          </Link>
        </div>
      </section>

      <title>{`NAISYS: ${post.data.title}`}</title>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <h1 className="text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
          {post.data.title}
        </h1>
        <p className="mt-3 text-slate-500">{formattedDate}</p>
        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <p className="font-semibold">Archive note</p>
          <p className="mt-1">
            This is an older project note and may describe early experimental
            versions of NAISYS rather than the current system.
          </p>
        </div>
      </div>

      <article
        className="prose prose-slate mx-auto max-w-3xl px-5 pb-16 sm:px-8 prose-a:text-teal-700 prose-a:no-underline prose-a:hover:text-teal-900"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 no-underline hover:text-slate-950"
            href="/"
          >
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
