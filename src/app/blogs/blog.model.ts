export class Blog {
  constructor(public title: string, public body: string, public image?: string, public comments: Comment[] = []) {}
}

export class Comment {
  constructor(public userId: string, public commentBody: string) {}
}