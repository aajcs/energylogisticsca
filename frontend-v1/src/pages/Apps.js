import { useHistory } from 'react-router-dom'

export default function Apps() {
  const history = useHistory()
  const onAppsControlClick = () => {
    history.push('/apps/control')
  }

  // const onAppsAdministracionClick = () => {
  //   validarAccesoApp('AMINISTRACIONAPPS') &&
  //     history.push('/apps/administracion')
  // }
  // const onAppsReporteGerenciaPagesClick = () => {
  //   validarAccesoApp('REPORTEGERENCIAAPPS') &&
  //     history.push('/apps/reportegerencia')
  // }
  // const onAppsProcuraClick = () => {
  //   history.push('/apps/procura')
  // }
  // const onAppsAITClick = () => {
  //   history.push('/apps/ait')
  // }
  // const onAppsPlanificacionMaritimaClick = () => {
  //   history.push('/apps/planificacionMaritima')
  // }
  // const onAppsAlmacenClick = () => {
  //   history.push('/apps/almacen')
  // }
  return (
    // <div className="layout-main-container">
    //   <div className="layout-main" style={{ height: '50vh' }}>
    // <div className="container d-flex justify-content-center align-items-center h-100">
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="grid col-8 ">
        <div
          className=" col-12 lg:col-6 xl:col-8  animate__animated animate__bounceInLeft animate__slower"
          onClick={onAppsControlClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">CONTROL</span>
                <div className="text-900 font-medium text-xl ">
                  Control de Carga de Solidos
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-chart-bar text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">----- </span>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  )
}
