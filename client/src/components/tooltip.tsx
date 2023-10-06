import * as React from "react";
import { Tooltip } from 'reactstrap';
import AddTask from './forms/addTask';

export function Tooltips({ id, storyId, placement, content,loading, setLoading}: any) {
  const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

  return (
    <span>
      <i className="fas fa-question-circle" id={'Tooltip-' + id} data-toggle="tooltip"></i>
      <Tooltip placement={placement} isOpen={tooltipOpen} target={'Tooltip-' + id} toggle={() => setTooltipOpen(!tooltipOpen)}>
        {content}
      </Tooltip>
      
      <AddTask loading={loading} setLoading={setLoading} storyId={storyId} status={id}/>
    </span>
  );
}
export default Tooltips;