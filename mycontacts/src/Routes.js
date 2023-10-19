import { Route, Routes as Router } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import NewCategory from './pages/NewCategory';

export default function Routes() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/new-category" element={<NewCategory />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Router>
  );
}
