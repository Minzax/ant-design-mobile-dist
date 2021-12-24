import "./modal.css";
import { show } from './show';
import { alert } from './alert';
import { confirm } from './confirm';
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component';
import { Modal } from './modal';
export default attachPropertiesToComponent(Modal, {
  show: show,
  alert: alert,
  confirm: confirm
});