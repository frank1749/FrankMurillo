import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  totalRecords: number = 0;
  
  products: Product[] = [];
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision', 'options'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Product>()
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe((response ) => {
      console.log('res data', response.data);
      this.products = response.data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalRecords = response.data.length;
    });
  }

  public onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.getProducts();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openConfirmDialog(item: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: { 'name': item.name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed deletion');
        this.delete(item.id);
      }
    });
  }

  public delete(id: number | string): void {
    this.productService.deleteProduct(id).pipe(
      catchError((error) => {
        console.log(error);          
        this.snackBar.open('Error de eliminación o de servicio', 'Cerrar', { duration: 3000 });
        return of(null);
      })
    ).subscribe((result) => {
      if (result) {
        this.snackBar.open('Registro eliminado', 'Cerrar', { duration: 3000 });
        this.getProducts();
      }
    });
        
  }
}
