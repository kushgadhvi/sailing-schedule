import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

/**
 * A reference to the dialog itself.
 * Can be injected into the component added to the overlay and then used to close itself.
 */
export class DialogRef {
  constructor(private overlayRef: OverlayRef) {}

  public close(result?: any) {
    this.overlayRef.dispose();
  }
}
