import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './pages/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { ListHashtagsComponent } from './pages/list-hashtags/list-hashtags.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ListCommentsComponent } from './pages/list-comments/list-comments.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { LoginComponent} from './pages/login/login.component';
import { RegisterComponent} from './pages/register/register.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import { EditPostsComponent } from './pages/edit-posts/edit-posts.component';
import {ListQualificationsComponent} from './pages/list-qualification/list-qualification.component';
import { PostHashtagsComponent } from './pages/post-hashtags/post-hashtags.component';
import { HashtagSearchComponent } from './pages/hashtag-search/hashtag-search.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ProfileComponent,
    ViewPostComponent,
    ListHashtagsComponent,
    PageNotFoundComponent,
    BookmarksComponent,
    ListCommentsComponent,
    NewPostComponent,
    EditProfileComponent,
    RegisterComponent,
    LoginComponent,
    EditPostsComponent,
    ListQualificationsComponent,
    PostHashtagsComponent,
    HashtagSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
