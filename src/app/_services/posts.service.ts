import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts:Post[] =[];
  private postsUpdated = new Subject<Post[]>();

  constructor(private _http:HttpClient) { }

 

  getPosts(){
    return this._http.get('http://localhost:5000/api/posts');
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }


  addPost(title:string, content:string){
    const post:Post ={title:title, content:content};
    this._http.post('http://localhost:5000/api/posts', post).subscribe(res=>{
    this.postsUpdated.next();
    console.log('წავიდა');
    });
  }

 
}
