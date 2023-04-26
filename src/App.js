import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, update } from './request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNoticationDispatch } from './Context'

const App = () => {
	const queryClient = useQueryClient()
	const dispatch = useNoticationDispatch()
	const setMessage = (content,type) => {
		dispatch({ type , data: content })
		setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
	}

	const voteMutation = useMutation(update,{
		onSuccess: (anecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			const updated = anecdotes.map(a => a.id === anecdote.id ? anecdote : a)
			queryClient.setQueryData('anecdotes', updated)
		}
	})

  const handleVote = (anecdote) => {
		setMessage(anecdote.content, 'VOTE')
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }
	const result = useQuery('anecdotes', getAll)

	if (result.isLoading){
		return <>Loading data</> }
	if (result.isError) {
		return <>Error getting data</>}

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
