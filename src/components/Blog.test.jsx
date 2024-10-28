import { expect, test } from 'vitest'
import Blog from './Blog'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

test('render url and likes when show button is clicked', async () => {
    const blog = {
        title: "The Inevitable Death",
        url: "http://www.death.com",
        likes: 5000000004,
        author: "Death"
    }

    const user = userEvent.setup()

    const {container} = render(<Blog blog={blog} />)

    const showButton = container.querySelector('.toggleView')
    const titleElement = container.querySelector('.blogTitle')
    const authorElement = container.querySelector('.blogAuthor')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(showButton).toBeDefined()

    await user.click(showButton)

    const urlElement = container.querySelector('.blogUrl')
    const likesElement = container.querySelector('.blogLikes')   

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
})

test('like button handler being called when clicked on', async () => {
    const blog = {
        title: "The Inevitable Death",
        url: "http://www.death.com",
        likes: 5000000004,
        author: "Death"
    }

    const likehandler = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<Blog blog={blog} handleLikeClick={likehandler} />)
    
    const showButton = container.querySelector('.toggleView')
    await user.click(showButton)

    const likeButton = container.querySelector('.blogLikeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likehandler.mock.calls).toHaveLength(2)
})