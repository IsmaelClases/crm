import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementos a mostrar';
  nextPageLabel = 'Página siguiente';
  previousPageLabel = 'Página anterior';

  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  }

}
