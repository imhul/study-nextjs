"use client"

import { useState, useEffect } from "react"
// types
import type { Post, BlogClientProps, SortType } from "@/lib/types"
// components
import { toast } from "sonner"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Paging from "@/components/paging"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardTitle,
    CardAction,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
// config
import { configuration } from "@/lib/configuration"

const itemsPerPage = 9;
const defaultSortType: SortType = "newest";

const BlogClient = (props: BlogClientProps) => {
    const { articles, searchParams } = props

    if (!articles) {
        toast.error("No articles found", {
            description: "Sorry, we couldn't find any articles. Try again later.",
        })
    }

    const [totalPages, setTotalPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sortType, setSortType] = useState<SortType>(defaultSortType)
    const [sortedArticles, setSortedArticles] = useState<Post[]>(articles)

    const sortArticles = () => {
        const page = Number(searchParams?.page ?? 1)
        setCurrentPage(page)
        const start = (page - 1) * itemsPerPage
        const sorters: Record<SortType, (a: Post, b: Post) => number> = {
            newest: (a, b) => a.id - b.id,
            oldest: (a, b) => b.id - a.id,
            asc: (a, b) => a.title.localeCompare(b.title),
            desc: (a, b) => b.title.localeCompare(a.title),
        }
        const sorter = sorters[sortType] || sorters["newest"]
        return [...articles].sort(sorter).slice(start, start + itemsPerPage)
    }

    // paging
    useEffect(() => {
        if (totalPages === 1) setTotalPages(Math.ceil(articles.length / itemsPerPage))
        setSortedArticles(sortArticles())
    }, [searchParams])

    // sotring
    useEffect(() => {
        setSortedArticles(sortArticles())
    }, [sortType])

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mb-4">Blog</h1>
            <div className="space-y-4">
                <div className="flex flex-row flex-wrap pl-8">
                    <Select value={sortType} onValueChange={(value) => {
                        setSortType(value as SortType)
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sorting" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sorting</SelectLabel>
                                {configuration.blogSortTypes.map((sortOption) => (
                                    <SelectItem key={sortOption.value} value={sortOption.value}>
                                        {sortOption.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row flex-wrap">
                    {sortedArticles ? sortedArticles.map((article: Post) => (
                        <div className="basis-1/1 md:basis-1/2 lg:basis-1/3 p-8" key={article.id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{article.title}</CardTitle>
                                    <CardDescription>
                                        <span>User: {article.userId}, </span>
                                        <span>Date: {article.id}</span>
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
                    )) : null}
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
