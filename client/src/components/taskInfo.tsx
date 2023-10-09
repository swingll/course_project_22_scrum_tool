import Tooltips from "./tooltip";
import Task from "./task";
import * as React from "react";
import { useState } from "react";
import { infoList } from "../utils/Constant";

export function TaskInfo({ index, story, tasks, setLoading, loading }: any) {
    const [infoL, setInfoList] = useState(infoList)
    return (<div className={`col-sm mcell mcolor${infoL[index].index}`}>
        <div className='mcell-title story'>
            <b className={`fas fa-${infoL[index].fas}`}></b> {infoL[index].title}
            <Tooltips id={`${infoL[index].index}`} storyId={story?._id}
                content='You can do what you want to do with this column' placement='top' setLoading={setLoading} loading={loading} /></div>
        <Task tasks={tasks} setLoading={setLoading} loading={loading} filter={`${infoL[index].index}`} />
    </div>)
}