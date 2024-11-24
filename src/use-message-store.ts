import { ref } from 'vue'

const me = ref({
  name: '李华',
  avatar: '/me.jpeg',
})
const you = ref({
  name: '漫漫🐟',
  avatar: '/you.jpeg',
})
type Comment = {
  id: string
  author: typeof me
  content: string
  createdAt: number
}
type Message = {
  id: string
  author: typeof you
  content: string
  createdAt: number
  comments: Comment[]
}
const messages = ref<Message[]>([
  {
    id: '2',
    author: you.value,
    content: '16快乐 小鑫子 快快长大',
    createdAt: new Date('2016-01-01 00:47:06').getTime(),
    comments: [
      {
        id: '2-1',
        author: me.value,
        content: '谢谢！新年快乐！',
        createdAt: new Date('2016-01-01 00:48:33').getTime(),
      },
    ],
  },
  {
    id: '3',
    author: you.value,
    content: '圣诞快乐',
    createdAt: new Date('2015-12-25 09:27:42').getTime(),
    comments: [
      {
        id: '3-1',
        author: me.value,
        content: '快乐，么么哒',
        createdAt: new Date('2015-12-25 09:29:05').getTime(),
      },
    ],
  },
  {
    id: '4',
    author: you.value,
    content: '简简单单 希望你一直这样 那么单纯',
    createdAt: new Date('2015-10-26 12:38:17').getTime(),
    comments: [],
  },
  {
    id: '5',
    author: you.value,
    content: '平安夜快乐',
    createdAt: new Date('2015-12-24 19:52:34').getTime(),
    comments: [],
  },
  {
    id: '6',
    author: you.value,
    content:
      '曾经有一件棘手的事情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。如果上天能够给我一个再来一次的机会，我会对那个你说出三个字："还钱啦"。如果非要在这笔账上加上一个期限，我希望是……一天内还清！',
    createdAt: new Date('2015-10-15 20:14:32').getTime(),
    comments: [
      {
        id: '6-1',
        author: me.value,
        content: '😓',
        createdAt: new Date('2015-10-15 20:19:57').getTime(),
      },
    ],
  },
  {
    id: '7',
    author: you.value,
    content: '哈哈 中秋快乐😬😬😬',
    createdAt: new Date('2015-09-27 08:08:42').getTime(),
    comments: [
      {
        id: '7-1',
        author: me.value,
        content: '你也是😬😬😬',
        createdAt: new Date('2015-09-27 08:09:03').getTime(),
      },
    ],
  },
  {
    id: '8',
    author: you.value,
    content: '小鑫子 好好学习吧',
    createdAt: new Date('2014-09-08 20:12:17').getTime(),
    comments: [],
  },
  {
    id: '9',
    author: you.value,
    content: '这里还有我去年给你发的 中秋快乐呢',
    createdAt: new Date('2014-09-08 20:11:36').getTime(),
    comments: [],
  },
  {
    id: '10',
    author: you.value,
    content: '月饼节快乐哈',
    createdAt: new Date('2014-09-08 20:09:55').getTime(),
    comments: [],
  },
  {
    id: '11',
    author: you.value,
    content: '中秋快乐',
    createdAt: new Date('2013-09-19 12:22:59').getTime(),
    comments: [
      {
        id: '11-1',
        author: me.value,
        content: '快乐',
        createdAt: new Date('2013-09-19 12:26:39').getTime(),
      },
    ],
  },
  {
    id: '12',
    author: you.value,
    content: '帮你踩踩.还有,踩扁你',
    createdAt: new Date('2013-07-18 16:01:41').getTime(),
    comments: [],
  },
  {
    id: '13',
    author: you.value,
    content: '踩踩,我够意思吧',
    createdAt: new Date('2013-03-22 10:04:59').getTime(),
    comments: [
      {
        id: '13-1',
        author: me.value,
        content: '够',
        createdAt: new Date('2013-03-22 10:06:41').getTime(),
      },
      {
        id: '13-2',
        author: you.value,
        content: '嘿嘿',
        createdAt: new Date('2013-03-22 10:09:14').getTime(),
      },
      {
        id: '13-3',
        author: me.value,
        content: '哈哈哈啊',
        createdAt: new Date('2013-03-22 10:10:14').getTime(),
      },
      {
        id: '13-4',
        author: you.value,
        content: '傻样',
        createdAt: new Date('2013-03-22 11:43:37').getTime(),
      },
    ],
  },
  {
    id: '14',
    author: you.value,
    content: '好好活着吧',
    createdAt: new Date('2013-02-06 14:11:10').getTime(),
    comments: [],
  },
])

export const useMessageStore = () => {
  return {
    messages,
  }
}
