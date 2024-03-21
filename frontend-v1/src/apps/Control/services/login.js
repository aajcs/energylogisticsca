import axios from 'axios'

const baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
// const baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
// const baseUrl = '  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/usuario/login'

// baseUrl = "  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/";
// baseUrl = "http://10.20.40.159:4000/api/";
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
