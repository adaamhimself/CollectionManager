import { Component, OnInit } from '@angular/core';
import { Article } from '../Article';
import { ArticleService } from '../article.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    public articles: Array<Article> = [];
    public warning: string;
    private articleSub: any = null;

    constructor(private articleService: ArticleService) { }

    ngOnInit(): void {
        //retrieve all articles
        this.articleSub = this.articleService.getListOfArticles().subscribe(
            (response) => {
                if (response && response.length > 0){
                    this.articles = response;
                }
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.articleSub) this.articleSub.unsubscribe();
    }
}
