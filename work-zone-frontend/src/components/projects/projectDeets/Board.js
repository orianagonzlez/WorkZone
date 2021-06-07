import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { getData } from "../../../helpers/getData";
import { CreateTaskModal } from "../../tasks/CreateTaskModal";
import { CreateColumnModal } from "../../tasks/CreateColumnModal";
import { TaskDeetsModal } from "../../tasks/TaskDeetsModal";


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const Board = ({ project }) => {
  const [columns, setColumns] = useState({});
  const [lists, setLists] = useState([]);
  const [tasksNum, setTasksNum] = useState(0);

  /*console.log(columns);*/

  const [modalShow, setModalShow] = useState(false);

  const [columnModalShow, setColumnModalShow] = useState(false);

  const [taskModalShow, setTaskModalShow] = useState(false);

  const history = useHistory();

  useEffect(() => {
    //Buscando las listas del proyecto con sus respectivas tareas
    getData(
      `https://workzone-backend-mdb.herokuapp.com/api/lists/from/${project._id}`
    ).then((r) => {
      console.log("me respondio" + r);
      if (r.ok) {
        console.log(r.data);
        setLists(r.data);
        // setColumns(r.data);
        const c = {};
        r.data.forEach((col) => {
          c[col._id] = col;
        });

        console.log(c);
        setColumns(c);
      } else {
        console.log("error");
      }
    });
  }, [modalShow, columnModalShow]);

  useEffect(() => {
    let n = 0;
    lists.forEach((item) => {
      n += item.items.length;
    });
    setTasksNum(n);
  }, [lists]);



  const handleCreateTask = () => {
    if (project.id_plan.max_tareas === 0) {
      setModalShow(true);
    }
    //Si ya no tiene mas tareas disponibles, se redirige a la pagina para actualizar el plan
    else if (tasksNum === project.id_plan.max_tareas) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Has alcanzado el máximo de tareas para el plan ${project.id_plan.nombre}.\nPara crear más tareas debes actualizar tu plan.`,
        confirmButtonColor: "#22B4DE",
      });

      //PONER AQUI LA RUTA A EDITAR PROYECTOOOOOOOOO
      // history.push(`projects/update/${project._id}`)
    } else if (project.id_plan.max_tareas - tasksNum <= 10) {
      Swal.fire({
        icon: "warning",
        title: "Actualiza tu plan",
        text: `Tienes ${
          project.id_plan.max_tareas - tasksNum
        } tarea(s) restante(s) para alcanzar el máximo de tareas para el plan ${
          project.id_plan.nombre
        }. Te recomendamos actualizar tu plan en la configuración del proyecto.`,
        confirmButtonColor: "#22B4DE",
      });
      setModalShow(true);
    } else {
      setModalShow(true);
    }
  };

  const handleCreateColumn = () => {
    setColumnModalShow(true);
  }

  

  const [taskToShow = {}, setTaskToShow] = useState();

  

  const handleOpenTaskDeets = (item) => {
    setTaskToShow(item);
    console.log(taskToShow);
    setTaskModalShow(true);
    console.log("yes");
    //console.log(taskModalShow);
    //console.log(item);
    //console.log(taskModalShow);
    console.log(taskToShow.nombre);
    
    //console.log(item.nombre);

  }




  return (
    <Container className="componentContainer pt-4">
      <h1>Tasks</h1>

      <Row className="create_buttons_row"> 

      <button className="btn-create" onClick={() => handleCreateTask()}>
          + Crear Tarea
        </button>
        {lists.length > 0 && (
          <CreateTaskModal
            project={project}
            show={modalShow}
            onHide={() => setModalShow(false)}
            columns={columns}
            lists={lists}
            setcolumns={setColumns}
          />
        )}

        <button className="btn-create" onClick={() => handleCreateColumn()}>
          + Crear Lista
        </button>
        {lists.length > 0 && (
          <CreateColumnModal
            project={project}
            show={columnModalShow}
            onHide={() => setColumnModalShow(false)}
            columns={columns}
            lists={lists}
            setcolumns={setColumns}
          />
        )}

      </Row>

      <div className="task_container">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="column_container" key={columnId}>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className="column"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "linear-gradient(158.55deg, #6487A5 -48.1%, rgba(34, 180, 222, 0.2) 162.82%)"
                              : "linear-gradient(158.55deg, #6487A5 -48.1%, rgba(59, 86, 110, 0.5) 162.82%)",
                          }}
                        >
                          <h2>{column.nombre}</h2>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="card"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <button
                                        onClick={() => handleOpenTaskDeets(item)}>
                                        {item.nombre}
                                      </button>
                                      { item === taskToShow ? 
                                        //console.log("yeesyeyeyeyes", index)
                                        <TaskDeetsModal
                                          project={project}
                                          task={item}
                                          show={taskModalShow}
                                          onHide={() => setTaskModalShow(false)}
                                          columns={columns}
                                          lists={lists}
                                          setcolumns={setColumns}
                                        />
                                        : console.log("sos", index)
                                    }
                                      
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {console.log(taskToShow)}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
                          
    </Container>
  );
};


/*
<TaskDeetsModal
                                          task={item}
                                          show={taskModalShow}
                                          onHide={() => setTaskModalShow(false)}
                                          columns={columns}
                                          lists={lists}
                                          setcolumns={setColumns}
                                        />
*/