import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service';

class AuthStub {
  loginWithGoogle() {}
}

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [{ provide: AuthService, useClass: AuthStub }]
    }).compileComponents();
  });

  it('calls AuthService.loginWithGoogle on click', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const comp = fixture.componentInstance;
    const auth = TestBed.inject(AuthService);
    spyOn(auth, 'loginWithGoogle');

    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();

    expect(auth.loginWithGoogle).toHaveBeenCalled();
    expect(comp.isRedirecting).toBeTrue();
  });
});
