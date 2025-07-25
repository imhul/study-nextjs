"use client"

// types
import type { Post, BlogClientProps } from "@/lib/types";
// components
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import Paging from "@/components/paging";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const BlogClient = (props: BlogClientProps) => {
    const { articles, currentPage, totalPages } = props

    console.info("BlogClient currentPage: ", currentPage);


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
