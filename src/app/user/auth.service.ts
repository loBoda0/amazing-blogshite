export class AuthService {
  loggedIn = false

  setLogin() {
    this.loggedIn = !this.loggedIn
  }

  getLogin() {
    return this.loggedIn
  }
}