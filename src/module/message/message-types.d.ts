export type Message = {
  id: string | number
  content: string
  createdAt: number
  author: {
    name: string
    avatar: string
  }
  comments: Comment[]
}

export type Comment = {
  id: string | number
  content: string
  createdAt: number
  author: {
    name: string
    avatar: string
  }
}
