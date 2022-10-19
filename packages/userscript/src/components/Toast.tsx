import type { CSSProperties } from 'react';
import shadow from 'react-shadow';
import type { ToastOptions } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import ToastStyle from 'react-toastify/dist/ReactToastify.min.css';
import { useComponentsRoot } from '../helper';

export const useToast = () => {
  const [root] = useComponentsRoot('toast');

  return (text: string, options?: ToastOptions) => {
    root.render(
      <shadow.div>
        <ToastContainer
          style={
            {
              // 进度条颜色
              '--toastify-color-progress-light': '#7A909A',
              // 背景色
              '--toastify-color-light': 'white',
            } as CSSProperties
          }
        />
        <style type="text/css">
          {ToastStyle.replace(':root', '.Toastify')}
        </style>
      </shadow.div>,
    );

    toast(text, { ...options });
  };
};
