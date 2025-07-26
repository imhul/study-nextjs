import { API, itemsPerPage } from "./config";

export async function getArticles(page: number) {
    const response = await fetch(API.articles);
    if (!response.ok) throw new Error("Failed to fetch articles");

    const json = await response.json();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
        articles: json.slice(start, end),
        totalPages: Math.ceil(json.length / itemsPerPage),
    }
}

export async function getArticleById(id: string) {
    const response = await fetch(API.article(id));
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }
    return response.json();
}

export async function getCommentsByArticleId(id: string) {
    const response = await fetch(API.comments(id));
    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }
    return response.json();
}
