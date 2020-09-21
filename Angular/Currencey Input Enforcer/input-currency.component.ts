import { Component, ChangeDetectorRef } from "@angular/core";

/**
 * Enforces currency formatting for bound input fields
 */
@Component({
  selector: "input-currency",
  template: `
    <input
      type="text"
      placeholder="$0.00"
      [ngModel]="cost | currency"
      [ngModelOptions]="{ updateOn: 'blur' }"
      (ngModelChange)="setCost($event)"
    />
    <pre>{{ cost | json }}</pre>
  `,
})
export class InputCurrencyComponent {
  cost: number;

  constructor(private _cdref: ChangeDetectorRef) {}

  setCost(value: string) {
    // force view update for input control
    this.cost = null;
    this._cdref.detectChanges();

    if (value) {
      let i = 0;
      const val = +value
        .replace(/[^0-9/.]/g, "")
        .replace(/[/.]/g, (c) => (i++ ? "" : c));
      this.cost = +val.toFixed(2);
    }
  }
}
