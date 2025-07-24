import { API } from "./config";

export async function getArticles() {
    const response = await fetch(API.articles);
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }
    return response.json();
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
