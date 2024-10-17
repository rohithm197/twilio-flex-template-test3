import { styled,Theme } from '@twilio/flex-ui';

export const EmbeddedDashboardViewWrapper = styled('div')`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const Title = styled('div')`
  background-color: ${(props) => (props.theme as Theme).tokens.backgroundColors.colorBackgroundBody};
  font-size: 18px;
  font-weight: bold;
  padding: 2px 2px 2px 4px;
  margin: 1px;
`; 
// export const Title = styled('div')`
//   background-color: ${(props) => (props.theme as any).tokens.backgroundColors.colorBackgroundBody};
//   font-size: 18px;
//   font-weight: bold;
//   padding: 2px 2px 2px 4px;
//   margin: 1px;
// `;