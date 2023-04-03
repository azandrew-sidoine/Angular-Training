import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription, distinctUntilChanged, filter, tap } from "rxjs";

@Directive({
  selector: "[inputModel]",
})
export class InputModelDirective
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() inputModel: unknown;
  @Output() inputModelChange = new EventEmitter();

  // État Local
  private state!: FormControl<unknown>;
  private subscriptions: Subscription[] = [];

  constructor(private el: ElementRef) {
    this.state = new FormControl();
    this.subscriptions.push(
      this.state.valueChanges
        .pipe(
          filter((state) => typeof state !== "undefined" && state !== null),
          distinctUntilChanged(),
          tap((value) => this.inputModelChange.emit(value))
        )
        .subscribe()
    );
  }

  ngAfterViewInit(): void {
    this.subscribeToInputEvent();
  }

  private subscribeToInputEvent() {
    const element = this.el.nativeElement as HTMLInputElement;
    if (element?.tagName?.toLocaleLowerCase() !== "input") {
      throw new Error("[inputModel] must only be used on HTML input element");
    }
    element.addEventListener("change", this.onInputChange.bind(this));
    element.addEventListener("input", this.onInputChange.bind(this));
  }

  onInputChange(event?: Event) {
    const value = (event?.target as HTMLInputElement).value.trim();
    // Case the value does not change we doe not fire any change event
    if (value !== this.state.value) {
      this.state.setValue(value);
      this.state.updateValueAndValidity();
    }
    // this.dispatchValueChange();
    event?.stopPropagation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("inputModel" in changes && this.inputModel !== this.state.value) {
      (this.el.nativeElement as HTMLInputElement).value = this
        .inputModel as string;
    }
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    for (const name of ["change", "input"]) {
      (this.el.nativeElement as HTMLElement).removeEventListener(
        name,
        this.onInputChange.bind(this)
      );
    }
  }
}
