import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecom-web';
  categories;
  currentCat;
  constructor(public catService:CatalogueService, public router:Router){
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      })
  }

  getProductsByCat(c)
  {
    this.router.navigateByUrl('/products/2/'+c.id);
    this.currentCat = c;
  }

  onSelectedProducts() {
    this.router.navigateByUrl('/products/1/0');
    this.currentCat = undefined;
  }

  onProductsPromo() {
    this.currentCat=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsAvailable() {
    this.currentCat=undefined;
    this.router.navigateByUrl("/products/4/0");
  }
}
