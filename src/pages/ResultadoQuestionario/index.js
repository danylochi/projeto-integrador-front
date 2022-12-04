import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap';
import './style.css';
import api from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function ResultadoQuestionario() {
  const [resultadoQuestionario, setResultadoQuestionario] = useState([]);
  const [ano, setAno] = useState("");
  const [materia, setMateria] = useState("");
  const [turma, setTurma] = useState("");
  const [serie, setSerie] = useState(0);
  const [semestre, setSemestre] = useState(0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, centerText, name }) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
              fontSize={12}
            >
              {`${(percent * 100).toFixed(0)}% ${name}`}
            </text>
          );
  };
  

  async function loadDataQuestionario() {
    const response = await api.get(`resultadoquestionario/?ano=${ano}&materia=${materia}&turma=${turma}&serie=${serie}&semestre=${semestre}`);
    console.log(response.data);
    setResultadoQuestionario(response.data);
  }

  return (
    <div style={{margin: '30px'  }}>
      <Card border="info">  
        <Card.Header style={{ background: '#267987', color:'#ffffff', height:'2.5rem'}}><h5>Resultado Questionario</h5></Card.Header>
        <Card.Body>
          <Form>                   
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "iptAno"><b>Ano: </b></Form.Label>
              <Col sm="7">
                <Form.Control placeholder='Ano de aplicação da prova' name="iptAno" id="iptAno" type="number" value={ano} onChange={(e) => setAno(e.target.value)}/>
              </Col>            
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" for= "iptTurma"><b>Turma: </b></Form.Label>
              <Col sm="7">
                <Form.Control placeholder='Informe a letra referente a turma' name="iptTurma" id="iptTurma" type="text" value={turma} onChange={(e) => setTurma(e.target.value)}/>
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
              <Form.Label column sm="2" for= "slcSemestre"><b>Semestre: </b></Form.Label>
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
              <Form.Label column sm="2" for= "slcSerie"><b>Série: </b></Form.Label>
              <Col sm="7">
                <Form.Select name="slcSerie" id="slcSerie" defaultValue={serie} onChange={(e) => setSerie(e.currentTarget.value)}>
                  <option value="0" disabled>
                    Escolha uma série ...
                  </option>
                  <option value="1">1ª Série EM</option>
                  <option value="2">2ª Série EM</option>
                  <option value="3">3ª Série EM</option>
                </Form.Select>
              </Col>            
            </Form.Group>        
            <div>
              <Button onClick={() => loadDataQuestionario()} style={{marginRight: '30px'}}>BUSCAR</Button>              
            </div>
          </Form>
        </Card.Body>  
      </Card >

      <div style={{margin: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '60px' }}>
      {resultadoQuestionario.map((q) => (
        <div key={q.idquestionario_grupo} style={{flex: 1, marginBottom: '60px', width:'100%'}}>
          <span><b>{q.descricao}</b></span>
          <ResponsiveContainer width="100%" height={250} >
            <PieChart height={250} width="100%">            
                <Pie
                  data={q.items}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="porcentagem"    
                  nameKey="item"           
                >
                  {q.items.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              
            </PieChart>
          </ResponsiveContainer>
          <p style={{textAlign: 'justify', marginBottom: '30px'}}>{q.detalhamento}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default ResultadoQuestionario;