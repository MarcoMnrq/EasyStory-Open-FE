import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from './pages/feed/feed.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ViewPostComponent} from './pages/view-post/view-post.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {BookmarksComponent} from './pages/bookmarks/bookmarks.component';

const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full'},
  { path: 'feed', component: FeedComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: '**', component: PageNotFoundComponent}
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
