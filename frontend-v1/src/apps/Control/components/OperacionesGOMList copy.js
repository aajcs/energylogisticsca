/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ReporteCargaGOMContext } from '../contexts/ReporteCargaGOMContext'
import { BarcoContext } from '../contexts/BarcoContext'
import ReporteCargaGOMForm from './ReporteCargaGOMForm'
import { InputText } from 'primereact/inputtext'
import { TabView, TabPanel } from 'primereact/tabview'
import moment from 'moment'
import { OperacionesGOMBodega } from './OperacionesGOMBodega'
import OperacionesGOMBarco from './OperacionesGOMBarco'
import OperacionesGOMVentana from './OperacionesGOMVentana'
import AuthUse from '../../../auth/AuthUse'
import { BarcoService } from '../services/BarcoService'

const OperacionesGOMList = () => {
  const barcoService = new BarcoService()

  const auth = AuthUse()
  const token = auth.user.token
  const {
    reporteCargaGOMs,
    findReporteCargaGOM,
    deleteReporteCargaGOM,
    loading
  } = useContext(ReporteCargaGOMContext)
  const { barcos } = useContext(BarcoContext)
  const [reporteCargaGOM, setReporteCargaGOM] = useState(reporteCargaGOMs)
  const [barcostodos, setBarcostodos] = useState(barcos)
  const [deleteReporteCargaGOMDialog, setDeleteReporteCargaGOMDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState([])
  const [expandedRows2, setExpandedRows2] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveReporteCargaGOM = (id) => {
    findReporteCargaGOM(id)
    setIsVisible(true)
  }
  const onRowGroupExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.barcoID.nombreBarco,
      life: 3000
    })
  }

  const onRowGroupCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Grupo de filas contraído',
      detail: 'Bueque: ' + event.data.barcoID.nombreBarco,
      life: 3000
    })
  }
  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span className="image-text">{data.barcoID.nombreBarco}</span>
        {'  '}
        <span
          className={`text-gray-900 ml-3 status-${data.barcoID.estatusBarco}`}
        >
          {data.barcoID.estatusBarco}
        </span>
      </React.Fragment>
    )
  }

  useEffect(() => {
    barcoService.readAll(token).then((data) => {
      setBarcostodos(data)
    })
  }, [reporteCargaGOMs])
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return <React.Fragment></React.Fragment>
  }

  const eliminarReporteCargaGOM = () => {
    deleteReporteCargaGOM(reporteCargaGOM.id)
    setDeleteReporteCargaGOMDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga GOM Eliminado',
      life: 3000
    })
  }
  const deleteReporteCargaGOMDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteReporteCargaGOMDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarReporteCargaGOM()}
      />
    </>
  )
  const confirmDeleteReporteCargaGOM = (reporteCargaGOMs) => {
    setReporteCargaGOM(reporteCargaGOMs)
    setDeleteReporteCargaGOMDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveReporteCargaGOM(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteReporteCargaGOM(rowData)}
        />
      </div>
    )
  }
  const clearSelected = () => {
    setDeleteReporteCargaGOMDialog(false)
  }

  const reporteCargaGOMCreadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.reporteCargaGOMCreado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.reporteCargaGOMCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const reporteCargaGOMModificadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.reporteCargaGOMModificado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.reporteCargaGOMModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const onRowExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBarco,
      life: 3000
    })
  }

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }
  const expandAll = () => {
    let _expandedRows = {}
    barcos.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows2(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows2(null)
  }
  const header2 = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Reporte GOM del buque {data.nombreBarco}</h5>
        <DataTable
          value={data.reporteCargaGOM}
          responsiveLayout="scroll"
          sortField="data.reporteCargaGOMCreado"
          sortOrder={1}
        >
          <Column body={actionBodyTemplate}></Column>
          <Column field="ubicacionBuque" header="ubicacionBuque" />
          <Column field="puestoTerminal" header="puestoTerminal" />

          <Column
            field="toneladasCargadasGOM"
            header="toneladas Cargadas GOM"
          />
          <Column field="tasaDeCargaGOM" header="tasaDeCargaGOM" />
          <Column field="etc" header="etc" />
          <Column field="comentariosGOM" header="comentarios GOM" />
          <Column field="observacionesGOM" header="observaciones GOM" />
          <Column
            field="reporteCargaGOMCreado"
            header="reporte CargaGOM Creado"
            body={reporteCargaGOMCreadoTemplate}
            dataType="date"
            sortable
          />
          <Column
            field="reporteCargaGOMModificado"
            body={reporteCargaGOMModificadoTemplate}
            header="reporte CargaGOM Modificado"
            dataType="date"
          />
        </DataTable>
      </div>
    )
  }
  const estatusTemplate = (rowData) => {
    return (
      <span className={`text-gray-900 ml-3 status-${rowData.estatusBarco}`}>
        {rowData.estatusBarco}
      </span>
    )
  }

  return (
    <>
      <h5>Operaciones de Gerencia Marítima</h5>
      <TabView className="tabview-custom">
        <TabPanel header="Reporte GOM" leftIcon="pi pi-calendar">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            value={barcostodos}
            expandedRows={expandedRows2}
            onRowToggle={(e) => setExpandedRows2(e.data)}
            onRowExpand={onRowExpand}
            onRowCollapse={onRowCollapse}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header2}
            globalFilter={globalFilter}
            sortField="estatusBarco"
            sortOrder={-1}
          >
            <Column expander style={{ width: '3em' }} />
            <Column field="nombreBarco" header="nombre Barco" sortable />
            <Column field="buqueCliente" header="buqueCliente" sortable />
            <Column
              body={estatusTemplate}
              field="estatusBarco"
              header="estatusBarco"
              sortable
            />
            <Column
              field="toneladasCapacidad"
              header="toneladas Nominadas"
              sortable
            />
            <Column
              field="toneladasNominadas"
              header="toneladas Solicitadas"
              sortable
            />
          </DataTable>
          {/* <DataTable
            ref={dt}
            value={reporteCargaGOMs}
            rowGroupMode="subheader"
            groupRowsBy="barcoID.nombreBarco"
            sortMode="single"
            sortField="barcoID.nombreBarco"
            sortOrder={1}
            responsiveLayout="scroll"
            expandableRowGroups
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowGroupExpand}
            onRowCollapse={onRowGroupCollapse}
            rowGroupHeaderTemplate={headerTemplate}
            onSelectionChange={(e) => setSelectedProducts(e.value_id)}
            dataKey="id"
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            selectionMode="single"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ReporteCargaGOMs"
            globalFilter={globalFilter}
            emptyMessage="No hay reporteCargaGOMs."
            header={header}
            loading={loading}
            breakpoint="960px"
          >
            <Column field="ubicacionBuque" header="Terminar de Carga" />

            <Column
              field="toneladasCargadasGOM"
              header="Toneladas Cargadas GOM"
            />
            <Column field="etc" header="ETC" />
            <Column field="comentariosGOM" header="Comentarios GOM" />
            <Column field="observacionesGOM" header="Observaciones GOM" />
            <Column
              field="reporteCargaGOMModificado"
              body={reporteCargaGOMModificadoTemplate}
              header="Reporte Carga GOM Modificado"
              dataType="date"
            />
          </DataTable> */}
        </TabPanel>
        <TabPanel header="Carga de Bodegas" leftIcon="pi pi-user">
          <OperacionesGOMBodega />
        </TabPanel>
        <TabPanel header="Carga de Barcos" leftIcon="pi pi-user">
          <OperacionesGOMBarco />
        </TabPanel>
        {(auth.user.faidUser.roles[0] === 'ADMIN' ||
          auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
          <TabPanel header="Programación de Ventana" leftIcon="pi pi-user">
            <OperacionesGOMVentana />
          </TabPanel>
        )}
      </TabView>

      <Toast ref={toast} />

      <ReporteCargaGOMForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <Dialog
        visible={deleteReporteCargaGOMDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteReporteCargaGOMDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {reporteCargaGOM && (
            <span>
              Esta seguro que quiere eliminar la reporteCargaGOM Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default OperacionesGOMList
