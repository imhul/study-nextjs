import { getArticles, getArticleById, getCommentsByArticleId } from "@/app/(server)/api";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Post } from "@/lib/types";

const Page = async (props: any) => {
    const params = await props.params;
    const article: Post = await getArticleById(params.articleId);
    const comments = await getCommentsByArticleId(params.articleId);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="mb-10">{article.body}</p>

            <Card className="p-8">
                <h2 className="text-2xl font-bold">Comments</h2>
                {comments.map((comment: any) => (
                    <Card key={comment.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{comment.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{comment.body}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </Card>
        </div>
    )
}

export default Page
