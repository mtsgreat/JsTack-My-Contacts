import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  //   let container = document.getElementById('loader-root');

  //   if (!container) {
  //   // cria elemento div
  //     container = document.createElement('div');
  //     // set a propiedade id e o name do is
  //     container.setAttribute('id', 'loader-root');
  //     // colocar a div criada no body
  //     document.body.appendChild(container);
  //   }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
