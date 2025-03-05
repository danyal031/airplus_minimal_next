export interface ArticleDataTypes {
  id: number;
  title: string;
  sub_title: any;
  slug: string;
  body: string;
  summary: string;
  thumbnail: string;
  views: number;
  score: number;
  operator: string;
  operator_avatar: string;
  operator_fullname: string;
  branch: number;
  published_at: any;
  categories: string;
  categories_item: CategoriesItem[];
  tags: string;
  tags_item: TagsItem[];
  metatags: any[];
}

interface CategoriesItem {
  id: number;
  main: any;
  title: string;
  slug: string;
  image: any;
  description: any;
  branch: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

interface TagsItem {
  id: number;
  title: string;
  slug: string;
  description: any;
  branch: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}
