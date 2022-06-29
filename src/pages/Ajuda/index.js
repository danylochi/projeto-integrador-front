import './style.css';
import Accordion from 'react-bootstrap/Accordion';

function Ajuda(){
    return (
        <div style={{margin: '30px'  }}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header><b>UPLOAD DE PLANILHA</b></Accordion.Header>
            <Accordion.Body>
              <text>Existem duas janelas na janela 1º Passo é possível fazer o Download, da planilha padrão para a máquina local.
              Nesta planilha serão inseridas as informações pertinentes ao sistema.<br/>
              Na janela 2º Passo a planilha preenchida pode ser enviada ao sistema para gerar análises as análises.
              A planilha deve ser salva no formato Excel com extensão XLSX e após clicar na opção procurar marcar o arquivo da planilha desejada e acionar o botão UPLOAD. Após o termino do carregamento uma mensagem de sucesso será apresentada. IMPORTANTE, a planilha não pode estar vazia, sem nenhum dado.</text>

            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header><b>CADASTRO DE HABILIDADE</b></Accordion.Header>
            <Accordion.Body>
            <text>Nesta janela, será informado o ano de realização da prova, a letra correspondente a turma, a matéria, o bimestre de aplicação e a serie que está sendo verificada. Ao concluir a inserção das informações o botão buscar deve ser acionado.<br/>
Se todas as informações estiverem corretas, uma tabela será aberta com a relação das questões e campo para ser preenchido com o código da habilidade. Após preencher o campo da habilidade deve ser acionado o botão de salvar, para registrar a informação.</text>

            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="2">
            <Accordion.Header><b>CONSULTA CAED</b></Accordion.Header>
            <Accordion.Body>
            Esta janela permite a consulta do rendimento dos alunos, os campos Ano, Turma, Matéria, Bimestre e Série devem ser preenchidos, e ao acionar o botão buscar, uma tabela é aberta com os dados individualizado por aluno. Caso seja necessário ao acionar o botão Download, uma planilha com os dados apresentados é enviada para a máquina local.
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="3">
            <Accordion.Header><b>RESULTADO CAED</b></Accordion.Header>
            <Accordion.Body>
            Nesta janela os dados para a consulta de interesse, Ano, turma, Matéria, Bimestre e Série devem ser preenchidos, e o botão buscar deve ser acionado.
O resultado é a apresentação de um gráfico para auxiliar na visualização da evolução de do rendimento dos estudantes pesquisados.

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>
      );
    
}

export default Ajuda;