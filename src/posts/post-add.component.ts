import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription, filter } from "rxjs";

// type StateType = {
//   value: string;
//   disabled: boolean;
// };

/**
 * @internal
 * **Note** setSate() function parameter type
 */
export type SetStateParam<T> = Partial<T> | ((state: T) => T);

@Component({
  selector: "app-post-add",
  templateUrl: "./post-add.component.html",
  styleUrls: ["./post-add.component.css"],
  // Angular : Recompile ce composant, à la prochaine rendu que si
  // les inputs de composant change, ou un observable émet
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostAddComponent implements OnDestroy {
  // #region component outputs
  @Output() valueChange = new EventEmitter();
  // #region component outputs

  // #region component input
  @Input() placeholder: string = "Ecrire une nouvelle publication...";
  // #endregion component output

  // #region Component state
  formgroup = this.builder.group({
    title: this.builder.control(
      "",
      Validators.compose([
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(2),
      ])
    ),
    content: this.builder.control(
      { value: "", disabled: true },
      {
        validators: Validators.required,
      }
    ),
    // Un group de controls peut contenir un autre group de conrol
    other: this.builder.group({}),
  });
  // {updateOn: 'blur'}
  // );
  private subscriptions: Subscription[] = [];
  // #endregion Component state

  @HostListener("keypress", ["$event"])
  onKeyPress(e: KeyboardEvent) {
    // On s'assure que le input est pas vide
    // if (this.state.invalid) {
    //   // Si le champ state est invalid, marquer le champ comme touché
    //   // pour permettre a la vue d'afficher les messages d'erreur à l'utilisateur
    //   this.state.markAsTouched();
    //   this.state.markAsDirty();
    //   this.state.updateValueAndValidity();
    //   return;
    // }
    // const value = (this.state.value ?? "").trim();
    // if (e.code?.toLocaleLowerCase() === "enter" && value !== "") {
    //   this.dispatchValueChange();
    //   // Réinitialize le control une fois le formulaire soumis
    //   this.state.reset();
    // }
  }

  /**
   * Creates component instances
   *
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private builder: FormBuilder
  ) {
    // this.formgroup = this.builder.group({
    //   title: this.builder.control(
    //     "",
    //     Validators.compose([
    //       Validators.required,
    //       Validators.maxLength(45),
    //       Validators.minLength(2),
    //     ])
    //   ),
    //   content: this.builder.control(
    //     { value: "", disabled: true },
    //     {
    //       validators: Validators.required,
    //     }
    //   ),
    //   // Un group de controls peut contenir un autre group de conrol
    //   other: this.builder.group({}),
    // });
    this.subscriptions.push(
      this.formgroup.valueChanges
        .pipe(filter((state) => typeof state !== "undefined" && state !== null))
        // Le `getRawValue()` a la différence du `.value` vous retourne la valeur de tous
        // les champs mm les champs désactivés
        .subscribe(() => console.info(this.formgroup.getRawValue()))
    );
    // this.subscriptions.push(
    //   this.control.valueChanges
    //     .pipe(
    //       tap((state) => {
    //         console.log("Control value changes: ", state);
    //         console.log("State", this.control.status);
    //       })
    //     )
    //     .subscribe()
    // );

    // setTimeout(() => {
    //   this.control.disable();
    // }, 2000);

    // setTimeout(() => {
    //   this.control.enable();
    // }, 4000);
  }

  // onInputChange(event?: Event) {
  //   const value = (event?.target as HTMLInputElement).value.trim();
  //   // Case the value does not change we doe not fire any change event
  //   if (value === this._state.value) {
  //     return;
  //   }
  //   this.setState((state) => ({ ...state, value }));
  //   // this.dispatchValueChange();
  //   event?.stopPropagation();
  // }

  // onSearchClick(event?: Event) {
  //   event?.preventDefault();
  //   event?.stopImmediatePropagation();
  //   event?.stopPropagation();
  // }

  // setState(state: SetStateParam<StateType>) {
  //   if (typeof state === "function") {
  //     this._state = state(this._state);
  //   }
  //   this._state = { ...this._state, ...state };
  //   this.changeRef.markForCheck();
  // }

  private dispatchValueChange() {
    this.valueChange.emit(this.formgroup.get("title")?.value);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }
}
