import { useEffect, useState, useRef } from 'react' //react hooks
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'
function Home() {
  // useState = estado do react : utilizado para poder gravar o que chega da api na variavel
  const [users, setUsers] = useState([])

  //useRef serve para referenciar o que esta sendo utilizado nos input
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
   await api.delete(`/usuarios/${id}`)
   getUsers()
  }

  //utilizado para chamar a função no carregamento da tela
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='idade' type='text' ref={inputAge} />
        <input placeholder="Email" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)} >
            <img src={Trash} />
          </button>

        </div>

      ))}


    </div>
  )
}

export default Home
