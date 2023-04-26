import { create } from "../request"
import { useMutation, useQueryClient } from "react-query"
import { useNoticationDispatch } from "../Context"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const dispatch = useNoticationDispatch()
	const setMessage = (content,type) => {
		dispatch({ type , data: content })
		setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
	}

	const newAnecdoteMutation = useMutation(create,{
		onError:(error) => {
			setMessage(error.response.data.error, 'ERROR')
		},
		onSuccess: (newAnecdote) => {
			setMessage(newAnecdote.content, 'ADD')
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
		}
	})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
		newAnecdoteMutation.mutate({content, votes: 0})
		
	}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
