import { getArticles } from "@/app/(server)/api";

interface Article {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const BlogPage = async () => {
    const articles: Article[] = await getArticles();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Blog</h1>
            <div className="space-y-4">
                {articles.map((article: any) => (
                    <div key={article.id} className="p-4 border rounded">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p>{article.body}</p>
                        <a href={`/blog/${article.id}`} className="text-blue-500 hover:underline">
                            Read more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogPage
