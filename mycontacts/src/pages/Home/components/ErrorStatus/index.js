import { Container } from './style';
import Button from '../../../../components/Button';
import sad from '../../../../assets/images/sad.svg';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="Sad" />

      <div className="info">
        <strong>Ocorreu um erro ao obter os seus contatos</strong>

        <Button onClick={onTryAgain} type="button">
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
