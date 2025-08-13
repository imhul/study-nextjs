const BASE_URL = "https://jsonplaceholder.typicode.com";

export const API = {
    users: BASE_URL + "/users",
    articles: BASE_URL + "/posts",
    userAlbums: (userId: string) => `${BASE_URL}/users/${userId}/albums`,
    userAlbumPhotos: (albumId: string) => `${BASE_URL}/albums/${albumId}/photos`,
    userTodos: (userId: string) => `${BASE_URL}/users/${userId}/todos`,
    userArticles: (userId: string) => `${BASE_URL}/users/${userId}/posts`,
    article: (id: string) => `${BASE_URL}/posts/${id}`,
    comments: (id: string) => `${BASE_URL}/posts/${id}/comments`,
}
