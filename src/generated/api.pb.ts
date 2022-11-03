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
};

export type Question = {
  id?: number;
  content?: string;
  tags?: Tag[];
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
};

export type UpdatePostResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Post;
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
}
