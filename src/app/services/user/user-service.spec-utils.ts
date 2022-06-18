import {UserService} from 'src/app/services/user/user.service';
import {HttpTestingController} from '@angular/common/http/testing';
import {IRestUser} from 'src/app/services/rest/rest.interfaces';


export class UserServiceUtils {
  public static readonly FAKE_USER_DATA: IRestUser = {
    id: 1,
    token: 'token',
    email: 'test@test.test',
    name: 'test',
    invitationLink: 'invitation-link'
  };

  constructor(
    private userService: UserService,
    private httpTestingController: HttpTestingController
  ) {
  }

  checkUserLogin = (logged = true) => {
    const userData = this.userService.getUser();
    if (logged) {
      expect(userData).toEqual(jasmine.objectContaining(UserServiceUtils.FAKE_USER_DATA));
      return;
    }
    expect(userData).not.toEqual(jasmine.objectContaining(UserServiceUtils.FAKE_USER_DATA));
  }

  flushLoginRequest = () => {
    const loginRequest = this.httpTestingController.expectOne('authenticate');
    expect(loginRequest.request.method).toEqual('POST');

    loginRequest.flush(UserServiceUtils.FAKE_USER_DATA);
  };
}
