import "./dialog.css";
import { show } from './show';
import { alert } from './alert';
import { confirm } from './confirm';
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component';
import { Dialog } from './dialog';
export default attachPropertiesToComponent(Dialog, {
  show: show,
  alert: alert,
  confirm: confirm
});