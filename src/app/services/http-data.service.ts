import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, pipe, throwError} from 'rxjs';
import {Post} from '../models/post';
import {catchError, retry} from 'rxjs/operators';
import {Hashtag} from '../models/hashtag';
import {User} from '../models/user';
import {Bookmark} from '../models/bookmark';
import {Comment} from '../models/comment';
import {Subscribe} from '../models/subscribe';
import {Qualification} from '../models/qualification';

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

  // Edit a Post
  updatePost(userId, postId, item): Observable<void>{
    return this.http.put<void>(`${this.basePath}/users/${userId}/posts/${postId}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Add a new post
  addNewPost(userId, item): Observable<Post> {
    return this.http.post<Post>(`${this.basePath}/users/${userId}/posts`, JSON.stringify(item), this.httpOptions)
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

  // Get All Posts by HashtagId
  getAllPostsByHashtagId(hashtagId): Observable<Hashtag> {
    return this.http.get<Hashtag>(`${this.basePath}/hashtags/${hashtagId}/posts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



  // Get user by id
  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.basePath}/users/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get user by id
  getHashtagById(id): Observable<Hashtag> {
    return this.http.get<Hashtag>(`${this.basePath}/hashtags/${id}`, this.httpOptions)
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

  // Post a subscribe
  addSubscription(user, userId, item): Observable<Subscribe>{
    return this.http.post<Subscribe>(`${this.basePath}/users/${user}/subscriptions/${userId}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Cancel a suscription
  removeSuscription(user, userId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/users/${user}/subscriptions/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Subscription
  getSubscription(user, userId): Observable<Subscribe>{
    return this.http.get<Subscribe>(`${this.basePath}/users/${user}/subscriptions/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



  // Edit Profile
  editProfile(userId, item): Observable<User> {
    return this.http.put<User>(`${this.basePath}/users/${userId}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create a bookmark
  addBookmark(userId, postId): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.basePath}/users/${userId}/posts/${postId}/bookmarks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Validate a Bookmark
  validateBookmark(userId, postId): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.basePath}/users/${userId}/posts/${postId}/bookmarks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Remove a bookmark
  removeBookmark(userId, postId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/users/${userId}/posts/${postId}/bookmarks`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Remove a post
  removePost(userId, postId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/users/${userId}/posts/${postId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  removeComment(commentId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/comments/${commentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Assign Hashtag
  assignHashtag(postId, hashtagId): Observable<Post> {
    return this.http.post<Post>(`${this.basePath}/posts/${postId}/hashtags/${hashtagId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  // Unassign Hashtag
  unassignHashtag(postId, hashtagId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/posts/${postId}/hashtags/${hashtagId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Qualifications by postId
  getAllQualificationsByPostId(postId): Observable<Qualification>{
    return this.http.get<Qualification>(`${this.basePath}/posts/${postId}/qualifications`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Post a Qualification
  addQualification(userId, postId, item): Observable<Qualification>{
    // tslint:disable-next-line:max-line-length
    return this.http.post<Qualification>(`${this.basePath}/users/${userId}/posts/${postId}/qualifications`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
