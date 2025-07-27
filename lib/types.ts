
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    body: string;
    email: string;
    userId?: number;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface PagingProps {
    currentPage: number;
    totalPages: number;
}

export interface BlogPageProps {
    searchParams: Promise<{ page: string }>;
}


export interface BlogClientProps {
    articles: Post[];
    currentPage: number;
    totalPages: number;
}

export interface ArticlePageProps {
    params: Promise<{ articleId: string }>;
}

export interface GetArticlesResponse {
    articles: Post[];
    totalPages: number;
}
