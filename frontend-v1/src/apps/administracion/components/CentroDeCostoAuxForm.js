/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { CentroDeCostoAuxContext } from '../contexts/CentroDeCostoAuxContext'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { addLocale } from 'primereact/api'
import moment from 'moment'

const CentroDeCostoAuxForm = (props) => {
  const initialCentroDeCostoAuxForm = {
    id: null,

    codigoCentroDeCosto: '',
    nombreCentroDeCosto: '',
    descripcionCentroDeCosto: '',
    estatusCentroDeCosto: '',
    CentroDeCostoCreado: moment(),
    CentroDeCostoModificado: moment()
  }

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic'
    ],
    today: 'Hoy',
    clear: 'Limpiar'
  })
  const {
    createCentroDeCostoAux,
    editCentroDeCostoAux,
    updateCentroDeCostoAux
  } = useContext(CentroDeCostoAuxContext)

  const { isVisible, setIsVisible } = props
  const [selectedCentroDeCosto, setSelectedCentroDeCosto] = useState(null)
  const [CentroDeCostoAuxData, setCentroDeCostoAuxData] = useState(
    initialCentroDeCostoAuxForm
  )
  const estadoCentroDeCosto = [
    { estatusCentroDeCosto: 'OPERATIVO' },
    { estatusCentroDeCosto: 'INOPERATIVO' }
  ]
  const onEstatusCentroDeCosto = (e) => {
    setSelectedCentroDeCosto(e.value)
    updateField(e.value.estatusCentroDeCosto, 'estatusCentroDeCosto')
  }

  const toast = useRef(null)

  useEffect(() => {
    if (editCentroDeCostoAux) {
      setCentroDeCostoAuxData(editCentroDeCostoAux)
      setSelectedCentroDeCosto({
        estatusCentroDeCosto: editCentroDeCostoAux.estatusCentroDeCosto
      })
    }
  }, [editCentroDeCostoAux])

  const updateField = (data, field) => {
    setCentroDeCostoAuxData({
      ...CentroDeCostoAuxData,
      [field]: data
    })
  }

  const saveCentroDeCostoAux = () => {
    if (!editCentroDeCostoAux) {
      createCentroDeCostoAux(CentroDeCostoAuxData)
    } else {
      updateCentroDeCostoAux({
        ...CentroDeCostoAuxData,
        CentroDeCostoAuxModificado: moment()
      })
    }
    setCentroDeCostoAuxData(initialCentroDeCostoAuxForm)
    setIsVisible(false)
    setSelectedCentroDeCosto('')
  }

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => clearSelected()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={saveCentroDeCostoAux}
      />
    </div>
  )

  const clearSelected = () => {
    setIsVisible(false)
    setCentroDeCostoAuxData(initialCentroDeCostoAuxForm)
    setSelectedCentroDeCosto('')
  }
  const selectedestatusCentroDeCostoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.estatusCentroDeCosto}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const estatusCentroDeCostoOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.estatusCentroDeCosto}</div>
      </div>
    )
  }

  return (
    <div className="dialog-demo">
      <Toast ref={toast} />
      <Dialog
        visible={isVisible}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '30vw' }}
        header="Detalles de la CentroDeCosto"
        footer={dialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={CentroDeCostoAuxData.codigoCentroDeCosto}
              onChange={(e) =>
                updateField(e.target.value, 'codigoCentroDeCosto')
              }
            />
            <label>codigoCentroDeCosto:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={CentroDeCostoAuxData.nombreCentroDeCosto}
              onChange={(e) =>
                updateField(e.target.value, 'nombreCentroDeCosto')
              }
            />
            <label>Nombre del CentroDeCosto:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputText
              value={CentroDeCostoAuxData.descripcionCentroDeCosto}
              onChange={(e) =>
                updateField(e.target.value, 'descripcionCentroDeCosto')
              }
            />
            <label>Descripcion:</label>
          </div>

          <div className="formgrid grid">
            <div className="field col-12 md:col-6">
              <label>Estado</label>
              <Dropdown
                value={selectedCentroDeCosto}
                options={estadoCentroDeCosto}
                onChange={onEstatusCentroDeCosto}
                optionLabel="estatusCentroDeCosto"
                placeholder="Seleccione Estado"
                valueTemplate={selectedestatusCentroDeCostoTemplate}
                itemTemplate={estatusCentroDeCostoOptionTemplate}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* </div> */}
    </div>
  )
}

export default CentroDeCostoAuxForm
