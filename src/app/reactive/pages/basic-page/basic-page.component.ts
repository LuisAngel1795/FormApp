import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090={
  name: 'RTX 5090',
  price:2500,
  inStorage:4
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    //this.myForm.reset(rtx5090)
  }

  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Este campo es requerido';

          case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracters.`;
      }

    }
    return null;
  }
  /*public myForm: FormGroup = new FormGroup({
    name: new FormControl('',[],[]),
    price: new FormControl('',[],[]),
    inStorage: new FormControl('',[],[]),
  })*/

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0,[Validators.required, Validators.min(0)]]
  })

  onSave():void{
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({price:10, inStorage:0})
  }


}
