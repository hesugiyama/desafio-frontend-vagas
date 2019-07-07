import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  MinLengthValidator,
  Validators
} from "@angular/forms";
import { Sticker, Type } from "./form";
import { anchorDef } from "@angular/core/src/view";

@Component({
  selector: "app-form",
  templateUrl: "form.component.html",
  styleUrls: ["form.component.scss"]
})
export class FormComponent {
  formSticker: FormGroup;
  quantStickers: number;
  types: Type[];
  typeIsValide: boolean;
  submitted: boolean;
  success: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.quantStickers = 0;
    this.typeIsValide = false;
    this.submitted = false;
    this.success = false;
    this.types = [
      {
        name: "React",
        selected: false,
        id: 1
      },
      {
        name: "Vue",
        selected: false,
        id: 2
      },
      {
        name: "Angular",
        selected: false,
        id: 3
      }
    ];
  }

  createForm() {
    this.formSticker = this.formBuilder.group({
      quant: [null, Validators.required],
      obs: [null]
    });
  }

  addType(selectedTypeId: number) {
    this.types.forEach(type => {
      if (selectedTypeId === type.id) {
        type.selected = !type.selected;
        this.validateType();
      }
    });
  }

  addSticker() {
    this.quantStickers = this.formSticker.controls.quant.value;
    this.quantStickers++;
    this.formSticker.controls.quant.setValue(this.quantStickers);
  }

  subSticker() {
    this.quantStickers = this.formSticker.controls.quant.value;
    if (this.quantStickers !== 0) {
      this.quantStickers = this.formSticker.controls.quant.value - 1;
    }
  }

  send() {
    this.submitted = true;
    this.validateQuant();
    this.validateType();
    if (this.formSticker.invalid || !this.typeIsValide) {
      this.success = false;
    } else {
      this.success = true;
      this.cleanForm();
    }
  }

  validateQuant() {
    if (this.formSticker.controls.quant.value === 0) {
      this.formSticker.controls.quant.setValue(null);
    }
  }

  validateType() {
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].selected === true) {
        this.typeIsValide = true;
        break;
      } else {
        this.typeIsValide = false;
      }
    }
  }

  cleanForm() {
    this.types.forEach(type => {
      type.selected = false;
    });
    this.quantStickers = 0;
    this.typeIsValide = false;
    this.submitted = false;
    this.createForm();
  }
}
