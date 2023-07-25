import ReactDOM from 'react-dom';

export default function ReactPortal({ containerId = 'portal-root', children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    // cria elemento div
    container = document.createElement('div');
    // set a propiedade id e o name do is
    container.setAttribute('id', containerId);
    // colocar a div criada no body
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
