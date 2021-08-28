import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employeemodal } from './employeemodal'
import { ApiService } from '../shared/api.service'
import { error } from '@angular/compiler/src/util';





@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  Empform !: FormGroup;

  empmodalObj: Employeemodal = new Employeemodal();
  empData: any;
  isAddVisible !: boolean;
  isUpdateVisible!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.Empform = this.formbuilder.group({
      firstname: [''],
      lastName: [''],
      email: [''],
      phonenumber: ['']
    });
    this.getEmployee();


  }
  clickAddbutton() {
    console.log("HELLO");
    this.Empform.reset();
    this.isAddVisible = true;
    this.isUpdateVisible = false;
  }

  getEmployee() {
    this.api.getEmployee().subscribe(data => {
      this.empData = data;
      console.log(this.empData);
    })
  }
  addEmp() {
    this.empmodalObj.FirstName = this.Empform.value.firstname;
    this.empmodalObj.LastName = this.Empform.value.lastName;
    this.empmodalObj.Email = this.Empform.value.email;
    this.empmodalObj.PhoneNumber = this.Empform.value.phonenumber;

    this.api.postEmp(this.empmodalObj)
      .subscribe(data => {
        console.log('Added')
        this.Empform.reset();
        let cancel = document.getElementById('cancel')
        cancel?.click();
        this.getEmployee();
      },
        err => {
          console.warn('failed');
        });
  }

  deleteEmp(empData: any) {
    this.api.deleteEmp(empData).subscribe(data => {
      console.log("Emp deted");
      this.getEmployee();
    },
      error => {
        console.warn("Could not delete")
      })
  }

  onEdit(empData: any) {
    this.isAddVisible = false;
    this.isUpdateVisible = true;
    this.empmodalObj.id = empData.id;
    this.Empform.controls['firstname'].setValue(empData.FirstName);
    this.Empform.controls['lastName'].setValue(empData.LastName);
    this.Empform.controls['email'].setValue(empData.Email);
    this.Empform.controls['phonenumber'].setValue(empData.PhoneNumber);


  }

  UpdateEmp() {
    this.empmodalObj.FirstName = this.Empform.value.firstname;
    this.empmodalObj.LastName = this.Empform.value.lastName;
    this.empmodalObj.Email = this.Empform.value.email;
    this.empmodalObj.PhoneNumber = this.Empform.value.phonenumber;
    return this.api.editEmp(this.empmodalObj, this.empmodalObj.id).subscribe(data => {
      let cancel = document.getElementById('cancel')
      cancel?.click();
      this.getEmployee();
    })
  }

}
