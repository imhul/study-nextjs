const BASE_URL = "https://jsonplaceholder.typicode.com";

export const API = {
    articles: BASE_URL + "/posts",
    article: (id: string) => `${BASE_URL}/posts/${id}`,
    comments: (id: string) => `${BASE_URL}/posts/${id}/comments`,
}
