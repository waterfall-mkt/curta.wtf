import type { FC } from 'react';

export const EthereumIcon: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Ethereum</title>
      <desc>Ethereum&apos;s logo.</desc>
      <path d="m11.997 1-.147.501v14.545l.147.147 6.752-3.99z" fill="currentColor" />
      <path
        d="M11.997 1 5.246 12.202l6.751 3.991v-7.06zm0 16.471-.083.102v5.18l.083.243 6.756-9.513z"
        fill="currentColor"
      />
      <path
        d="M11.997 22.996v-5.525l-6.751-3.988zm0-6.803 6.752-3.99-6.752-3.07zm-6.751-3.99 6.751 3.99v-7.06z"
        fill="currentColor"
      />
    </svg>
  );
};

export const OpenSeaIcon: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>OpenSea</title>
      <desc>OpenSea&apos;s logo.</desc>
      <path
        d="M12 1C5.926 1 1 5.926 1 12s4.926 11 11 11 11-4.926 11-11S18.076 1 12 1ZM6.427 12.37l.047-.075 2.862-4.477a.098.098 0 0 1 .171.013c.478 1.071.891 2.404.698 3.234-.082.34-.308.803-.564 1.23a2.205 2.205 0 0 1-.107.182.097.097 0 0 1-.082.042H6.511a.097.097 0 0 1-.084-.15Zm12.753 1.54a.1.1 0 0 1-.059.092c-.222.094-.981.444-1.296.882-.805 1.12-1.419 2.721-2.794 2.721H9.298a3.684 3.684 0 0 1-3.678-3.691v-.066c0-.053.044-.097.099-.097h3.194c.064 0 .11.057.106.121a1.075 1.075 0 0 0 .114.614 1.123 1.123 0 0 0 1.008.625h1.582v-1.235h-1.565a.101.101 0 0 1-.081-.158l.057-.084a12.092 12.092 0 0 0 .57-.908 7.304 7.304 0 0 0 .394-.788c.022-.048.04-.099.06-.147.03-.086.06-.167.083-.247.022-.068.042-.138.06-.204.052-.229.074-.471.074-.722a3.29 3.29 0 0 0-.013-.299 4.357 4.357 0 0 0-.031-.323 3.194 3.194 0 0 0-.044-.286 5.953 5.953 0 0 0-.09-.43l-.013-.054c-.027-.1-.051-.192-.082-.29a10.838 10.838 0 0 0-.301-.892 4.777 4.777 0 0 0-.13-.325c-.066-.163-.134-.31-.196-.45a3.266 3.266 0 0 1-.086-.18 5.365 5.365 0 0 0-.094-.195c-.022-.049-.049-.095-.066-.139l-.194-.356c-.026-.049.018-.108.07-.093l1.21.328h.01l.158.046.176.049.064.017V6.03c0-.347.277-.63.622-.63a.632.632 0 0 1 .62.63v1.067l.13.035.029.016.134.1c.046.036.095.08.152.126a9.489 9.489 0 0 1 .526.462 7.598 7.598 0 0 1 .803.841c.057.072.12.143.174.213.072.095.147.194.215.297.03.048.068.099.097.147.088.13.163.264.235.399.031.061.062.13.088.195.082.18.146.363.185.548.013.04.022.082.027.121v.009c.013.053.017.11.022.17a1.886 1.886 0 0 1-.031.565 2.53 2.53 0 0 1-.066.235c-.029.077-.055.156-.09.233a3.165 3.165 0 0 1-.242.46c-.031.055-.069.112-.104.167-.04.058-.081.113-.116.165a3.557 3.557 0 0 1-.159.203 2.147 2.147 0 0 1-.152.191c-.074.09-.147.174-.224.255a1.908 1.908 0 0 1-.143.157c-.048.055-.099.103-.143.147-.077.077-.139.134-.191.185l-.126.112a.093.093 0 0 1-.066.026h-.963v1.235h1.212c.27 0 .528-.095.737-.273.07-.062.38-.33.748-.735a.087.087 0 0 1 .046-.029l3.346-.968a.098.098 0 0 1 .125.095v.708Z"
        clipRule="evenodd"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};
