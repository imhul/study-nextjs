export interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
  name?: string;
}

export interface Comment extends Post {
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
  searchParams?: { page?: string };
}

export interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
}

export type SortType = "newest" | "oldest" | "asc" | "desc";
export type EditType = "post" | "comment";
export type EditAction = "create" | "update" | "delete" | "patch";

export interface EditorProps {
  action: EditAction;
  editType: EditType;
  post?: Post;
  comment?: Comment;
  comments?: Comment[];
}
