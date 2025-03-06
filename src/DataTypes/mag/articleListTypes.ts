export interface ArticleDataTypes {
  id: number;
  title: string;
  sub_title?: string;
  slug: string;
  body: string;
  summary: string;
  thumbnail?: string;
  views: number;
  score: number;
  operator: Operator;
  branch: number;
  published_at: any;
  categories: Category[];
  tags: Tag[];
  metatags: any[];
}

export interface Operator {
  id: string;
  avatar: any;
  fullname: string;
}

export interface Category {
  id: number;
  main: any;
  title: string;
  slug: string;
  image: string;
  description: any;
  branch: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Tag {
  id: number;
  title: string;
  slug: string;
  description: any;
  branch: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
