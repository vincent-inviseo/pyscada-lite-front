/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Breakpoints } from 'src/app/enums/breakpoints.enum';
import { opacityAnimation } from 'src/app/design/animations/opacity';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/requests/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { InputBoolean } from 'src/app/design/decorators/input-boolean';
import { PageService } from 'src/app/requests/page.service';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [opacityAnimation],
  providers: [DialogService],
})
export class NavigationComponent implements OnInit {

  @Input() @InputBoolean() public isOpened = true;
  @Output() public menuclosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly pageService: PageService
  )
  {}

  public pagesList: any[] = [];

  public ngOnInit(): void {
    this.pageService.getPages().subscribe((pages) => {
      for (let i = 0; i < pages.length; i++) {
        this.pagesList.push(pages[i]);
      }
    })
    console.log(this.pagesList);
    
  }

  public logout(): void {
    this.authService.logout();
  }

  public closeMenu(): void
  {
    if(window.innerWidth <= Breakpoints['tablet-portrait'])
    {
      this.isOpened = false;
      this.menuclosed.emit(this.isOpened);
    }
    return;

  }

}
