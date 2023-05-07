import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleType } from 'src/Models/User';
import { UserService } from 'src/Services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl(RoleType.User, [Validators.required])
  });
  roles = [
    { value: RoleType.User, viewValue: 'User' },
    { value: RoleType.Admin, viewValue: 'Admin' }
  ];

  constructor(
    private userService: UserService,private router: Router
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl(RoleType.User, [Validators.required])
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      user.IsActive = true;

      this.userService.CreateUser(user).subscribe(() => {
        location.reload()
      }, error => {
      });
    }
  }

}
