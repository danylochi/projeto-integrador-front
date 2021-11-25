import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap';
import './style.css';
import api from '../../services/api';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ResultadoCaed() {
  const [resultadoCaed, setResultadoCaed] = useState([]);
  const [resultadoChart, setResultadoChart] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);  
  const [ano, setAno] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");
  const [serie, setSerie] = useState(0);
  const [bimestre, setBimestre] = useState(0);
  

  async function loadDataCaed() {
    const response = await api.get(`resultadocaed/?ano=${ano}&materia=${materia}&turma=${turma}&serie=${serie}&bimestre=${bimestre}`);
    setResultadoCaed(response.data.resultadoCaed);
    setTableHeader(response.data.table_header);
  }

  useEffect(() => {
    const rcn = resultadoCaed[0];
    const rcs = resultadoCaed[1];
    var arry = [];
    
    if (rcn != undefined)
    {
      for (var i = 1; i <= 30; i++) { 
        if (rcn[`H_${i.toString().padStart(2, '0')}`] != "0" && rcs[`H_${i.toString().padStart(2, '0')}`] != "0")
        {
          arry.push(
            {
              habilidade: `H ${i}`,
              rcn: rcn[`H_${i.toString().padStart(2, '0')}`],
              rcs: rcs[`H_${i.toString().padStart(2, '0')}`]
            }
          );
        }
      }
    }
    setResultadoChart(arry);

  }, [resultadoCaed])

  

  return (
    <div style={{margin: '30px'  }}>
      <Card border="info">  
        <Card.Header style={{ background: '#47CFE7', color:'#ffffff', height:'2.5rem'}}><h5>Resultado Caed</h5></Card.Header>
        <Card.Body>
          <Form>                   
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
                  <option value="1">AAP 1º BIMESTRE 2021</option>
                  <option value="2">AAP 2º BIMESTRE 2021</option>
                  <option value="3" >AAP 3º BIMESTRE 2021</option>
                  <option value="4">AAP 4º BIMESTRE 2021</option>
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
            </div>
          </Form>
        </Card.Body>  
      </Card>

      <Table striped bordered hover responsive="xl" style={{marginTop: '30px'}}>
        <thead>
          <tr>
            <th>RECUPERAÇÃO</th>            
            {tableHeader.map((t, index) => (
              <th key={index}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resultadoCaed.map((d,index) => (
            <tr key={index}>
              <td>{d.RC}</td>
              <td>{d.H_01}%</td>
              <td>{d.H_02}%</td>
              <td>{d.H_03}%</td>
              <td>{d.H_04}%</td>
              <td>{d.H_05}%</td>
              <td>{d.H_06}%</td>
              <td>{d.H_07}%</td>
              <td>{d.H_08}%</td>
              <td>{d.H_09}%</td>
              <td>{d.H_10}%</td>
              <td>{d.H_11}%</td>
              <td>{d.H_12}%</td>
              <td>{d.H_13}%</td>
              <td>{d.H_14}%</td>
              <td>{d.H_15}%</td>
              <td>{d.H_16}%</td>
              <td>{d.H_17}%</td>
              <td>{d.H_18}%</td>
              <td>{d.H_19}%</td>
              <td>{d.H_20}%</td>
              <td>{d.H_21}%</td>
              <td>{d.H_22}%</td>
              <td>{d.H_23}%</td>
              <td>{d.H_24}%</td>
              <td>{d.H_25}%</td>
              <td>{d.H_26}%</td>
              <td>{d.H_27}%</td>
              <td>{d.H_28}%</td>
              <td>{d.H_29}%</td>
              <td>{d.H_30}%</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{margin: '30px'  }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resultadoChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="habilidade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rcn" fill="#8884d8" name="PROVA CAED"/>
            <Bar dataKey="rcs" fill="#82ca9d" name="RECUPERAÇÃO CONTINUADA"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResultadoCaed;