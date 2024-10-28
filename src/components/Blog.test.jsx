import { expect, test } from 'vitest'
import Blog from './Blog'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

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

test('rendering blog forms created', async () => {
    const blog = {
        title: "The Inevitable Death",
        url: "http://www.death.com",
        likes: 5000000004,
        author: "Death"
    }

    const newBlogService = vi.fn()
    const user = userEvent.setup()
    const setErrorMessage = vi.fn()

    const {container} = render(<BlogForm newBlog={newBlogService} setErrorMessage={setErrorMessage} />)

    const blogTitle = screen.getByPlaceholderText('Blog Title')
    const blogAuthor = screen.getByPlaceholderText('Blog Author')
    const blogURL = screen.getByPlaceholderText('Blog URL')
    const blogLikes = screen.getByPlaceholderText('Blog Likes')
    
    await user.type(blogTitle, blog.title)
    await user.type(blogAuthor, blog.author)
    await user.type(blogURL, blog.url)
    await user.type(blogLikes, blog.likes.toString())

    const submitButton = container.querySelector('.newBlogSubmit')
    await user.click(submitButton)    
    
    expect(newBlogService.mock.calls).toHaveLength(1)
    expect(newBlogService.mock.calls[0][0].title).toBe(blog.title)
    expect(newBlogService.mock.calls[0][0].author).toBe(blog.author)
    expect(newBlogService.mock.calls[0][0].url).toBe(blog.url)
    expect(newBlogService.mock.calls[0][0].likes).toBe(blog.likes.toString())

})