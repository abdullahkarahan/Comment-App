import React from 'react'
export const getComments = async () => {
  return [
    {
      id: '1',
      body: 'Yeni isinde basarilar dilerim  👏 ',
      username: 'Berk',
      userId: '1',
      parentId: null,
      createdTime: '2022-10-24T23:00:33.010+02:00',
    },
    {
      id: '2',
      body: 'Ekibimize hos geldin Ahmet  👨🏻‍💻 ',
      username: 'Mehmet',
      userId: '2',
      parentId: null,
      createdTime: '2022-10-25T23:00:33.010+02:00',
    },
    {
      id: '3',
      body: 'Tesekkur ederim Berk  👍 ',
      username: 'Ahmet',
      userId: '2',
      parentId: '1',
      createdTime: '2022-10-24T23:00:33.010+02:00',
    },
    {
      id: '4',
      body: 'Hos bulduk.Tesekkur ederim Mehmet 😀',
      username: 'Ahmet',
      userId: '2',
      parentId: '2',
      createdTime: '2022-10-25T23:00:33.010+02:00',
    },
  ]
}
