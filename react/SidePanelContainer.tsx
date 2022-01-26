import React from 'react';
import classNames from 'classnames';

type SidePanelState = 'open' | 'closed' | 'preview';

interface SidePanelContainerProps {
  panelState: SidePanelState;
  className?: string;
}

const SidePanelContainer: React.FC<SidePanelContainerProps> = ({
  panelState,
  className,
  children,
}) => {
  return (
    <>
      {['open', 'preview'].includes(panelState) && (
        <div className='position-relative'>
          <div
            // Height of container must match height of grid component to prevent overflow
            className={classNames(className, 'vh-75', {
              'position-absolute': panelState === 'preview',
            })}
            style={{ zIndex: 10, minWidth: 'max-content', overflowY: 'scroll' }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export { SidePanelState };
export default SidePanelContainer;
