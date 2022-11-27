/* eslint-disable */
// @ts-nocheck
/*
 * This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
 */

import * as fm from './fetch.pb';
export type User = {
  id?: number;
  name?: string;
};

export type Tag = {
  id?: number;
  name?: string;
  isRequired?: boolean;
  questions?: Question[];
};

export type Pagination = {
  offset?: number;
  limit?: number;
  total?: number;
};

export type Post = {
  id?: number;
  title?: string;
  content?: string;
  isReceipe?: boolean;
  author?: User;
  tags?: Tag[];
  createdAt?: string;
  updatedAt?: string;
  upvote?: number;
  downvote?: number;
  cookTime?: number;
  questions?: Question[];
  thumbnail?: string;
};

export type Question = {
  id?: number;
  content?: string;
  tags?: Tag[];
};

export type UploadUrlUploadHeader = {
  key?: string;
  value?: string;
};

export type UploadUrl = {
  url?: string;
  fields?: UploadUrlUploadHeader[];
};

export type GetPostByIdRequest = {
  id?: number;
};

export type GetPostByIdResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Post;
};

export type SuggestionPostsRequest = {
  tags?: string;
  limit?: number;
  offset?: number;
};

export type SuggestionPostsResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Post[];
};

export type RandomQuestionsRequest = {
  number?: number;
};

export type RandomQuestionsResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Question[];
};

export type CreatePostsRequest = {
  title?: string;
  content?: string;
  isReceipe?: boolean;
  tagIds?: number[];
  cookTime?: number;
  thumbnail?: string;
};

export type CreatePostsResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Post;
};

export type UpdatePostRequest = {
  id?: number;
  title?: string;
  content?: string;
  isReceipe?: boolean;
  tagIds?: number[];
  cookTime?: number;
  thumbnail?: string;
};

export type UpdatePostResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Post;
};

export type ListPostsRequest = {
  limit?: number;
  offset?: number;
};

export type ListPostsResponsePostPagination = {
  pagination?: Pagination;
  posts?: Post[];
};

export type ListPostsResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: ListPostsResponsePostPagination;
};

export type ListPostsMeRequest = {
  limit?: number;
  offset?: number;
};

export type ListPostsMeResponsePostPagination = {
  pagination?: Pagination;
  posts?: Post[];
};

export type ListPostsMeResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: ListPostsMeResponsePostPagination;
};

export type GetUploadUrlRequest = {
  fileName?: string;
};

export type GetUploadUrlResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: UploadUrl;
};

export class CookieService {
  static GetPostById(
    req: GetPostByIdRequest,
    initReq?: fm.InitReq
  ): Promise<GetPostByIdResponse> {
    return fm.fetchReq<GetPostByIdRequest, GetPostByIdResponse>(
      `/post-by-id?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static RandomQuestions(
    req: RandomQuestionsRequest,
    initReq?: fm.InitReq
  ): Promise<RandomQuestionsResponse> {
    return fm.fetchReq<RandomQuestionsRequest, RandomQuestionsResponse>(
      `/random-questions?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static SuggestionPosts(
    req: SuggestionPostsRequest,
    initReq?: fm.InitReq
  ): Promise<SuggestionPostsResponse> {
    return fm.fetchReq<SuggestionPostsRequest, SuggestionPostsResponse>(
      `/suggestion-posts?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static CreatePosts(
    req: CreatePostsRequest,
    initReq?: fm.InitReq
  ): Promise<CreatePostsResponse> {
    return fm.fetchReq<CreatePostsRequest, CreatePostsResponse>(`/posts`, {
      ...initReq,
      method: 'POST',
      body: JSON.stringify(req, fm.replacer),
    });
  }
  static UpdatePost(
    req: UpdatePostRequest,
    initReq?: fm.InitReq
  ): Promise<UpdatePostResponse> {
    return fm.fetchReq<UpdatePostRequest, UpdatePostResponse>(
      `/posts/${req['id']}`,
      { ...initReq, method: 'PUT', body: JSON.stringify(req, fm.replacer) }
    );
  }
  static ListPosts(
    req: ListPostsRequest,
    initReq?: fm.InitReq
  ): Promise<ListPostsResponse> {
    return fm.fetchReq<ListPostsRequest, ListPostsResponse>(
      `/posts?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static ListPostsMe(
    req: ListPostsMeRequest,
    initReq?: fm.InitReq
  ): Promise<ListPostsMeResponse> {
    return fm.fetchReq<ListPostsMeRequest, ListPostsMeResponse>(
      `/posts/me?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static GetUploadUrl(
    req: GetUploadUrlRequest,
    initReq?: fm.InitReq
  ): Promise<GetUploadUrlResponse> {
    return fm.fetchReq<GetUploadUrlRequest, GetUploadUrlResponse>(
      `/upload/presigned-upload`,
      { ...initReq, method: 'POST', body: JSON.stringify(req, fm.replacer) }
    );
  }
}
