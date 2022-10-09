import { Auth } from "aws-amplify"
import { BehaviorSubject } from "rxjs"
import { CognitoUser } from '@aws-amplify/auth'

export class AuthService {
  userRegistered = new BehaviorSubject(false)
  formState = new BehaviorSubject("signUp")
  userId = new BehaviorSubject("")

  async signUp(username: string, password: string, email: string) {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      this.formState.next('confirmSignUp')
    } catch (err) {
      this.formState.next('SignUpError')
      console.log(err)
    }
  }
  
  async confirmSignUp(username: string, verificationCode: string, password: string) {
    try {
      await Auth.confirmSignUp(username, verificationCode)
      this.logIn(username, password)
    } catch (err) {
      console.log(err)
    }
  }
  
  async logIn(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password)
      const { attributes } = await Auth.currentAuthenticatedUser()
      this.formState.next('registered')
      this.userRegistered.next(true)
      this.userId.next(attributes.sub)
      console.log(this.userId)
    } catch (err) {
      console.log(err)
    }
  }
  
  async signOut() {
    try {
      await Auth.signOut();
      this.formState.next('signUp')
      this.userId.next('')
      this.userRegistered.next(false)
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}