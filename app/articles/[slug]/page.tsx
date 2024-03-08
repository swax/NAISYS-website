import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import path from "path";

// Used this project as a reference: https://github.com/pixegami/nextjs-blog-tutorial/

interface ArticleProps {
  params: {
    slug: string;
  };
}

interface PostMetadata {
  title: string;
  date: string;
  subtitle: string;
  slug: string;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

function getPostMetadata(): PostMetadata[] {
  const folder = "articles/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`articles/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
}

function getPostContent(slug: string) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("articles", `${slug}.md`))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  return { data, content };
}

export default function Article({ params: { slug } }: ArticleProps) {
  const post = getPostContent(slug);
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-slate-600 ">{post.data.title}</h1>
        <p className="text-slate-400 mt-2">{post.data.date}</p>
      </div>

      <article className="prose">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
}
