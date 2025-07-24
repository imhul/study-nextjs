import { getArticleById } from "@/app/(server)/api";

const ArticlePage = async (props: any) => {
    const article = await getArticleById(props.params.articleId);

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
        </div>
    )
}

export default ArticlePage