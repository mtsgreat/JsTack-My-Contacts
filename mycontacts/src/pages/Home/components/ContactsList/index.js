import { Link } from 'react-router-dom';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import deleteted from '../../../../assets/images/icons/delete.svg';

import { Card, ListHeader } from './styles';

export default function ContactList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={onToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>
      )}

      {filteredContacts.map((contato) => (
        <Card key={contato.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contato.name}</strong>
              {contato.category.name
                                          && (<small>{contato.category.name}</small>
                                          )}
            </div>
            <span>{contato.email}</span>
            <span>{contato.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contato.id}`} alt="Edita">
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contato)}>
              <img src={deleteted} alt="delete" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}
