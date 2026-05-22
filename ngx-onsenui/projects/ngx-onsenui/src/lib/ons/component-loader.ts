import {
  Injector,
  Injectable,
  ApplicationRef,
  ComponentRef
} from '@angular/core';

@Injectable()
export class ComponentLoader {
  constructor(private appRef: ApplicationRef) {
  }

  // Load an instance of ComponentRef in app view.
  load(componentRef: ComponentRef<any>) {
    const rootElement = componentRef.location.nativeElement;

    if (this.appRef.attachView) {
      this.appRef.attachView(componentRef.hostView);

      componentRef.onDestroy(() => {
        this.appRef.detachView(componentRef.hostView);

        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement);
        }
      });
    } else {
      if ((this.appRef as any).registerChangeDetector) {
        (this.appRef as any).registerChangeDetector(componentRef.changeDetectorRef);
      }

      componentRef.onDestroy(() => {
        if ((this.appRef as any).unregisterChangeDetector) {
          (this.appRef as any).unregisterChangeDetector(componentRef.changeDetectorRef);
        }

        if (rootElement.parentNode) {
          rootElement.parentNode.removeChild(rootElement);
        }
      });
    }

    const rootContainer = (this.appRef as any).components[0].location.nativeElement;
    rootContainer.appendChild(rootElement);
  }
}


