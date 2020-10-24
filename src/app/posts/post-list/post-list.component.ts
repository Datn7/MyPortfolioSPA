import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: [ './post-list.component.css' ]
})
export class PostListComponent implements OnInit {
	staticPosts = [
		{ title: 'პირველი', content: 'პირველი სტატიკური კონტენტი' },
		{ title: 'მეორე', content: 'პირველი სტატიკური კონტენტი' },
		{ title: 'მესამე', content: 'პირველი სტატიკური კონტენტი' }
	];
	posts: Post[] = [];
	private postsSub: Subscription;

	constructor(private _postService: PostsService) {}

	ngOnInit(): void {
		this._postService.getPosts().subscribe((posts: Post[]) => {
			this.posts = posts;
		});
		this.postsSub = this._postService.getPostUpdateListener().subscribe((posts: Post[]) => {
			this.posts = posts;
		});
	}

	ngOnDestroy() {
		this.postsSub.unsubscribe();
	}
}
