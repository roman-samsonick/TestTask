import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[online]' })
export class UserOnlineDirective implements AfterViewInit, OnDestroy {
  @Input() online!: IUser;

  private user!: IUser;

  private destroy = new Subject<void>();
  private onlineElement!: HTMLElement;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly userService: UserService,
  ) {
  }

  private get userOnline(): boolean {
    const milliseconds = new Date().getTime() - new Date(this.user.onlineTime).getTime();

    return milliseconds / 1000 < 3;
  }

  ngAfterViewInit(): void {
    this.user = this.online;
    const element = this.elementRef.nativeElement;

    element.style.position = 'relative';

    const onlineElement = document.createElement('div');
    this.onlineElement = onlineElement;

    onlineElement.style.position = 'absolute';
    onlineElement.style.top = '0';
    onlineElement.style.left = '0';
    onlineElement.style.width = '60px';
    onlineElement.style.height = '23px';
    onlineElement.style.borderRadius = '5px';
    onlineElement.style.display = 'flex';
    onlineElement.style.flexDirection = 'row';
    onlineElement.style.justifyContent = 'center';
    onlineElement.style.alignItems = 'center';
    this.applyOnlineStyles();

    element.appendChild(onlineElement);

    interval(1000)
      .pipe(takeUntil(this.destroy))
      .subscribe(this.fetchUser);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private applyOnlineStyles(): void {
    this.onlineElement.style.backgroundColor = this.userOnline ? 'green' : 'red';
    this.onlineElement.textContent = this.userOnline ? 'online' : 'offline';
  }

  private fetchUser = () => {
    this.userService.findById(this.online.id).subscribe(user => {
      this.user = user!;
      this.applyOnlineStyles();
    });
  };
}
