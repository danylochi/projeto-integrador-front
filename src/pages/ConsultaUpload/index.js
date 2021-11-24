import { useState } from 'react';
import './style.css';
import api from '../../services/api';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';



function ConsultaUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);



  async function  fileUpload(){
    setLoading(true);
    const formData = new FormData();
    formData.append('content',file)

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    var response = await api.post('uploadfile/', formData,config).then(function (response) {
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });

    return response; 
  }

  return ( 
    <div style={{margin: '30px'}}> 
        <Card border="info">  
          <Card.Header style={{ background: '#47CFE7', color:'#ffffff', height:'2.5rem'}}><h5>Upload de Planilha</h5></Card.Header>   
          <Card.Body>
            <Form>
              <Form.Group as={Row} className="mb-3">
                  <Form.Label for= "iptTurma" column sm="2"><b>Selecione: </b></Form.Label>
                  <Col sm="7">
                    <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])} disabled={loading}/>
                  </Col>
                </Form.Group>              
                <div>             
                  <Button variant="primary" onClick={() => fileUpload()} disabled={loading}>
                    {loading ? 'CARREGANDO...' : 'UPLOAD'}
                  </Button>
                </div>
              </Form>
            </Card.Body>            
        </Card>    
    </div>
  );
}

export default ConsultaUpload;