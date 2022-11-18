import {
  IonApp,
  setupIonicReact
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
/* import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css'; */

/* Theme variables */
import './theme/variables.scss';

/* Custom Components */
import KanbanBoard from './components/KanbanBoard';
import { KanbanData, KanbanGroup } from './types/KanbanTypes';

const firstGroup: KanbanGroup = {
    name: 'group1',
    id: "group-1",
    items: [
        {id: 'item-1', content: '<Draggable 1 />'},
        {id: 'item-2', content: '<Draggable 2 />'}
    ]
}
  
const kanbanData: KanbanData = {
    boardName: 'boardOne',
    groups: [firstGroup]
}

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <div className="container">
            <KanbanBoard {...kanbanData} />
        </div>
    </IonApp>
);

export default App;
