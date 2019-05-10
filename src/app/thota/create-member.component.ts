import { Component, OnInit } from '@angular/core';
// Import FormGroup and FormControl classes
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css']
})
export class CreateMemberComponent implements OnInit {
  // This FormGroup contains fullName and Email form controls
  memberForm: FormGroup;

  constructor() {}

  // Initialise the FormGroup with the 2 FormControls we need.
  // ngOnInit ensures the FormGroup and it's form controls are
  // created when the component is initialised
  ngOnInit() {
    this.memberForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl()
    });
  }
}
