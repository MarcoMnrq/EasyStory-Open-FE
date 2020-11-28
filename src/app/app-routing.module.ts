import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from './pages/feed/feed.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ViewPostComponent} from './pages/view-post/view-post.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {BookmarksComponent} from './pages/bookmarks/bookmarks.component';
import {NewPostComponent} from './pages/new-post/new-post.component';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {EditPostsComponent} from './pages/edit-posts/edit-posts.component';
import {PostHashtagsComponent} from './pages/post-hashtags/post-hashtags.component';
import {HashtagSearchComponent} from './pages/hashtag-search/hashtag-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'feed', component: FeedComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'hashtag/:id', component: HashtagSearchComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'new-post', component: NewPostComponent},
  { path: 'profile/:id/edit', component: EditProfileComponent},
  // ,,
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'post/:id/edit', component: EditPostsComponent},
  { path: 'post/:id/hashtags', component: PostHashtagsComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
