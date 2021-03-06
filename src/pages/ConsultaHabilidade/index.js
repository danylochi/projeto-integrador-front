import React, { useState } from 'react';

import './style.css';

import api from '../../services/api';
import { Form, Row, Col, Button, Card, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ConsultaHabilidade() {
  const [dataCaed, setDataCaed] = useState([]);
  const [ano, setAno] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");
  const [serie, setSerie] = useState(0);
  const [bimestre, setBimestre] = useState(0);

  async function loadDataCaed() {
    const response = await api.get(`habilidadecaed/?ano=${ano}&materia=${materia}&turma=${turma}&serie=${serie}&bimestre=${bimestre}`);
    setDataCaed(response.data);
    console.log(dataCaed);
  }
  
  async function handleChangeInput(id, value) {
    const newDataCaed = dataCaed.map((m) => {
      if (m.id === id) {
        m.cod_da_habilidade = value;
      }
      return m;      
    });

    setDataCaed(newDataCaed);
  }

  async function saveHabilidadeCaed(id) {
    const habilidade = dataCaed.find((f) => {
      if (f.id === id) return f;
    });

    await api.put(`habilidadecaed/${id}/?cod_da_habilidade=${habilidade.cod_da_habilidade}`).then(function (response) {
      console.log(response);

      toast(`Habilidade salva com sucesso: ${habilidade.cod_da_habilidade}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'success'
        });
    })
    .catch(function (error) {
      console.log(error);

      toast(`Erro ao salvar a habilidade: ${habilidade.cod_da_habilidade}.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'error'
        });
    });
  }   
    return (
      <div style={{margin: '30px'  }}>
        <Card border="info">  
          <Card.Header style={{ background: '#267987', color:'#ffffff', height:'2.5rem'}}><h5>Cadastro de Habilidade</h5></Card.Header>
          <Card.Body>
            <Form>      
              <Form.Group as={Row} className="mb-3">
                <Form.Label for= "iptAno" column sm="2"><b>Ano: </b></Form.Label>
                <Col sm="7">
                  <Form.Control placeholder='Ano de aplica????o da prova' name="iptAno" id="iptAno" type="number" value={ano} onChange={(e) => setAno(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label for= "iptTurma" column sm="2"><b>Turma: </b></Form.Label>
                <Col sm="7">
                  <Form.Control placeholder='Informe a letra referente a turma' name="iptTurma" id="iptTurma" type="text" value={turma} onChange={(e) => setTurma(e.target.value)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label for= "slcMateria" column sm="2"><b>Mat??ria: </b></Form.Label>
                <Col sm="7">
                  <Form.Select name="slcMateria" id="slcMateria" defaultValue={materia} onChange={(e) => setMateria(e.currentTarget.value)}>
                    <option value="" disabled>
                      Escolha uma mat??ria ...
                    </option>
                    <option value="BIOLOGIA">BIOLOGIA</option>
                    <option value="CI??NCIAS">CI??NCIAS</option>
                    <option value="F??SICA" >F??SICA</option>
                    <option value="GEOGRAFIA">GEOGRAFIA</option>
                    <option value="HIST??RIA" >HIST??RIA</option>
                    <option value="L??NGUA PORTUGUESA">L??NGUA PORTUGUESA</option>
                    <option value="MATEM??TICA">MATEM??TICA</option>
                    <option value="QU??MICA" >QU??MICA</option>
                  </Form.Select>
                </Col>            
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label for= "slcBimestre" column sm="2"><b>Bimestre: </b></Form.Label>
                <Col sm="7">
                  <Form.Select name="slcBimestre"id="slcBimestre" defaultValue={bimestre} onChange={(e) => setBimestre(e.currentTarget.value)}>
                    <option value="0" disabled>
                      Escolha um bimestre ...
                    </option>
                    <option value="1">AAP 1?? BIMESTRE</option>
                    <option value="2">AAP 2?? BIMESTRE</option>
                    <option value="3">AAP 3?? BIMESTRE</option>
                    <option value="4">AAP 4?? BIMESTRE</option>
                  </Form.Select>
                </Col>            
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label for= "slcSerie" column sm="2"><b>S??rie: </b></Form.Label>
                <Col sm="7">
                  <Form.Select name="slcSerie" id="slcSerie" defaultValue={serie} onChange={(e) => setSerie(e.currentTarget.value)}>
                    <option value="0" disabled>
                      Escolha uma s??rie ...
                    </option>
                    <option value="1">1?? S??rie EM</option>
                    <option value="2">2?? S??rie EM</option>
                    <option value="3" >3?? S??rie EM</option>
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
              <th>QUEST??O</th>
              <th>C??DIGO DA HABILIDADE</th>
              <th />          
            </tr>
          </thead>
          <tbody>
            {dataCaed.map((d) => (
              <tr key={d.id}>
                <td>{d.questao}</td>
                <td>
                  <input id={`iptHabilidade${d.id}`} 
                    name={`iptHabilidade${d.id}`}
                    value={d.cod_da_habilidade}
                    onChange={(e) => handleChangeInput(d.id, e.target.value)}  
                  />
                </td>
                <td>
                  <Button variant="primary"
                    onClick={() => saveHabilidadeCaed(d.id)}>
                    Salvar
                  </Button></td>              
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
} 

export default ConsultaHabilidade;