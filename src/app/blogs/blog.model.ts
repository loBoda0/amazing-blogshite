import { v4 } from 'uuid'

export class Blog {
  public id: string = v4()
  constructor(public userId: string, public title: string, public body: string, public image: string = null, public comments: Comment[] = []) {}
}

export class Comment {
  public id: string = v4()
  constructor(public userId: string, public username: string, public commentBody: string, public replies: Comment[] = [], public voting: {} = {} ) {}
}

