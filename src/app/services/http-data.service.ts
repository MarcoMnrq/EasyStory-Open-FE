import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Post} from '../models/post';
import {catchError, retry} from 'rxjs/operators';
import {Hashtag} from '../models/hashtag';
import {User} from '../models/user';
import {Bookmark} from '../models/bookmark';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Base de los endpoints
  basePath = 'https://easystory-api.herokuapp.com/api';

  constructor(private http: HttpClient) {
  }

  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Error Handling API
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error ocurred: ', error.error.message);
    } else {
      console.log(`API returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  // Get All Posts
  getAllPosts(): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/posts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Hashtags
  getAllHashtags(): Observable<Hashtag> {
    return this.http.get<Hashtag>(`${this.basePath}/hashtags`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Hashtags by Post Id
  getAllHashtagsByPostId(postId): Observable<Hashtag> {
    return this.http.get<Hashtag>(`${this.basePath}/posts/${postId}/hashtags`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get post by id
  getPostById(id): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/posts/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Post By Userid
  getAllPostByUserId(userId): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/users/${userId}/posts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get user by id
  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.basePath}/users/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Bookmarks by userId
  getAllBookmarks(userId): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.basePath}/users/${userId}/bookmarks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Bookmarks by userId
  getAllCommentsByPostId(postId): Observable<Comment> {
    return this.http.get<Comment>(`${this.basePath}/posts/${postId}/comments`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Post a Comment
  addComment(userId, postId, item): Observable<Comment> {
    return this.http.post<Comment>(`${this.basePath}/users/${userId}/posts/${postId}/comments`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get All Bookmarks by userId
  deleteBookmark(userId, postId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/users/${userId}/posts/${postId}/bookmarks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
