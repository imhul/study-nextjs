// api
import { getArticleById, getCommentsByArticleId } from "@/app/(server)/api"
// components
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import Editor from "@/components/editor"
// types
import type { Post, Comment, ArticlePageProps } from "@/lib/types"
// utils
import Toast from "@/components/toast"

const Page = async (props: ArticlePageProps) => {
  const params = await props.params
  const article: Post = await getArticleById(params.articleId)
  const comments = await getCommentsByArticleId(params.articleId)

  return (
    <div>
      {params && !article && <Toast />}
      <Card className="p-8 bg-transparent mb-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="mb-10">{article.body}</p>
        {article && <Editor editType="post" action="patch" post={article} />}
      </Card>

      <Card className="p-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <Card key={comment.id} className="mb-4 bg-gray-800">
              <CardHeader>
                <CardTitle>{comment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{comment.body}</CardDescription>
              </CardContent>
              <CardFooter>
                <Editor
                  editType="comment"
                  action="update"
                  comment={comment}
                  comments={comments}
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No comments yet...</p>
        )}
      </Card>
    </div>
  )
}

export default Page
