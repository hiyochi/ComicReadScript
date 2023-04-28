// import MdAutoStories from '@material-design-icons/svg/round/auto_stories.svg';
import MdAutoFixHigh from '@material-design-icons/svg/round/auto_fix_high.svg';
import MdAutoFixOff from '@material-design-icons/svg/round/auto_fix_off.svg';
import MdAutoFlashOn from '@material-design-icons/svg/round/flash_on.svg';
import MdAutoFlashOff from '@material-design-icons/svg/round/flash_off.svg';

import type { Component, JSX } from 'solid-js';

import type { DefaultOptions } from './useSiteOptions';
import { IconButton } from '../components/IconButton';

export const defaultSpeedDial = <T extends Record<string, any>>(
  options: T & DefaultOptions,
  setOptions: (
    newValue: T & DefaultOptions,
    trigger?: boolean,
  ) => Promise<void>,
) => {
  const DefaultButton: Component<{
    optionName: string;
    showName?: string;
    children?: JSX.Element;
  }> = (props) => {
    return (
      <IconButton
        tip={props.showName ?? props.optionName}
        placement="left"
        onClick={() =>
          setOptions({
            ...options,
            [props.optionName]: !options[props.optionName],
          })
        }
      >
        {props.children ??
          (options[props.optionName] ? <MdAutoFixHigh /> : <MdAutoFixOff />)}
      </IconButton>
    );
  };

  const list = Object.keys(options).map((optionName) => {
    switch (optionName) {
      case 'hiddenFAB':
      case 'option':
        return null;

      case 'autoShow':
        return () => (
          <DefaultButton optionName="autoShow" showName="自动进入阅读模式">
            {options.autoShow ? <MdAutoFlashOn /> : <MdAutoFlashOff />}
          </DefaultButton>
        );

      default:
        return () => <DefaultButton optionName={optionName} />;
    }
  });

  return list.filter(Boolean) as Array<() => JSX.Element>;
};
