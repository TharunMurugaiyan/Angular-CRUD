import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './empdash.model';

@Component({
  selector: 'app-empdash',
  templateUrl: './empdash.component.html',
  styleUrls: ['./empdash.component.css']
})
export class EmpdashComponent implements OnInit {

  formvalue !: FormGroup;
  employeemodelobj : EmployeeModel =new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeemodelobj.firstname=this.formvalue.value.firstname;
    this.employeemodelobj.lastname=this.formvalue.value.lastname;
    this.employeemodelobj.email=this.formvalue.value.email;
    this.employeemodelobj.mobile=this.formvalue.value.mobile;
    this.employeemodelobj.salary=this.formvalue.value.salary;

    this.api.postEmployee(this.employeemodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("something went wrong")
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeemodelobj.id=row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname);
    this.formvalue.controls['lastname'].setValue(row.lastname);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails(){
    this.employeemodelobj.firstname=this.formvalue.value.firstname;
    this.employeemodelobj.lastname=this.formvalue.value.lastname;
    this.employeemodelobj.email=this.formvalue.value.email;
    this.employeemodelobj.mobile=this.formvalue.value.mobile;
    this.employeemodelobj.salary=this.formvalue.value.salary;

    this.api.updateEmployee(this.employeemodelobj,this.employeemodelobj.id)
    .subscribe(res=>{
      alert("Update Success");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    })
  }


}
