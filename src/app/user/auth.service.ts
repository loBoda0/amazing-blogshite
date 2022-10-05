import { Auth } from "aws-amplify"
import { BehaviorSubject } from "rxjs"
import { CognitoUser } from '@aws-amplify/auth'

export class AuthService {
  userRegistered = new BehaviorSubject(false)
  formState = new BehaviorSubject("signUp")
  user: CognitoUser

  async signUp(username: string, password: string, email: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      this.user = user
      this.userRegistered.next(true)
      this.formState.next('confirmSignUp')
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
  
  async logIn(username: string, password: string) {
    try {
      this.user = await Auth.signIn(username, password)
      this.formState.next('confirmSignUp')
      this.formState.next('signUp')
      this.userRegistered.next(true)
    } catch (err) {
      console.log(err)
    }
  }

  async signOut() {
    try {
        await Auth.signOut();
        this.userRegistered.next(false)
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}