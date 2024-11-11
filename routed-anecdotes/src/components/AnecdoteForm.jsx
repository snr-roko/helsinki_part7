import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

export const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
      props.setNotification(`New Anecdote Added: ${content}`)
      setTimeout(() => {
        props.setNotification("")
      }, 5000)
    }

    const handleReset = () => {
      content.reset()
      author.reset()
      info.reset()
    }

    const spreadContent = {type: content.type, value: content.value, onChange: content.onChange}
    const spreadAuthor = {type: author.type, value: author.value, onChange: author.onChange}
    const spreadInfo = {type: info.type, value: info.value, onChange: info.onChange}
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...spreadContent} />
          </div>
          <div>
            author
            <input {...spreadAuthor} />
          </div>
          <div>
            url for more info
            <input {...spreadInfo} />
          </div>
          <button type="submit">create</button>{" "}
          <button type="button" onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }
  