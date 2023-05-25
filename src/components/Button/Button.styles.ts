import styled, { css, useTheme } from 'styled-components';

const StyledButton = styled.button<{
  
  clear: boolean;
  large: boolean;
  withIcon: boolean;
  round: boolean;
}>(
  ({
    clear,
    large,
    round,
    withIcon,
    theme: { color, boxShadow, borderRadius },
  }) =>
    css`ß
      outline: none;
      border: 0;
      font-family: 'Hind';
      border-radius: ${round ? borderRadius.xl : borderRadius.xs};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: ${withIcon
        ? '0.7rem'
        : large
        ? '1.125rem 1rem'
        : '0.875rem 1rem'};
      color: ${clear ? color.primaryText : color.buttonText};
      transition: box-shadow 150ms ease-in;
      z-index: 1;
      background-color: ${clear ? color.buttonClear : color.buttonPrimary};
      &:hover {
        cursor: pointer;
        background-color: ${clear
          ? color.buttonClearHover
          : color.buttonPrimaryHover};
      }
      &:focus {
        box-shadow: ${boxShadow.outerBorder};
      }
      &:disabled {
        background-color: ${clear ? color.buttonClear : color.buttonPrimary};
        opacity: 0.4;
      }
      @media ${breakpoints.M} {
        padding: ${withIcon
          ? '1rem'
          : large
          ? '1.125rem 1.5rem'
          : '0.875rem 1.5rem'};
      }
    `
);
