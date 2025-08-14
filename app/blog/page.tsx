// api
import { getArticles } from "@/app/(server)/api";
// components
import BlogClient from "@/app/blog/blog-client";
// types
import type { BlogPageProps, Post } from "@/lib/types";

const BlogPage = async (props: BlogPageProps) => {
  const articles: Post[] = await getArticles();
  const searchParams = await props.searchParams;

  return articles ? (
    <BlogClient
      articles={articles}
      searchParams={searchParams ?? { page: 1 }}
    />
  ) : (
    <p>No articles found</p>
  );
};

export default BlogPage;
