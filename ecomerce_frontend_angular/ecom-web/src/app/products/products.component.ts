import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products;
  currentProduct: any;
  editPhoto: boolean;
  private selectedFiles;
  progress: number;
  private currentFileUpload: any;
  private currentTime: number;
  constructor(public catService:CatalogueService,
              public route:ActivatedRoute,
              public router:Router){
  }

  ngOnInit(): void {
    this.defaultRoute();
    this.router.events.subscribe((val=>{
      if (val instanceof NavigationStart) {
        let url = val.url;
        let p1 = this.route.snapshot.params.p1;
        let idCat = this.route.snapshot.params.p2;
        if (p1 == 1)
        {
          this.defaultRoute();
        }
        else if (p1 == 2)
        {
          this.getProducts('/categories/' + idCat + '/products');
        }
        else if (p1==3)
        {
          this.getProducts('/products/search/promoProducts');
        }
        else if (p1==4)
        {
          this.getProducts('/products/search/dispoProducts');
        }
      }    }));
  }

  private  defaultRoute()
  {
      this.getProducts('/productses/search/selectedProducts');
  }

  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data=>{
        this.products=data;
      },err=>{
        console.log(err);
      })
  }

  OnEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }
}
