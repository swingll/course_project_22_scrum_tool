import React, { useRef, useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';

// interface GanttProps {
//   tasks: any[]; // Replace 'any' with the appropriate type for your tasks
//   zoom: string;
//   onDataUpdated?: (
//     type: string,
//     action: string,
//     item: any,
//     id: string | number
//   ) => void;
// }

export function Gantt({ tasks, zoom, onDataUpdated }: any) {
  const ganttContainer = useRef<HTMLDivElement>(null);
  let dataProcessor: any = null;
  console.log(tasks);
  useEffect(() => {
    gantt.config.date_format = "%Y-%m-%d %H:%i";

    if (ganttContainer.current) {
      gantt.init(ganttContainer.current);
      initGanttDataProcessor();
      
      gantt.parse(tasks);
    }

    return () => {
      if (dataProcessor) {
        dataProcessor.destructor();
        dataProcessor = null;
      }
    };
  }, [{tasks}]);

  useEffect(() => {
    setZoom(zoom);
  }, [zoom]);

  const initZoom = () => {
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' },
          ],
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' },
          ],
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'month', step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' },
          ],
        },
      ],
    });
  };

  const setZoom = (value: string) => {
    if (!gantt.ext.zoom.getLevels()) {
      initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  };

  const initGanttDataProcessor = () => {
    
    dataProcessor = gantt.createDataProcessor(
      (type: string, action: string, item: any, id: string | number) => {
        return new Promise<void>((resolve) => {
          if (onDataUpdated) {
            onDataUpdated(type, action, item, id);
          }

          resolve();
        });
      }
    );
  };

  return (
    <div ref={ganttContainer} style={{ width: '100%', height: '100%' }}></div>
  );
}
export default Gantt;