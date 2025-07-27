"use client"

// types
import type { Post, BlogClientProps } from "@/lib/types"
// components
import { toast } from "sonner"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Paging from "@/components/paging"
import {
    Card,
    CardTitle,
    CardAction,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"

const BlogClient = (props: BlogClientProps) => {
    const { articles, currentPage, totalPages } = props

    if (!articles) {
        toast.error("No articles found", {
            description: "Sorry, we couldn't find any articles. Try again later.",
        })
    } else {
        toast.success("Articles loaded successfully", {
            description: "Here are the articles you requested.",
        })
    }

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mb-4">Blog</h1>
            <div className="space-y-4">
                <div className="flex flex-row flex-wrap">
                    {articles.map((article: Post) => (
                        <div className="basis-1/3 p-8" key={article.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{article.title}</CardTitle>
                                    <CardDescription>
                                        User {article.userId}
                                    </CardDescription>
                                    <CardAction>
                                        <Link href={`/blog/${article.id}`}>
                                            <Button variant="outline" type="button">
                                                Read more
                                            </Button>
                                        </Link>
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>{article.body}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <Paging
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}

export default BlogClient
