import React, { useState } from 'react';
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap';
import './style.css';
import api from '../../services/api';

function ConsultaCaed() {
  const [dataCaed, setDataCaed] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);  
  const [ano, setAno] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");
  const [serie, setSerie] = useState(0);
  const [bimestre, setBimestre] = useState(0);
  const [recuperacao, setRecuperacao] = useState(false);

  async function loadDataCaed() {
    const response = await api.get(`consultacaed/?ano=${ano}&materia=${materia}&turma=${turma}&serie=${serie}&bimestre=${bimestre}&recuperacao=${recuperacao ? 'SIM' : 'NÃO'}`);
    setDataCaed(response.data.dataCaed);
    setTableHeader(response.data.table_header);
  }

  function downloadDataCaed(vazia = false) {
    api.post(
      `downloadfile/?ano=${vazia ? "0": ano}&materia=${vazia ? "": materia}&turma=${vazia ? "": turma}&serie=${vazia ? "0": serie}&bimestre=${vazia ? "0": bimestre}&recuperacao=${recuperacao ? 'SIM' : 'NÃO'}&vazia=${vazia ? '1' : '0'}`, 
      null,
      {
          headers:
          {
              'Content-Disposition': `attachment; filename=${vazia ? "leiaute_caed" : `planilha_caed_${ano}_${serie}${turma}_${bimestre}_${recuperacao ? 'SIM' : 'NÃO'}`}.xlsx`,
              'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          },
          responseType: 'arraybuffer',
      }
  ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${vazia ? "leiaute_caed" : `planilha_caed_${ano}_${serie}${turma}_${bimestre}_${recuperacao ? 'SIM' : 'NÃO'}`}.xlsx`);
      document.body.appendChild(link);
      link.click();
  })
      .catch((error) => console.log(error));

  }

  return (
    <div style={{margin: '30px'  }}>
      <Card border="info">  
        <Card.Header style={{ background: '#47CFE7', color:'#ffffff', height:'2.5rem'}}><h5>Consulta Caed</h5></Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3" for= "chkRecuperacao"><b>Recuperação Continuada: </b></Form.Label>
              <Col sm="1">
                <Form.Check name="chkRecuperacao" id="chkRecuperacao" type="checkbox" checked={recuperacao} onChange={(e) => setRecuperacao(e.target.checked)}/>
              </Col>            
            </Form.Group>        
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "iptAno"><b>Ano: </b></Form.Label>
              <Col sm="7">
                <Form.Control name="iptAno" id="iptAno" type="number" value={ano} onChange={(e) => setAno(e.target.value)}/>
              </Col>            
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "iptTurma"><b>Turma: </b></Form.Label>
              <Col sm="7">
                <Form.Control name="iptTurma" id="iptTurma" type="text" value={turma} onChange={(e) => setTurma(e.target.value)}/>
              </Col>  
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "slcMateria"><b>Matéria: </b></Form.Label>
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
              <Form.Label column sm="2" for= "slcBimestre"><b>Bimestre: </b></Form.Label>
              <Col sm="7">
                <Form.Select name="slcBimestre"id="slcBimestre" defaultValue={bimestre} onChange={(e) => setBimestre(e.currentTarget.value)}>
                  <option value="0" disabled>
                    Escolha um bimestre ...
                  </option>
                  <option value="1">AAP 1º BIMESTRE</option>
                  <option value="2">AAP 2º BIMESTRE</option>
                  <option value="3">AAP 3º BIMESTRE</option>
                  <option value="4">AAP 4º BIMESTRE</option>
                </Form.Select>
              </Col>            
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "slcSerie"><b>Série: </b></Form.Label>
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
              <Button onClick={() => loadDataCaed()} style={{marginRight: '30px'}}>BUSCAR</Button>
              <Button onClick={()=> downloadDataCaed()}style={{marginRight: '30px'}}>DOWNLOAD</Button>
              <Button onClick={()=> downloadDataCaed(true)}>LEIAUTE</Button>
            </div>
          </Form>
        </Card.Body>  
      </Card>

      <Table striped bordered hover responsive="xl" style={{marginTop: '30px'}}>
        <thead>
          <tr>
            <th>ESTUDANTE</th>
            <th>PARTICIPAÇÃO</th>
            <th>NÚMERO DE ITENS RESPONDIDOS</th>
            <th>% ACERTOS</th>
            <th>CATEGORIA DE DESEMPENHO</th>
            <th>TIPO DE INTERVENÇÃO</th>
            <th>ITENS ACERTADOS</th>
            {tableHeader.map((t, index) => (
              <th key={index}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataCaed.map((d) => (
            <tr key={d.id}>
              <td>{d.estudante}</td>
              <td>{d.participacao}</td>
              <td>{d.numero_itens_respondidos}</td>
              <td>{d.porcento_acertos}</td>
              <td>{d.categoria_desempenho}</td>
              <td>{d.tipo_intervencao}</td>   
              <td>{d.itens_acertados}</td>
              <td>{d.h_01}</td>
              <td>{d.h_02}</td>
              <td>{d.h_03}</td>
              <td>{d.h_04}</td>
              <td>{d.h_05}</td>
              <td>{d.h_06}</td>
              <td>{d.h_07}</td>
              <td>{d.h_08}</td>
              <td>{d.h_09}</td>
              <td>{d.h_10}</td>
              <td>{d.h_11}</td>
              <td>{d.h_12}</td>
              <td>{d.h_13}</td>
              <td>{d.h_14}</td>
              <td>{d.h_15}</td>
              <td>{d.h_16}</td>
              <td>{d.h_17}</td>
              <td>{d.h_18}</td>
              <td>{d.h_19}</td>
              <td>{d.h_20}</td>
              <td>{d.h_21}</td>
              <td>{d.h_22}</td>
              <td>{d.h_23}</td>
              <td>{d.h_24}</td>
              <td>{d.h_25}</td>
              <td>{d.h_26}</td>
              <td>{d.h_27}</td>
              <td>{d.h_28}</td>
              <td>{d.h_29}</td>
              <td>{d.h_30}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ConsultaCaed;