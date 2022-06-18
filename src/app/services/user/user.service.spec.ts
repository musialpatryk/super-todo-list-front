import {UserService} from 'src/app/services/user/user.service';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {LoginComponent} from 'src/app/views/login/login.component';
import {UserServiceUtils} from 'src/app/services/user/user-service.spec-utils';


describe('UserService', () => {
  let userService: UserService,
    httpClient: HttpClient,
    httpTestingController: HttpTestingController,
    userServiceUtils: UserServiceUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: LoginComponent
          }
        ]),
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    userServiceUtils = new UserServiceUtils(userService, httpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should not return user before logging in ', () => {
    userService.logout();
    userServiceUtils.checkUserLogin(false);
  });

  it('should contain current user after logging in', (done) => {
    userService.login('test', 'test2')
      .subscribe((response) => {
        expect(response).toEqual(jasmine.objectContaining(UserServiceUtils.FAKE_USER_DATA));

        userServiceUtils.checkUserLogin();
        done();
      });
    userServiceUtils.flushLoginRequest();
  });

  it('should remove current user when logout is called', (done) => {
    userService.login('test', 'test2')
      .subscribe((response) => {
        expect(response).toEqual(jasmine.objectContaining(UserServiceUtils.FAKE_USER_DATA));
        userServiceUtils.checkUserLogin();

        userService.logout();
        userServiceUtils.checkUserLogin(false);

        done();
      });
    userServiceUtils.flushLoginRequest();
  });
});
