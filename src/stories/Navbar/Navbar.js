import React, { useState} from "react";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";


export default function Navbar2( { usuario } ) {
  const [visible, setVisible] = React.useState(false);

  const user = usuario;
  //const { chat } = useContext(ChatContext);

  //const history = useHistory();

  return (
    <>
      <div className="navbarContainer d-flex justify-content-end" style={{ 
            maxHeight: 50,
            height: 50,
            width: '100%',
            padding: '0.5rem',
            paddingRight: '2rem',
            backgroundColor: '#6487a5',
            color: '#F2F2F2',
            fontWeight: 'bold'}}>

        <Button style={{
            padding: '0 0.25rem',
            borderRadius: '0.25rem',
            marginLeft: 800,
            border: 0,
            color: '#F2F2F2',
            backgroundColor: 'transparent',
            outline: 'none',
            textAlign: 'center',
            '&:hover': {
                background: 'transparent',
                color: '#3c3c3c',
            },
        }}>
          <FaUserCircle size={24} />
          <span style={{
                        paddingLeft: '0.5rem',
                        marginTop: '1.5rem',
                        fontWeight: 'bold'
                        
                        }}>
                            {user}</span>
        </Button>
      </div>
    </>
  );
}