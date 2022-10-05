import { Auth } from "aws-amplify"
import { BehaviorSubject } from "rxjs"

export class AuthService {
  loggedIn = false
  formState = new BehaviorSubject("signUp")

  async signUp(username: string, password: string, email: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      this.setLogin()
      console.log(user)
      this.formState.next('confirmSignUp')
      console.log(this.formState)
    } catch (err) {
      this.formState.next('SignUpError')
      console.log(err)
    }
  }

  async confirmSignUp(username: string, verificationCode: string) {
    try {
      await Auth.confirmSignUp(username, verificationCode)
      this.formState.next('accVerified')
    } catch (err) {
      console.log(err)
    }
  }

  setLogin() {
    this.loggedIn = !this.loggedIn
  }

  getLogin() {
    return this.loggedIn
  }
}