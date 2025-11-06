import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoadingService } from './loading';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should NOT show loading immediately when show() is called', (done) => {
    service.show();
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should show loading after delay when show() is called', fakeAsync(() => {
    service.show();
    
    let isLoading = false;
    service.isLoading$.subscribe(value => isLoading = value);
    expect(isLoading).toBe(false);
    
    tick(300);
    expect(isLoading).toBe(true);
  }));

  it('should NOT show loading if request completes before delay', fakeAsync(() => {
    service.show();
    
    tick(100);
    service.hide();
    
    let isLoading = false;
    service.isLoading$.subscribe(value => isLoading = value);
    expect(isLoading).toBe(false);
    
    tick(300);
    expect(isLoading).toBe(false);
  }));

  it('should hide loading when hide() is called after delay', fakeAsync(() => {
    service.show();
    tick(300);
    
    let isLoading = true;
    service.isLoading$.subscribe(value => isLoading = value);
    expect(isLoading).toBe(true);
    
    service.hide();
    expect(isLoading).toBe(false);
  }));

  it('should handle multiple concurrent requests', fakeAsync(() => {
    service.show();
    service.show();
    service.show();
    
    tick(300);
    
    let isLoading = false;
    service.isLoading$.subscribe(value => isLoading = value);
    expect(isLoading).toBe(true);
    
    service.hide();
    expect(isLoading).toBe(true);
    
    service.hide();
    expect(isLoading).toBe(true);
    
    service.hide();
    expect(isLoading).toBe(false);
  }));

  it('should cancel timeout if all requests complete before delay', fakeAsync(() => {
    service.show();
    service.show();
    
    tick(100);
    
    service.hide();
    service.hide();
    
    let isLoading = false;
    service.isLoading$.subscribe(value => isLoading = value);
    expect(isLoading).toBe(false);
    
    tick(300);
    expect(isLoading).toBe(false);
  }));
});
