import React, { useState } from 'react';
import { Form, Row, Col, Button, Card, Table } from 'react-bootstrap';
import './style.css';
import api from '../../services/api';
import QuestionarioAlunoModal from '../../components/QuestionarioAlunoModal';

const { forwardRef, useRef, useImperativeHandle } = React;

function ConsultaQuestionario() {
  const [dataCaed, setDataCaed] = useState([]);
  const [ano, setAno] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");
  const [serie, setSerie] = useState(0);
  const [semestre, setSemestre] = useState(0);

  const childRef = useRef();

  async function loadDataCaed() {
    const response = await api.get(`questionarioturma/?ano=${ano}&materia=${materia}&turma=${turma}&serie=${serie}&semestre=${semestre}`);
    setDataCaed(response.data);
    console.log(dataCaed);
  }

  const handleOnShow = async (event, alunoQuestionario) => {
  event.preventDefault();
    await childRef.current.handleShow(alunoQuestionario);
  }
  
  return (
    <div style={{margin: '30px'  }}>
      <QuestionarioAlunoModal ref={childRef} loadDataCaed={loadDataCaed}></QuestionarioAlunoModal>
      <Card border="info">  
        <Card.Header style={{ background: '#267987', color:'#ffffff', height:'2.5rem'}}><h5>Consulta de Questionário</h5></Card.Header>
        <Card.Body>
          <Form>      
            <Form.Group as={Row} className="mb-3">
              <Form.Label for= "iptAno" column sm="2"><b>Ano: </b></Form.Label>
              <Col sm="7">
                <Form.Control placeholder='Ano de aplicação da prova' name="iptAno" id="iptAno" type="number" value={ano} onChange={(e) => setAno(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label for= "iptTurma" column sm="2"><b>Turma: </b></Form.Label>
              <Col sm="7">
                <Form.Control placeholder='Informe a letra referente a turma' name="iptTurma" id="iptTurma" type="text" value={turma} onChange={(e) => setTurma(e.target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label for= "slcMateria" column sm="2"><b>Matéria: </b></Form.Label>
              <Col sm="7">
                <Form.Select name="slcMateria" id="slcMateria" defaultValue={materia} onChange={(e) => setMateria(e.currentTarget.value)}>
                  <option value="" disabled>
                    Escolha uma matéria ...
                  </option>
                  <option value="BIOLOGIA">BIOLOGIA</option>
                  <option value="CIÊNCIAS">CIÊNCIAS</option>
                  <option value="FÍSICA" >FÍSICA</option>
                  <option value="GEOGRAFIA">GEOGRAFIA</option>
                  <option value="HISTÓRIA" >HISTÓRIA</option>
                  <option value="LÍNGUA PORTUGUESA">LÍNGUA PORTUGUESA</option>
                  <option value="MATEMÁTICA">MATEMÁTICA</option>
                  <option value="QUÍMICA" >QUÍMICA</option>
                </Form.Select>
              </Col>            
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label for= "slcSemestre" column sm="2"><b>Semestre: </b></Form.Label>
              <Col sm="7">
                <Form.Select name="slcSemestre"id="slcSemestre" defaultValue={semestre} onChange={(e) => setSemestre(e.currentTarget.value)}>
                  <option value="0" disabled>
                    Escolha um semestre ...
                  </option>
                  <option value="1">1º SEMESTRE</option>
                  <option value="2">2º SEMESTRE</option>
                </Form.Select>
              </Col>            
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label for= "slcSerie" column sm="2"><b>Série: </b></Form.Label>
              <Col sm="7">
                <Form.Select name="slcSerie" id="slcSerie" defaultValue={serie} onChange={(e) => setSerie(e.currentTarget.value)}>
                  <option value="0" disabled>
                    Escolha uma série ...
                  </option>
                  <option value="1">1ª Série EM</option>
                  <option value="2">2ª Série EM</option>
                  <option value="3" >3ª Série EM</option>
                </Form.Select>
              </Col>            
            </Form.Group>        
            <div>
              <Button variant="primary" onClick={() => loadDataCaed()}>BUSCAR</Button>
            </div>
          
          </Form>
        </Card.Body>  
      </Card>

      <Table striped bordered hover responsive="xl" style={{marginTop: '30px'}}>
        <thead>
          <tr>
            <th>ESTUDANTE</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataCaed.map((d) => (
            <tr key={d.idquestionario_turma}>
              <td>{d.estudante}</td>
              <td>{d.STATUS_calc}</td>              
              <td><a href='#' onClick={event => handleOnShow(event, d)}>Questionário</a></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
} 

export default ConsultaQuestionario;