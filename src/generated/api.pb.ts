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

export type Voting = {
  upvote?: number;
  downvote?: number;
  id?: number;
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

export type GetUsersBookmarksRequest = {
  userId?: string;
};

export type GetUsersBookmarksResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: number[];
};

export type PostUsersBookmarksRequest = {
  userId?: string;
  postId?: number;
};

export type PostUsersBookmarksResponse = {
  success?: boolean;
  status?: number;
  message?: string;
};

export type DeleteUsersBookmarksRequest = {
  userId?: string;
  postId?: number;
};

export type DeleteUsersBookmarksResponse = {
  success?: boolean;
  status?: number;
  message?: string;
};

export type GetPostsBookmarkRequest = {
  limit?: number;
  offset?: number;
};

export type GetPostsBookmarkResponsePostPagination = {
  pagination?: Pagination;
  posts?: Post[];
};

export type GetPostsBookmarkResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: GetPostsBookmarkResponsePostPagination;
};

export type PostUsersUpvoteRequest = {
  userId?: string;
  postId?: number;
};

export type PostUsersUpvoteResponse = {
  success?: boolean;
  status?: number;
  message?: string;
};

export type PostUsersDownvoteRequest = {
  userId?: string;
  postId?: number;
};

export type PostUsersDownvoteResponse = {
  success?: boolean;
  status?: number;
  message?: string;
};

export type GetPostsVotingRequest = {
  postIds?: string;
};

export type GetPostsVotingResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Voting[];
};

export type PostUserUnvoteRequest = {
  userId?: string;
  postId?: number;
};

export type PostUserUnvoteResponse = {
  success?: boolean;
  status?: number;
  message?: string;
};

export type GetUsersVotingsRequest = {
  userId?: string;
};

export type GetUsersVotingsResponse = {
  success?: boolean;
  status?: number;
  message?: string;
  data?: Voting[];
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
  static GetUsersBookmarks(
    req: GetUsersBookmarksRequest,
    initReq?: fm.InitReq
  ): Promise<GetUsersBookmarksResponse> {
    return fm.fetchReq<GetUsersBookmarksRequest, GetUsersBookmarksResponse>(
      `/users/${req['userId']}/bookmarks?${fm.renderURLSearchParams(req, [
        'userId',
      ])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static PostUsersBookmarks(
    req: PostUsersBookmarksRequest,
    initReq?: fm.InitReq
  ): Promise<PostUsersBookmarksResponse> {
    return fm.fetchReq<PostUsersBookmarksRequest, PostUsersBookmarksResponse>(
      `/users/${req['userId']}/bookmarks`,
      { ...initReq, method: 'POST', body: JSON.stringify(req, fm.replacer) }
    );
  }
  static DeleteUsersBookmarks(
    req: DeleteUsersBookmarksRequest,
    initReq?: fm.InitReq
  ): Promise<DeleteUsersBookmarksResponse> {
    return fm.fetchReq<
      DeleteUsersBookmarksRequest,
      DeleteUsersBookmarksResponse
    >(`/users/${req['userId']}/bookmarks`, {
      ...initReq,
      method: 'DELETE',
      body: JSON.stringify(req, fm.replacer),
    });
  }
  static GetPostsBookmark(
    req: GetPostsBookmarkRequest,
    initReq?: fm.InitReq
  ): Promise<GetPostsBookmarkResponse> {
    return fm.fetchReq<GetPostsBookmarkRequest, GetPostsBookmarkResponse>(
      `/posts/bookmark?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static PostUsersUpvote(
    req: PostUsersUpvoteRequest,
    initReq?: fm.InitReq
  ): Promise<PostUsersUpvoteResponse> {
    return fm.fetchReq<PostUsersUpvoteRequest, PostUsersUpvoteResponse>(
      `/users/${req['userId']}/upvote`,
      { ...initReq, method: 'POST', body: JSON.stringify(req, fm.replacer) }
    );
  }
  static PostUsersDownvote(
    req: PostUsersDownvoteRequest,
    initReq?: fm.InitReq
  ): Promise<PostUsersDownvoteResponse> {
    return fm.fetchReq<PostUsersDownvoteRequest, PostUsersDownvoteResponse>(
      `/users/${req['userId']}/downvote`,
      { ...initReq, method: 'POST', body: JSON.stringify(req, fm.replacer) }
    );
  }
  static GetPostsVoting(
    req: GetPostsVotingRequest,
    initReq?: fm.InitReq
  ): Promise<GetPostsVotingResponse> {
    return fm.fetchReq<GetPostsVotingRequest, GetPostsVotingResponse>(
      `/posts/voting?${fm.renderURLSearchParams(req, [])}`,
      { ...initReq, method: 'GET' }
    );
  }
  static PostUserUnvote(
    req: PostUserUnvoteRequest,
    initReq?: fm.InitReq
  ): Promise<PostUserUnvoteResponse> {
    return fm.fetchReq<PostUserUnvoteRequest, PostUserUnvoteResponse>(
      `/users/${req['userId']}/unvote`,
      { ...initReq, method: 'POST', body: JSON.stringify(req, fm.replacer) }
    );
  }
  static GetUsersVotings(
    req: GetUsersVotingsRequest,
    initReq?: fm.InitReq
  ): Promise<GetUsersVotingsResponse> {
    return fm.fetchReq<GetUsersVotingsRequest, GetUsersVotingsResponse>(
      `/users/${req['userId']}/votings?${fm.renderURLSearchParams(req, [
        'userId',
      ])}`,
      { ...initReq, method: 'GET' }
    );
  }
}
