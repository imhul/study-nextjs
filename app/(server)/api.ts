import { API } from "./config"
// types
import type { Post, Comment } from "@/lib/types"

const headers = {
  "Content-type": "application/json; charset=UTF-8",
}

export const newError = (message: string) => {
  throw new Error("Failed to " + message)
}

export async function getArticles() {
  const response = await fetch(API.articles)
  if (!response.ok) newError("fetch articles")
  return response.json()
}

export async function getArticleById(id: string) {
  const response = await fetch(API.article(id))
  if (!response.ok) newError("fetch article")
  return response.json()
}

export async function getCommentsByArticleId(id: string) {
  const response = await fetch(API.comments(id))
  if (!response.ok) newError("fetch comments")
  return response.json()
}

export async function getUsers() {
  const response = await fetch(API.users)
  if (!response.ok) newError("fetch users")
  return response.json()
}

export async function patchPost(post: Post) {
  const response = await fetch(API.article(post.id.toString()), {
    headers,
    method: "PATCH",
    body: JSON.stringify(post),
  })
  if (!response.ok) newError("patch post")
  return { ok: true }
}

export async function patchComment(postId: number, comments: Comment[]) {
  const response = await fetch(API.comments(postId.toString()), {
    headers,
    method: "PUT",
    body: JSON.stringify(comments),
  })
  if (!response.ok) newError("update comments")
  return { ok: true }
}
