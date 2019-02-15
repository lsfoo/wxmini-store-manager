import { CategoryResourceService } from './../../../../shared/api/categoryResource.service'
import { Component, OnInit } from '@angular/core'
import { Category } from 'shared'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryResourceService: CategoryResourceService) {}
  categories: Array<Category> = []

  ngOnInit() {}
  getList() {
    this.categoryResourceService
      .getAllCategoriesUsingGET()
      .subscribe((res: Array<Category>) => {
        this.categories = res
      })
  }
}
