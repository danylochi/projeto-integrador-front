import { useState } from 'react';
import './style.css';
import api from '../../services/api';
import { Form, Row, Col, Card, Button, FormText } from 'react-bootstrap';
import { toast } from 'react-toastify';



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

        toast(`Planilha importada com sucesso.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success'
          });

        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);

        toast(`Erro ao importar a planilha.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'error'
          });

        setLoading(false);
      });

    return response; 
  }

  function downloadLeiaute() {
    api.post(
      'downloadfile/?ano=0&materia=&turma=&serie=0&bimestre=0&recuperacao=SIM&vazia=1', 
      null,
      {
          headers:
          {
              'Content-Disposition': 'attachment; filename=leiaute_caed.xlsx',
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          responseType: 'arraybuffer',
      }
  ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leiaute_caed.xlsx');
      document.body.appendChild(link);
      link.click();
  })
      .catch((error) => console.log(error));

  }

  return ( 
    <div style={{margin: '30px'}}> 
        <Card border="info">  
          <Card.Header style={{ background: '#47CFE7', color:'#ffffff', height:'2.5rem'}}><h5>1º Passo: Download de Leiaute </h5></Card.Header>   
            <Card.Body>
                <Card.Text>Para realizar o upload, é necessário fazer primeiro o download do modelo de planilha de uso obrigatório.</Card.Text>      
                <div>             
                  
                  <Button onClick={()=> downloadLeiaute()}>LEIAUTE</Button>
                </div>
            </Card.Body>            
        </Card>    

        <Card border="info" style={{marginTop: '30px'}}>  
          <Card.Header style={{ background: '#47CFE7', color:'#ffffff', height:'2.5rem'}}><h5>2º Passo: Upload de Planilha</h5></Card.Header>   
          <Card.Body>
            <Form>
              <Form.Group as={Row} className="mb-3">
                  <Form.Label for= "iptTurma" column sm="2"><b>Selecione: </b></Form.Label>
                  
                  <Col sm="7">
                    <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])} disabled={loading}/>
                    <FormText>Realizar o upload do arquivo conforme o modelo, em formato .xlsx</FormText>
                  </Col>

                  
                </Form.Group>              
                <div>             
                  <Button variant="primary" onClick={() => fileUpload()} disabled={loading} style={{marginRight: '30px'}}>
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