
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    slug?: string;
}

export interface PagingProps {
    currentPage: number;
    totalPages: number;
    // onPageChange: (page: number) => void;
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
    params: {
        articleId: string;
    };
}
