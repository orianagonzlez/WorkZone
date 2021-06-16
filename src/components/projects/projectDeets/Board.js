import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Container, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { getData } from "../../../helpers/getData";
import { CreateTaskModal } from "../../tasks/CreateTaskModal";
import { CreateColumnModal } from "../../tasks/CreateColumnModal";
import { EditColumnModal } from "../../tasks/EditColumnModal";
import { BsThreeDots } from "react-icons/bs";
import { TaskDeetsModal } from "../../tasks/TaskDeetsModal";
import { Members } from "../../common/Member";
import { postData } from "../../../helpers/postData";
import { CgDetailsMore } from "react-icons/cg";
import { storage } from "../../../firebase/index";

const onDragEnd = (result, columns, setColumns) => {
  console.log("ARRASTRE");
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

    // se actualiza la lista de origen
    const sourceBody = {
      id_lista: source.droppableId,
      items: sourceItems.map((i) => i._id),
    };

    console.log("SOURCE BODY", sourceBody);
    updateList(sourceBody);

    // se actualiza la lista destino
    const destBody = {
      id_lista: destination.droppableId,
      items: destItems.map((i) => i._id),
    };

    console.log("dest BODY", destBody);
    updateList(destBody);

    // se actualiza la tarea
    const newTask = {
      id_tarea: removed._id,
      id_lista: destination.droppableId,
    };

    console.log("tarei", newTask);
    updateTask(newTask);
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

    // solo hay que actualizar la lista para mantener el orden de los items
    const body = {
      id_lista: source.droppableId,
      items: copiedItems.map((i) => i._id),
    };

    console.log("BODY", body);
    updateList(body);
  }
};

const updateList = (body) => {
  postData(
    "https://workzone-backend-mdb.herokuapp.com/api/lists/update",
    body
  ).then((res) => {
    console.log("me respondio" + res);
    if (res.ok) {
      console.log("todo bien", res.data);
    } else {
      console.log("error");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Algo ha salido mal, intenta de nuevo",
      //   confirmButtonColor: "#22B4DE",
      // });
    }
  });
};

const updateTask = (body) => {
  postData(
    "https://workzone-backend-mdb.herokuapp.com/api/tasks/update",
    body
  ).then((res) => {
    console.log("me respondio" + res);
    if (res.ok) {
      console.log("todo bien", res.data);
    } else {
      console.log("error");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Algo ha salido mal, intenta de nuevo",
      //   confirmButtonColor: "#22B4DE",
      // });
    }
  });
};

export const Board = ({ project }) => {
  const [columns, setColumns] = useState({});
  const [lists, setLists] = useState([]);
  const [tasksNum, setTasksNum] = useState(0);

  /*console.log(columns);*/

  const [modalShow, setModalShow] = useState(false);

  const [columnModalShow, setColumnModalShow] = useState(false);

  const [editColumnModalShow, setEditColumnModalShow] = useState(false);

  const [taskModalShow, setTaskModalShow] = useState(false);

  const history = useHistory();

  useEffect(() => {
    refreshList();
  }, [modalShow, columnModalShow, editColumnModalShow]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("me ejecute");
  //     refreshList();
  //   }, 80000);
  //   return () => clearInterval(interval);
  // }, []);

  const refreshList = () => {
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
  };

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
        text: `Has alcanzado el máximo de tareas para el plan. Mejora tu plan para seguir trabajando! ${project.id_plan.nombre}.\nPara crear más tareas debes actualizar tu plan.`,
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
  };

  const handleEditColumn = () => {
    setEditColumnModalShow(true);
  };

  const[files, setFiles] = useState([]);
  const [view, setView] = useState(false);

  const getFiles = (item) => {

    const storageRef = storage.ref(`images/${project._id}/${item._id}`);
    storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
        displayImage(imageRef);
      });
    }).catch(function(error) {
      console.log(error)
    });

    function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) {

        let newList = files;
        newList.push(url);
        setFiles(newList);

        
      }).catch(function(error) {
        console.log(error)
      });
    }

    console.log('URLs', files)
    console.log('View', view);
  }

  const [taskToShow = {}, setTaskToShow] = useState();

  const handleOpenTaskDeets = (item) => {
    getFiles(item)
    setTaskToShow(item);
    console.log('Task', taskToShow);
    setTaskModalShow(true);
    console.log("yes");
    //console.log(taskModalShow);
    //console.log(item);
    //console.log(taskModalShow);
    console.log(taskToShow.nombre);

    //console.log(item.nombre);
  };

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

        <button className="btn-create" onClick={() => handleEditColumn()}>
          <BsThreeDots />
        </button>
        {lists.length > 0 && (
          <EditColumnModal
            project={project}
            show={editColumnModalShow}
            onHide={() => setEditColumnModalShow(false)}
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
                          <div className="column_header">
                            <h2>{column.nombre}</h2>
                          </div>
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
                                      <div className=" card-box  px-2">
                                        {item.nombre}
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div
                                            className="cursor"
                                            onClick={() =>
                                              handleOpenTaskDeets(item)
                                            }
                                          >
                                            <BsThreeDots></BsThreeDots>
                                          </div>
                                          {item.miembro != undefined
                                            ? project.miembros.map(
                                                (miembro) => {
                                                  if (
                                                    item.miembro === miembro._id
                                                  ) {
                                                    return (
                                                      <div>
                                                        <Members
                                                          member={miembro}
                                                          placement={"task"}
                                                        />
                                                      </div>
                                                    );
                                                  }
                                                  return null;
                                                }
                                              )
                                            : null}
                                        </div>
                                      </div>
                                      {item === taskToShow && (
                                        //console.log("yeesyeyeyeyes", index)
                                          <TaskDeetsModal
                                          project={project}
                                          task={item}
                                          show={taskModalShow}
                                          files = {files}
                                          onHide={() => {
                                            setTaskModalShow(false) 
                                            setFiles([])
                                          }}
                                          columns={columns}
                                          lists={lists}
                                          setcolumns={setColumns}
                                          animation={false}
                                          key={1}
                                          refreshList={refreshList}
                                        />
                                      )}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
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
