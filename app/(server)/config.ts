const BASE_URL = "https://jsonplaceholder.typicode.com"

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

export const AUTH_BASE_URL = "http://192.168.1.51:5000"

export const AUTH_API = {
    login: AUTH_BASE_URL + "/login",
    register: AUTH_BASE_URL + "/register",
    resetPassword: AUTH_BASE_URL + "/reset_password",
    setNewPassword: AUTH_BASE_URL + "/set_password",
    refreshToken: AUTH_BASE_URL + "/refresh_token",
}
