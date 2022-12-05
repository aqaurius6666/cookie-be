import { Bookmark, Post } from '../model';
import BookmarkSchema from '../schema/bookmark.schema';
import { dataSource } from './repository';

export class BookmarkRepository {
  private static readonly bookmarkRepo =
    dataSource.getRepository(BookmarkSchema);

  static async createBookmark(userId: number, postId: number): Promise<void> {
    const bookmark = await this.bookmarkRepo.findBy({
      user: {
        id: userId,
      },
      post: {
        id: postId,
      },
    });
    if (bookmark.length) return;
    const _bookmark = new Bookmark();
    _bookmark.user = { id: userId };
    _bookmark.post = { id: postId };
    await this.bookmarkRepo.save(_bookmark);
  }

  static async deleteBookmark(userId: number, postId: number): Promise<void> {
    const bookmark = await this.bookmarkRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
    });
    if (bookmark == null) return;

    await this.bookmarkRepo.delete({
      user: {
        id: userId,
      },
      post: {
        id: postId,
      },
    });
  }

  static async getBookmarkPosts(userId: number): Promise<Post[]> {
    const bookmarks = await this.bookmarkRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['post'],
      order: {
        created_at: 'DESC',
      },
    });

    if (!bookmarks) return [];
    return bookmarks.map((bookmark) => bookmark.post!);
  }
}
