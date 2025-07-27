// api
import { getArticleById, getCommentsByArticleId } from "@/app/(server)/api";
// components
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { toast } from "sonner"
// types
import type { Post, Comment, ArticlePageProps } from "@/lib/types";

const Page = async (props: ArticlePageProps) => {
    const params = await props.params;
    const article: Post = await getArticleById(params.articleId);
    const comments = await getCommentsByArticleId(params.articleId);

    if (!article) {
        toast.error("Article not found", {
            description: "Sorry, we couldn't find the article you requested. Try again later.",
        })
    } else {
        toast.success("Article loaded successfully", {
            description: "Here is the article you requested.",
        })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="mb-10">{article.body}</p>

            <Card className="p-8">
                <h2 className="text-2xl font-bold">Comments</h2>
                {comments.length > 0 ? comments.map((comment: Comment) => (
                    <Card key={comment.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{comment.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{comment.body}</CardDescription>
                        </CardContent>
                    </Card>
                )) : (
                    <p>No comments yet...</p>
                )}
            </Card>
        </div>
    )
}

export default Page
