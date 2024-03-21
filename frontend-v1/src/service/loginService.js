import axios from 'axios'

const baseUrl =
  'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/usuario/login'
// const baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/usuario/login'
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)

  return data
}

export default { login }
