import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { FaPaperPlane, FaComments, FaCircle } from 'react-icons/fa';
import { Button } from "react-bootstrap";

export default function Chat({project}) { // supongo que en vez de project podría recibir chat o algo así pero bueno
    project = {nombre: 'Project name'}
    return (
        <div className="chat-container">
            <div className="main-chat">
                <div className="chat-name">
                    <h1>{project.nombre}</h1>
                </div>

                <div className="message-container">
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div>
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div> 
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div> 
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div> 
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div> 
                    <div className="text-bubble text-user">texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext</div>

                    <div className="message">
                        <span className="sender-name">John Doe</span>
                        <div className="text-bubble text-other">aaaaaaaaaaaaaaa</div>
                    </div> 
                </div>

                <div className="new-message-container">
                    <input type="text"></input>
                    <button type="button">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
            
            <div className="chat-selection">
                <h1>Salas de proyectos</h1>
                <div className="chat-individual">
                    <Button>
                        <FaCircle className='chat-icon-left' size='25px' />
                        <h2>Proyecto 2 Admin BD</h2>
                        <FaComments className='chat-icon-right' size='25px' />
                    </Button>
                </div>
                <div className="chat-individual">
                    <Button>
                        <FaCircle className='chat-icon-left' size='25px' />
                        <h2>El nombre de un proyecto ahi</h2>
                        <FaComments className='chat-icon-right' size='25px' />
                    </Button>
                </div>
                <div className="chat-individual">
                    <Button>
                        <FaCircle className='chat-icon-left' size='25px' />
                        <h2>Proyecto prueba 2</h2>
                        <FaComments className='chat-icon-right' size='25px' />
                    </Button>
                </div>
                <div className="chat-individual">
                    <Button>
                        <FaCircle className='chat-icon-left' size='25px' />
                        <h2>agonia</h2>
                        <FaComments className='chat-icon-right' size='25px' />
                    </Button>
                </div>
            </div>
        </div>
    )
}