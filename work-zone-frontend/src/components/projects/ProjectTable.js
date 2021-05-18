import React from 'react'

export const ProjectTable = () => {
  return (
    <div>
      {/* Los style estan en _preview.scss */}
        <div className="Preview__container"> 
            <ul className="Preview__responsive-table">
              <li className="Preview__table-header">
                <div className="column column-1 ">Id</div>
                <div className="column column-3 ">Plataforma</div>
                <div className="column column-3 ">Prioridad</div>
                <div className="column column-4">Adjuntos</div>
                <div className="column column-3">Creado</div>
                <div className="column column-0 ">Detalles</div>
              </li>
              <li className="Preview__table-row">
                <div className="column column-1" data-label="Id">DE-000002</div>
                <div className="column column-3" data-label="Plataforma">Sirius</div>
                <div className="column column-3 priority" data-label="Prioridad">
                  {/* ARREGLAR CLASE PRIORITY CUANDO SE INTEGRE FIREBASE */}
                  <i className="fas fa-circle mr-2"></i>Normal
                </div>
                <div className="column column-4" data-label="Adjuntos">
                  <div className="attachments">JPG</div>
                </div>
                <div className="column column-3 riority" data-label="Creado">6 Horas</div>
                <div className="column column-0" data-label="Detalles">
                  <i className="fas fa-arrow-circle-right details"></i>
                </div>
              </li>
            </ul>
          </div>
    </div>
  )
}
