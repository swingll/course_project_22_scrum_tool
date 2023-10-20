import * as React from "react";
import { Tooltip } from 'reactstrap';
import AddTask from './forms/addTask';
import {useAuthorize} from "../states/permission/hooks";

export function Tooltips({ id, story, placement, content,loading, setLoading}: any) {
  const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);

  return (
    <span>
      <i className="fas fa-question-circle" id={'Tooltip-' + id} data-toggle="tooltip"></i>
      <Tooltip placement={placement} isOpen={tooltipOpen} target={'Tooltip-' + id} toggle={() => setTooltipOpen(!tooltipOpen)}>
        {content}
      </Tooltip>

        {useAuthorize("task","C")?<AddTask loading={loading} setLoading={setLoading} storyId={story?._id} members={[...story?.members, story?.creator]} status={id}/>:<></>}
    </span>
  );
}
export default Tooltips;