import axios from 'axios'

export class ReporteCargaBuqueService {
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api//'
  // baseUrl = '  https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  baseUrl = 'https://energylogisticsca-3dd928fa7453.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/reporteCargaBuques/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'reporteCargaBuque/', config)
      .then((res) => res.data)
  }

  create(reporteCargaBuque, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'reporteCargaBuque/', reporteCargaBuque, config)
      .then((res) => res.data)
  }

  update(reporteCargaBuque, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'reporteCargaBuque/' + reporteCargaBuque.id,
        reporteCargaBuque,
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
      .delete(this.baseUrl + 'reporteCargaBuque/' + id, config)
      .then((res) => res.data)
  }
}
