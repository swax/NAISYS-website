import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface PostMetadata {
  title: string;
  date: string;
  slug: string;
}

const articlesFolder = "markdown/articles";

export function getPostMetadata(): PostMetadata[] {
  const files = fs.readdirSync(articlesFolder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  return markdownPosts
    .map((fileName) => {
      const fileContents = fs.readFileSync(
        `${articlesFolder}/${fileName}`,
        "utf8",
      );

      const matterResult = matter(fileContents);

      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        slug: fileName.replace(".md", ""),
      };
    })
    .toSorted(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostContent(slug: string) {
  const markdownWithMetadata = fs
    .readFileSync(path.join(articlesFolder, `${slug}.md`))
    .toString();

  return matter(markdownWithMetadata);
}
