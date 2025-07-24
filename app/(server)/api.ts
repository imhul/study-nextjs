export async function getArticles() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }
    return response.json();
}

export async function getArticleById(id: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }
    return response.json();
}
