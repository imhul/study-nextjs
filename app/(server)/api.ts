import { API, itemsPerPage } from "./config";
// types
import type { Post, Comment } from "@/lib/types";

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

export async function getUsers() {
    const response = await fetch(API.users);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
}

export async function patchPost(post: Post) {
    const response = await fetch(API.article(post.id.toString()), {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error("Failed to patch post");
    }
    return { ok: true };
}

export async function patchComment(postId: number, comments: Comment[]) {
    const response = await fetch(API.comments(postId.toString()), {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(comments),
    });
    if (!response.ok) {
        throw new Error("Failed to update comments");
    }
    return { ok: true };
}

