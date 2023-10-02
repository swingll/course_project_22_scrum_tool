import * as React from "react";
import { Tooltip } from 'reactstrap';
import AddTask from './forms/addTask';

export function Tooltips(props: any) {
  const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

  return (
    <span>
      <i className="fas fa-question-circle" id={'Tooltip-' + props.id} data-toggle="tooltip"></i>
      <Tooltip placement={props.placement} isOpen={tooltipOpen} target={'Tooltip-' + props.id} toggle={() => setTooltipOpen(!tooltipOpen)}>
        {props.content}
      </Tooltip>
      
      <AddTask storyType={props.storyType} status={props.id}/>
    </span>
  );
}
export default Tooltips;