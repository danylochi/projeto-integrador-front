import React, { useEffect, useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import api from '../../services/api';
import { toast } from 'react-toastify';



const { forwardRef, useImperativeHandle } = React;


const QuestionarioAlunoModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [questionarioOp, setQuestionarioOp] = useState([]);
  const [alunoQuestionario, setAlunoQuestionario] = useState({});
  const [haveItemToSave, setHaveItemToSave] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleClose = async () => {
    if (haveItemToSave) {
      handleSave();
    }

    await props.loadDataCaed();
    setShow(false);
  }

  const handleSave = async () => {
    setHaveItemToSave(false);
    await updateQuestionatioOp();
  }

  useImperativeHandle(ref, () => ({

    async handleShow(alunoQuestionario) {
        console.log('handleShow');
        setShow(true);
        setHaveItemToSave(false);
        setAlunoQuestionario(alunoQuestionario);
        await loadQuestionarioOp(alunoQuestionario);
    }

  }));

  async function loadQuestionarioOp({ idquestionario_turma }) {
    const response = await api.get(`questionarioturmaop/?idquestionario_turma=${idquestionario_turma}`);
    setQuestionarioOp(response.data);
    console.log(questionarioOp);
  }

  async function updateQuestionatioOp() {
    var request = questionarioOp.map(m => {
      return {
        idquestio_turma_op: m.idquestio_turma_op,
        idopcoes: m.idopcoes
      }
    });

    const response = await api.put('questionarioturmaop/', request).then(function (response) {
      console.log(response);

      toast(`Questionário salvo com sucesso.`, {
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

      toast(`Erro ao salvar o questionário.`, {
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

  const handleOnClickCheck = (event, questionario, opcao) => {
    //event.preventDefault();

    var newQuestionario = {...questionario, idopcoes: opcao.idopcoes};

    if (questionario.idopcoes != opcao.idopcoes)
      setHaveItemToSave(true);

    console.log(newQuestionario);

    var newListQuestionarioOp = questionarioOp.map(m => {
      if (m.idquestio_turma_op == newQuestionario.idquestio_turma_op) {
        return newQuestionario;
      }

      return m;
    })

    console.log(newListQuestionarioOp);

    setQuestionarioOp(newListQuestionarioOp);
  }  

  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen={true} >
        <Modal.Header closeButton>
          <Modal.Title>Aluno: {alunoQuestionario.estudante} - Matéria: {alunoQuestionario.materia}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
            <Container>
                {questionarioOp.map((q) => (
                    <Row key={q.idquestio_turma_op}>
                        <Col xs={12} md={12}><p>{q.pergunta}</p></Col>
                        <Col xs={12} md={12}>
                            {q.opcoes.map((o) => (
                                <div key={o.idopcoes}>
                                    <Form.Check
                                        inline
                                        label={`${o.letra} - ${o.item}`}
                                        name={`opcoes-${o.idopcoes}`}
                                        type="radio"
                                        id={`inline-radio-${o.idopcoes}`}
                                        checked={(q.idopcoes == o.idopcoes)}
                                        onChange={(e) => handleOnClickCheck(e, q, o)}
                                    />
                                </div>
                            ))}
                        </Col>
                        <Col xs={12} md={12}><p>---------------------</p></Col>
                        <Col xs={12} md={12}><p></p></Col>
                    </Row>
                    
                ))}               
            </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'SALVANDO...' : 'SALVAR'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default QuestionarioAlunoModal;