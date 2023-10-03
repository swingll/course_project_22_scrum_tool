import * as React from "react";
import Task from './task'
import Tooltips from './tooltip'

export function Story(prop: any) {
  return (
    <div className="container">
      <div className="space">
        <h2 className="story">{prop.storyName[0] ? prop.storyName[0].title : "Loading..."}</h2>
      </div>
      <div className="row">
        <div className="col-sm mcell mcolor1">
          <div className="mcell-title story">
            <b className="fas fa-lightbulb" /> Backlog
            <Tooltips id="1" content="You can do what you want to do with this column" placement="top" storyType={prop.storyType} />
          </div>
          <Task tasks={prop.tasks} loading={prop.loading} filter="1" />
        </div>
        <div className="col-sm mcell mcolor2">
          <div className="mcell-title story">
            <b className="fas fa-bars" /> TODO
            <Tooltips id="2" content="You can do what you want to do with this column" placement="top" storyType={prop.storyType} />
          </div>
          <Task tasks={prop.tasks} loading={prop.loading} filter="2" />
        </div>

        <div className="col-sm mcell mcolor3">
          <div className="mcell-title story">
            <b className="fas fa-spinner"></b> In Progress
            <Tooltips id="3" content="You can do what you want to do with this column" placement="top" storyType={prop.storyType} />                              </div>
          <Task tasks={prop.tasks} loading={prop.loading} filter="3" />
        </div>
        <div className="col-sm mcell mcolor4">
          <div className="mcell-title story">
            <b className="fas fa-check" /> Done
            <Tooltips id="4" content="You can do what you want to do with this column" placement="top" storyType={prop.storyType} />                              </div>
          <Task tasks={prop.tasks} loading={prop.loading} filter="4" />
        </div>
      </div>
    </div>
  )
}