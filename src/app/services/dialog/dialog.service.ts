import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-tokens';

export interface DialogConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * Service to create Overlay Component.
   */
  public open<T>(
    component: ComponentType<T>,
    config?: DialogConfig
  ): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
