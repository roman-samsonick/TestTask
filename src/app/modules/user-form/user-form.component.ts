import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass'],
})
export class UserFormComponent implements OnInit, AfterViewInit {
  private readonly reader = new FileReader();

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  readonly usernameControl = new FormControl('', [Validators.required]);
  readonly roleControl = new FormControl('user');
  readonly firstNameControl = new FormControl('', [Validators.required]);
  readonly lastNameControl = new FormControl('', [Validators.required]);
  readonly educationControl = new FormArray([
    this.createEducationItemControl(),
  ]);
  readonly ageControl = new FormControl('', [Validators.required]);
  readonly idControl = new FormControl(Math.floor(Math.random() * 10000).toString());
  readonly imageControl = new FormControl('');

  readonly userFormGroup = new FormGroup({
    id: this.idControl,
    image: this.imageControl,
    username: this.usernameControl,
    role: this.roleControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    education: this.educationControl,
    age: this.ageControl,
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get id(): string {
    return this.route.snapshot.params.id;
  }

  get create(): boolean {
    return !this.id;
  }

  get edit(): boolean {
    return !this.create;
  }

  get title(): string {
    return this.create
      ? 'createUserTitle'
      : 'editUserTitle';
  }

  get now(): Date {
    return new Date();
  }

  ngAfterViewInit(): void {
    this.imageInput.nativeElement.addEventListener('change', () => {
      this.reader.readAsDataURL(this.imageInput.nativeElement.files![0]);
    });
  }

  ngOnInit(): void {
    this.reader.addEventListener('loadend', () => this.imageControl.setValue(
      this.reader.result,
    ));

    if (!this.create) {
      this.userService.findById(this.id)
        .subscribe(user => {
          this.userFormGroup.setValue(user!);
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getEducationControlByName(index: number, name: string): FormControl {
    return this.getEducationGroup(index).controls[name] as FormControl;
  }

  addEducationItem(): void {
    this.educationControl.push(
      this.createEducationItemControl(),
    );
  }

  removeEducationItem(index: number): void {
    this.educationControl.removeAt(index);
  }

  saveUser(): void {
    if (this.edit) {
      this.userService.updateUser(this.id, this.userFormGroup.value)
        .subscribe(() => {
        });
    }

    if (this.create) {
      this.userService.createUser(this.userFormGroup.value).subscribe(() => {
      });
    }
  }

  openFileDialog(): void {
    this.imageInput.nativeElement.click();
  }

  private getEducationGroup(index: number): FormGroup {
    return this.educationControl.controls[index] as FormGroup;
  }

  private createEducationItemControl(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      from: new FormControl(new Date(), [Validators.required]),
      to: new FormControl(new Date(), [Validators.required]),
      speciality: new FormControl('', [Validators.required]),
    });
  }
}
