import Spinner from '../Spinner';
import { StyleButton } from './styles';

export default function Button({
  type = 'button', disabled = false, isLoading = false, children,
}) {
  return (
    <StyleButton
      type={type}
      disabled={disabled || isLoading}
    >
      { !isLoading && children}
      { isLoading && <Spinner size={16} />}
    </StyleButton>
  );
}
