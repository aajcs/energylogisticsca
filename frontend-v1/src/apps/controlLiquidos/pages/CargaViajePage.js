import CargaViajeList from '../components/CargaViajeList'
import CargaViajeContextProvider from '../contexts/CargaViajeContext'
import ViajeAuxContextProvider from '../contexts/ViajeAuxContext'
import ViajeContextProvider from '../contexts/ViajeContext'

export const CargaViajePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ViajeContextProvider>
            <ViajeAuxContextProvider>
              <CargaViajeContextProvider>
                <CargaViajeList />
              </CargaViajeContextProvider>
            </ViajeAuxContextProvider>
          </ViajeContextProvider>
        </div>
      </div>
    </div>
  )
}
