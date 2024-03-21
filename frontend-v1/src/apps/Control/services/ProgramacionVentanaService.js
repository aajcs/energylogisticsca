import axios from 'axios'

export class ProgramacionVentanaService {
  // baseUrl = "http://localhost:8080/api/programacionVentanas/";
  // baseUrl = '  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/programacionVentanas/";
  baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'programacionVentana/', config)
      .then((res) => res.data)
  }

  create(programacionVentana, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'programacionVentana/', programacionVentana, config)
      .then((res) => res.data)
  }

  update(programacionVentana, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'programacionVentana/' + programacionVentana.id,
        programacionVentana,
        config
      )
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'programacionVentana/' + id, config)
      .then((res) => res.data)
  }
}
