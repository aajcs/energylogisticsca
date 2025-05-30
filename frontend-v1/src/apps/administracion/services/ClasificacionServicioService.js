import axios from 'axios'

export class ClasificacionServicioService {
  // baseUrl = "http://localhost:8080/api/ClasificacionServicios/";
  // baseUrl = '  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ClasificacionServicios/";
  baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ClasificacionServicio/', config)
      .then((res) => res.data)
  }

  create(ClasificacionServicio, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(
        this.baseUrl + 'ClasificacionServicio/',
        ClasificacionServicio,
        config
      )
      .then((res) => res.data)
  }

  update(ClasificacionServicio, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'ClasificacionServicio/' + ClasificacionServicio.id,
        ClasificacionServicio,
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
      .delete(this.baseUrl + 'ClasificacionServicio/' + id, config)
      .then((res) => res.data)
  }
}
