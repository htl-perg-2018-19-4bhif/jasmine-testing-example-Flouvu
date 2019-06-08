import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;

  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) {
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }

  addInvoice() {
    let category;
    if (this.vatCategoryString == "Drinks") {
      category = this.vatCategories.Drinks;
    } else {
      category = this.vatCategories.Food;
    }

    const invoiceLine: InvoiceLine = {
      priceInclusiveVat: this.priceInclusiveVat,
      product: this.product,
      vatCategory: this.vatCategories[this.vatCategoryString]
    };

    this.invoiceLines.push(invoiceLine);
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }
}
