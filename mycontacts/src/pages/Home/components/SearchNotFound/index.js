/* eslint-disable react/jsx-one-expression-per-line */
import magifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magifierQuestion} alt="Maginifier Question" />
      <span>
        Nenhum resultado foi encontrado para<strong>`{searchTerm}`</strong>
      </span>
    </Container>
  );
}
