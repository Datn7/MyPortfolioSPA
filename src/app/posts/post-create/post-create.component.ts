import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
 
  enteredTitle='';
  enteredContent='';

  constructor(private _postService:PostsService ) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm){
    this._postService.addPost(form.value.title,form.value.content);
    console.log(form.value);
  }

}
