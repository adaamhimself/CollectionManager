import { Component, OnInit } from '@angular/core';
import { Article } from '../Article';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    public articles: Array<Article> = [];
    public warning: string;
    public searchError = "";
    public loadMessage = "Loading...";
    public role = "";
    public query = "";
    private articleSub: any = null;
    private searchSub: any = null;
    private roleSub: any = null;

    constructor(private articleService: ArticleService, private auth: AuthService) { }

    ngOnInit(): void {
        this.showArticles();
        //get the user's role so "add article" can only be seen by admin users
        this.roleSub = this.auth.isAdministrator().subscribe(
            (response) => {
                this.role = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    showArticles(): void {
        //retrieve all articles
        this.articleSub = this.articleService.getListOfArticles().subscribe(
            (response) => {
                this.articles = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //called when user clicks the "search" button
    search(): void {
        if (this.query.length == 0){
            this.showArticles();//no query; show all
        }
        else if (this.query.length <= 2){
            this.searchError = "Search query is too small";
        } else if (this.query.length > 50) {
            this.searchError = "Search query is too long";
        } else {
            this.searchError = "";
            this.loadMessage = "Loading..."
            this.articles = [];
            //retrieve only articles that match the search query (title, category, etc.)
            /*this.searchSub = this.articleService.searchArticles(this.query).subscribe(
                (response) => {
                    if (response.lenth == 0) this.loadMessage = "No articles found with that query"
                    else this.articles = response;
                },
                (error) => {
                    this.warning = error.error;
                }
            );*/
        }
        
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.articleSub) this.articleSub.unsubscribe();
        if (this.searchSub) this.articleSub.unsubscribe();
        if (this.roleSub) this.roleSub.unsubscribe();
    }
}
