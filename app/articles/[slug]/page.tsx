import { getPostContent, getPostMetadata } from "@/app/postService";
import Image from "next/image";
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
    <>
      <section
        className="flex justify-center space-x-5 bg-blue-900 p-2"
        style={{ backgroundColor: "#00001c" }}
      >
        <a
          className="flex items-center font-bold no-underline text-white"
          href="/"
        >
          <Image
            alt="NAISYS Logo"
            priority
            src="/naisys-logo.webp"
            width="35"
            height="35"
          />
          <div className="font-bold ml-2 text-4xl">NAISYS</div>
        </a>
      </section>

      <title>{`NAISYS: ${post.data.title}`}</title>

      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-800 ">{post.data.title}</h1>
        <p className="text-slate-400 mt-2">{formattedDate}</p>
      </div>

      <article
        className="max-w-3xl mx-auto p-4 pb-24 prose prose-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* back to home */}
      <section
        className="flex justify-center space-x-5 p-2"
        style={{ backgroundColor: "#00001c" }}
      >
        <a className="flex items-center no-underline text-white" href="/">
          &lt; Back to Home
        </a>
      </section>
    </>
  );
}
