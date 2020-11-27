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
import {FormsModule} from '@angular/forms';

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
    ListCommentsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
