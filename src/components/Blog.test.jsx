import { expect } from 'vitest'
import Blog from './Blog'
import {render, screen} from '@testing-library/react'

test('render title and author by default alone', () => {
    const blog = {
        title: "The Inevitable Death",
        url: "http://www.death.com",
        likes: 5000000004,
        author: "Death"
    }

    const {container} = render(<Blog blog={blog} />)

    const titleElement = container.querySelector('.blogTitle')
    const authorElement = container.querySelector('.blogAuthor')
    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()

    const urlElement = container.querySelector('.blogUrl')
    const likesElement = container.querySelector('.blogLikes')
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
})