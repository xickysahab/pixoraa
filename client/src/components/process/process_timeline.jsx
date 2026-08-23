import { useCallback, useState } from 'react';
import { processSteps } from '../../data/process';
import ProcessStep from './process_step';
import ProcessContactCard from './process_contact_card';

/**
 * Sticky left rail + scrolling phases on the right. The rail tracks
 * which phase is actually on screen, so the reader always knows where
 * they are in the sequence.
 */
export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const handleEnter = useCallback((i) => setActive(i), []);

  return (
    <div className="proc__layout">
      <aside className="proc__rail">
        <ol className="proc__ticks">
          {processSteps.map((s, i) => (
            <li
              key={s.id}
              className={`proc__tick ${i === active ? 'proc__tick--on' : ''}`}
            >
              <span className="proc__tick-num">/{s.num}/</span>
              <span className="proc__tick-name">{s.title}</span>
            </li>
          ))}
        </ol>
        <ProcessContactCard />
      </aside>

      <ol className="proc__steps">
        {processSteps.map((step, i) => (
          <ProcessStep
            key={step.id}
            step={step}
            index={i}
            isLast={i === processSteps.length - 1}
            onEnter={handleEnter}
          />
        ))}
      </ol>
    </div>
  );
}
