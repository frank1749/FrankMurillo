import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public productForm: FormGroup;
  private routeSub: Subscription | undefined;
  isUpdate: boolean = false;
  idUpdate: number | string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idUpdate = id;
        this.isUpdate = true;
        // Aquí se obtiene los datos del producto a actualizar
        this.loadProduct(id);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  public loadProduct(id: number | string) {
    this.productService.getProductById(id).pipe(
      catchError((error) => {
        console.log(error);
        this.snackBar.open('Producto no encontrado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/products']);
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        this.isUpdate = true;
        this.productForm.patchValue(response);
        console.log('id data', response);
      }
    });
  }

  public onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isUpdate) {
        this.update(product);
      } else {
        this.create(product);
      }
    }
  }

  public create(product: Product) {
    product.date_release = formatDate(product.date_release, 'yyyy-MM-dd', 'en-US');
    product.date_revision = formatDate(product.date_revision, 'yyyy-MM-dd', 'en-US');

    this.productService.addProduct(product).pipe(
      catchError((error) => {
        console.log(error);
        this.snackBar.open('Error de creación o de servicio', 'Cerrar', { duration: 3000 });
        return of(null);
      })
    ).subscribe((result) => {
      if (result) {
        this.snackBar.open('Registro creado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/products']);
      }
    });
  }

  public update(product: Product) {
    product.date_release = formatDate(product.date_release, 'yyyy-MM-dd', 'en-US');
    product.date_revision = formatDate(product.date_revision, 'yyyy-MM-dd', 'en-US');

    this.productService.updateProduct(product, this.idUpdate).pipe(
      catchError((error) => {
        console.log(error);
        this.snackBar.open('Error de creación o de servicio', 'Cerrar', { duration: 3000 });
        return of(null);
      })
    ).subscribe((result) => {
      if (result) {
        this.snackBar.open('Registro atualizado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/products']);
      }
    });
  }

  public resetForm() {
    this.productForm.reset();
  }
}
