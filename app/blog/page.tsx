// api
import { getArticles } from "@/app/(server)/api";
// components
import BlogClient from "@/app/blog/blog-client";
// types
import type { Post, BlogPageProps } from "@/lib/types";

const BlogPage = async (props: BlogPageProps) => {
    const searchParams = await props.searchParams;
    /* @next-codemod-ignore */
    const page = Number(searchParams?.page ?? 1);
    const { articles, totalPages }: { articles: Post[], totalPages: number } = await getArticles(page)

    return (
        <BlogClient
            articles={articles}
            currentPage={page}
            totalPages={totalPages}
        />
    )
}

export default BlogPage
