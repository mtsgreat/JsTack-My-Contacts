import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import NewCategory from './pages/NewCategory';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewContact} />
      <Route exact path="/new-category" component={NewCategory} />
      <Route exact path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
