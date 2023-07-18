import Spinner from '../Spinner';
import { StyleButton } from './styles';

export default function Button({
  type = 'button',
  disabled = false,
  isLoading = false,
  children,
  danger,
  onClick,
}) {
  return (
    <StyleButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      { !isLoading && children}
      { isLoading && <Spinner size={16} />}
    </StyleButton>
  );
}
