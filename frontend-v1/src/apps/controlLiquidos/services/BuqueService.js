import axios from 'axios'

export class BuqueService {
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api//'
  // baseUrl = '  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/buques/";
  baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'buque/', config).then((res) => res.data)
  }

  create(buque, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'buque/', buque, config)
      .then((res) => res.data)
  }

  update(buque, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'buque/' + buque.id, buque, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'buque/' + id, config)
      .then((res) => res.data)
  }
}
