import styled, { css } from 'styled-components';

interface Props {
  primary?: boolean;
  ['data-hook']: string;
}

export const Button = styled.button.attrs<Props, Props>(props => ({
  ['data-hook']: props['data-hook'] || 'styled-button'
}))`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: green;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`;
