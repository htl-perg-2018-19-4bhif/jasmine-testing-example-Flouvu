import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return (priceInclusiveVat * 100) / (100 + vatPercentage);
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    let invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0
    };

    for(let x = 0; x < invoiceLines.length; x++){
      let vat = this.vatCategoriesService.getVat(invoiceLines[x].vatCategory);
      let priceExclusiveVat = this.CalculatePriceExclusiveVat(invoiceLines[x].priceInclusiveVat, vat);
      
      let lineComplete: InvoiceLineComplete = {
        product: invoiceLines[x].product,
        vatCategory: invoiceLines[x].vatCategory,
        priceInclusiveVat: invoiceLines[x].priceInclusiveVat,
        priceExclusiveVat
      };
        
      invoice.invoiceLines.push(lineComplete);
      invoice.totalPriceInclusiveVat += lineComplete.priceInclusiveVat;
      invoice.totalPriceExclusiveVat += lineComplete.priceExclusiveVat;
      invoice.totalVat += vat;
    }
    return invoice;
  }
}
